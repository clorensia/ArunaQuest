// /store/quest-store.js
import { create } from 'zustand';

// --- API Configuration ---
const API_BASE_URL = 'https://68dd8567d7b591b4b78cb159.mockapi.io/api/v1';

// --- KONSTANTA ---
const GAME_STATES = {
    DASHBOARD: 'dashboard',
    LOADING: 'loading',
    PLAYING: 'playing',
    FEEDBACK: 'feedback',
    MINIGAME: 'minigame',
    // REMOVED: REPORT - langsung navigasi ke halaman report
};

const STATS = {
    TEKNIS: 'teknis',
    SOSIAL: 'sosial',
    INISIATIF: 'inisiatif'
};

// Helper function untuk safe localStorage access
const safeLocalStorage = {
    getItem: (key) => {
        if (typeof window === 'undefined') return null;
        try {
            return localStorage.getItem(key);
        } catch (error) {
            console.error('LocalStorage getItem error:', error);
            return null;
        }
    },
    setItem: (key, value) => {
        if (typeof window === 'undefined') return;
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            console.error('LocalStorage setItem error:', error);
        }
    },
    removeItem: (key) => {
        if (typeof window === 'undefined') return;
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('LocalStorage removeItem error:', error);
        }
    }
};

// API Helper Functions
const fetchQuests = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/quests`);
        if (!response.ok) throw new Error('Failed to fetch quests');
        const data = await response.json();
        
        // Handle struktur API yang benar - array of objects
        if (data && Array.isArray(data) && data.length > 0) {
            const apiQuests = {};
            
            // Process setiap item dalam array
            data.forEach(questObj => {
                const questId = Object.keys(questObj)[0]; // ambil key pertama (quest ID)
                const questData = questObj[questId];
                
                // Normalisasi data: pastikan semua scenario punya type
                if (questData.scenarios) {
                    Object.values(questData.scenarios).forEach(scenario => {
                        if (!scenario.type) {
                            scenario.type = scenario.minigameData ? 'minigame' : 'narrative';
                        }
                    });
                }
                
                apiQuests[questId] = questData;
            });
            
            return apiQuests;
        }
        
        // Return empty object jika tidak ada data
        return {};
    } catch (error) {
        console.error('Error fetching quests:', error);
        throw error;
    }
};

const fetchQuestById = async (questId) => {
    try {
        const quests = await fetchQuests();
        return quests[questId] || null;
    } catch (error) {
        console.error('Error fetching quest:', error);
        throw error;
    }
};

// Validation function untuk minigame - ALWAYS RETURN TRUE (tetap lanjut)
const validateMiniGame = (type, userAnswer, minigameData) => {
    // Always return true so user can continue regardless of answer
    console.log('Minigame validation (always passes):', { type, userAnswer });
    return true;
};

// Get badge based on stats
const getBadge = (stats) => {
    const sortedStats = Object.entries(stats).sort(([,a],[,b]) => b - a);
    if (!sortedStats.length) return { name: 'Pencapai Misterius', icon: '❓' };
    const topStat = sortedStats[0][0];
    switch(topStat) {
        case 'teknis': return { name: 'Problem Solver Strategis', icon: '🧠' };
        case 'sosial': return { name: 'Komunikator Andal', icon: '🤝' };
        case 'inisiatif': return { name: 'Pemimpin Proaktif', icon: '🚀' };
        default: return { name: 'Pencapai Seimbang', icon: '🌟' };
    }
};

export const useGameStore = create((set, get) => ({
    gameState: GAME_STATES.DASHBOARD,
    allQuests: {},
    questData: null,
    currentScenarioId: null,
    currentScenarioIndex: 0,
    stats: {},
    error: null,
    lastChoiceFeedback: '',
    transientEffect: null,
    isLoadingQuests: false,

    // Fetch all quests from API only
    fetchAllQuests: async () => {
        set({ isLoadingQuests: true, error: null });
        try {
            const quests = await fetchQuests();
            set({ allQuests: quests, isLoadingQuests: false });
            return quests;
        } catch (error) {
            console.error('Failed to fetch quests:', error);
            set({ 
                allQuests: {},
                isLoadingQuests: false,
                error: 'Gagal memuat quests dari server. Silakan refresh halaman.'
            });
            return {};
        }
    },

    startQuest: async (questId) => {
        set({ gameState: GAME_STATES.LOADING, error: null });
        
        try {
            // Coba ambil dari allQuests yang sudah di-load
            const { allQuests } = get();
            let questData = allQuests[questId];
            
            // Jika belum ada di allQuests, fetch langsung dari API
            if (!questData) {
                questData = await fetchQuestById(questId);
            }
            
            if (!questData) {
                set({ 
                    error: 'Quest tidak ditemukan', 
                    gameState: GAME_STATES.DASHBOARD 
                });
                return;
            }

            const totalScenarios = Object.keys(questData.scenarios || {}).length;
            const questDataWithTotal = {
                ...questData,
                totalScenarios
            };

            const newState = {
                questData: questDataWithTotal,
                stats: { ...questData.initialStats },
                currentScenarioId: questData.startScenarioId,
                currentScenarioIndex: 1,
                gameState: GAME_STATES.PLAYING,
            };
            
            set(newState);
            safeLocalStorage.setItem('arunaquest-save', JSON.stringify(newState));
        } catch (error) {
            console.error('Error starting quest:', error);
            set({ 
                error: 'Gagal memuat quest. Silakan coba lagi.', 
                gameState: GAME_STATES.DASHBOARD 
            });
        }
    },

    handleChoice: (choice) => {
        set({ transientEffect: choice.effect });
        setTimeout(() => {
            set({ transientEffect: null });
            const { stats, questData, currentScenarioIndex } = get();
            const newStats = { ...stats };
            Object.entries(choice.effect).forEach(([statKey, value]) => {
                if (newStats[statKey] !== undefined) newStats[statKey] += value;
            });

            set({
                stats: newStats,
                lastChoiceFeedback: choice.feedback,
                gameState: GAME_STATES.FEEDBACK
            });

            setTimeout(() => {
                const isLastScene = !choice.nextSceneId;
                if (isLastScene) {
                    get().endQuest();
                    return;
                }

                const nextScenario = questData.scenarios[choice.nextSceneId];
                const nextGameState = nextScenario?.type === 'minigame' ? GAME_STATES.MINIGAME : GAME_STATES.PLAYING;
                const newState = {
                    currentScenarioId: choice.nextSceneId,
                    currentScenarioIndex: currentScenarioIndex + 1,
                    gameState: nextGameState,
                };
                set(newState);
                
                const currentState = get();
                safeLocalStorage.setItem('arunaquest-save', JSON.stringify({
                    ...currentState,
                    ...newState,
                    lastChoiceFeedback: '',
                    transientEffect: null
                }));
            }, 2500);
        }, 1500);
    },
    
    completeMinigame: (userAnswer, minigameData) => {
        const { stats, questData, currentScenarioIndex, currentScenarioId } = get();
        const scenario = questData.scenarios[currentScenarioId];
        
        // Always pass validation
        const isCorrect = validateMiniGame(minigameData.type, userAnswer, minigameData);
  
        // Show encouraging feedback regardless of answer
        set({ transientEffect: scenario.effect });
  
        setTimeout(() => {
            set({ transientEffect: null });
            const newStats = { ...stats };
            Object.entries(scenario.effect).forEach(([statKey, value]) => {
                if (newStats[statKey] !== undefined) newStats[statKey] += value;
            });
  
            set({
                stats: newStats,
                lastChoiceFeedback: scenario.feedback,
                gameState: GAME_STATES.FEEDBACK
            });
  
            setTimeout(() => {
                const isLastScene = !scenario.nextSceneId;
                if (isLastScene) {
                    get().endQuest();
                    return;
                }

                const nextScenarioId = scenario.nextSceneId;
                const nextScenario = questData.scenarios[nextScenarioId];
                const nextGameState = nextScenario?.type === 'minigame' ? GAME_STATES.MINIGAME : GAME_STATES.PLAYING;
                const newState = {
                    currentScenarioId: nextScenarioId,
                    currentScenarioIndex: currentScenarioIndex + 1,
                    gameState: nextGameState,
                };
                set(newState);
                
                const currentState = get();
                safeLocalStorage.setItem('arunaquest-save', JSON.stringify({
                    ...currentState,
                    ...newState,
                    lastChoiceFeedback: '',
                    transientEffect: null
                }));
            }, 2500);
        }, 1500);
    },

    endQuest: () => {
        const { stats, questData } = get();
        
        // Simpan data report ke localStorage
        safeLocalStorage.setItem('quest-report-data', JSON.stringify({ 
            stats, 
            questData,
            completedAt: new Date().toISOString()
        }));
        
        // Hapus save game yang sedang berjalan
        safeLocalStorage.removeItem('arunaquest-save');
        
        // Reset store state
        set({
            gameState: GAME_STATES.DASHBOARD,
            questData: null,
            currentScenarioId: null,
            currentScenarioIndex: 0,
            stats: {},
            lastChoiceFeedback: '',
            transientEffect: null,
        });
        
        // Navigasi ke halaman report
        if (typeof window !== 'undefined') {
            window.location.href = '/quest/report';
        }
    },
  
    resetQuest: () => {
        safeLocalStorage.removeItem('arunaquest-save');
        safeLocalStorage.removeItem('quest-report-data');
        set({
            gameState: GAME_STATES.DASHBOARD,
            questData: null,
            currentScenarioId: null,
            currentScenarioIndex: 0,
            stats: {},
            error: null,
            lastChoiceFeedback: '',
            transientEffect: null,
        });
    },
  
    loadSavedGame: async () => {
        const saved = safeLocalStorage.getItem('arunaquest-save');
        if (saved) {
            try {
                const savedState = JSON.parse(saved);
                // Load quests dari API untuk memastikan data terbaru
                const quests = await fetchQuests();
                set({ 
                    ...savedState,
                    allQuests: quests 
                });
            } catch (error) {
                console.error('Error loading saved game:', error);
                set({ error: 'Gagal memuat game tersimpan' });
            }
        }
    }
}));

export { GAME_STATES };