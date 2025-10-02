// file: src/app/store/gameStore.js
import { create } from 'zustand';

export const GAME_STATES = {
    DASHBOARD: 'dashboard',
    LOADING: 'loading',
    PLAYING: 'playing',
    FEEDBACK: 'feedback',
    REPORT: 'report',
    MINIGAME: 'minigame',
};

const safeLocalStorage = {
    getItem: (key) => (typeof window !== 'undefined' ? localStorage.getItem(key) : null),
    setItem: (key, value) => { if (typeof window !== 'undefined') localStorage.setItem(key, value); },
    removeItem: (key) => { if (typeof window !== 'undefined') localStorage.removeItem(key); }
};

const validateMiniGame = (type, userAnswer, minigameData) => {
    switch (type) {
        case 'spot_the_error':
            return userAnswer.selectedLine?.toString() === minigameData.correctAnswer?.toString();
        case 'prioritization':
        case 'flow_chart':
            const userOrder = userAnswer.items?.map(item => item.id);
            return JSON.stringify(userOrder) === JSON.stringify(minigameData.correctOrder);
        case 'categorization':
            if (!userAnswer.categorizedItems) return false;
            return Object.entries(userAnswer.categorizedItems).every(([category, items]) => {
                const correctItemsForCategory = minigameData.items?.filter(i => i.category === category);
                if (items.length !== correctItemsForCategory?.length) return false;
                const userItemIds = items.map(i => i.id).sort();
                const correctItemIds = correctItemsForCategory.map(i => i.id).sort();
                return JSON.stringify(userItemIds) === JSON.stringify(correctItemIds);
            });
        case 'layouting':
             return userAnswer.layout && userAnswer.layout['Main Content']?.length > 0;
        default:
            return true; // Allow unknown types to pass
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

    fetchAllQuests: async () => {
        set({ isLoadingQuests: true, error: null });
        try {
            const response = await fetch('/api/fetch-quests', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            
            if (!response.ok) {
                throw new Error(`Gagal mengambil data: Status ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Fetch all quests response:', data);
            
            if (!data.success) {
                throw new Error(data.error || 'Failed to fetch quests');
            }

            const questsData = data.quests || {};

            if (Object.keys(questsData).length === 0) {
                throw new Error("Data quest kosong atau tidak dalam format yang benar dari API.");
            }

            set({ allQuests: questsData, isLoadingQuests: false, error: null });
        } catch (error) {
            console.error("Fetch Error:", error.message);
            set({ 
                error: 'Tidak bisa memuat data quest. Pastikan URL API benar dan server MockAPI aktif.', 
                isLoadingQuests: false,
                allQuests: {}
            });
        }
    },
    
    startQuest: async (questId) => {
        set({ gameState: GAME_STATES.LOADING, error: null });
        try {
            console.log('Starting quest:', questId);
            
            const response = await fetch('/api/fetch-quests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ questId }),
            });
            
            if (!response.ok) {
                throw new Error('Gagal mengambil data quest');
            }
            
            const data = await response.json();
            
            if (!data.success || !data.quest) {
                throw new Error(data.error || 'Quest tidak ditemukan');
            }
            
            const questData = data.quest;
            
            if (!questData.scenarios || !questData.startScenarioId) {
                throw new Error('Data quest tidak lengkap');
            }
            
            const startScenario = questData.scenarios[questData.startScenarioId];
            const isMinigame = startScenario?.minigameData || startScenario?.type === 'minigame';
            
            const newState = {
                questData,
                stats: { ...questData.initialStats },
                currentScenarioId: questData.startScenarioId,
                currentScenarioIndex: 1,
                gameState: isMinigame ? GAME_STATES.MINIGAME : GAME_STATES.PLAYING,
            };
            
            set(newState);
            safeLocalStorage.setItem('arunaquest-save', JSON.stringify(newState));
        } catch (error) {
            console.error('Error starting quest:', error);
            set({ 
                error: `Gagal memuat quest: ${error.message}`, 
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
            Object.entries(choice.effect || {}).forEach(([statKey, value]) => {
                if (newStats[statKey] !== undefined) newStats[statKey] += value;
            });

            set({ stats: newStats, lastChoiceFeedback: choice.feedback, gameState: GAME_STATES.FEEDBACK });

            setTimeout(() => {
                if (!choice.nextSceneId) {
                    console.log('No next scene, ending quest');
                    get().endQuest();
                    return;
                }

                const nextScenario = questData.scenarios[choice.nextSceneId];
                
                if (!nextScenario) {
                    console.log('Next scenario not found, ending quest');
                    get().endQuest();
                    return;
                }
                
                const isMinigame = nextScenario.minigameData || nextScenario.type === 'minigame';
                const nextGameState = isMinigame ? GAME_STATES.MINIGAME : GAME_STATES.PLAYING;
                
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
        const isCorrect = validateMiniGame(minigameData.type, userAnswer, minigameData);
  
        if (!isCorrect) {
            set({ 
                lastChoiceFeedback: "Hmm, sepertinya ada yang kurang tepat. Coba kita lihat lagi.", 
                gameState: GAME_STATES.FEEDBACK 
            });
            setTimeout(() => set({ 
                gameState: GAME_STATES.MINIGAME, 
                lastChoiceFeedback: '' 
            }), 2500);
            return;
        }
  
        set({ transientEffect: scenario.effect });
  
        setTimeout(() => {
            set({ transientEffect: null });
            const newStats = { ...stats };
            Object.entries(scenario.effect || {}).forEach(([statKey, value]) => {
                if (newStats[statKey] !== undefined) newStats[statKey] += value;
            });
  
            set({ stats: newStats, lastChoiceFeedback: scenario.feedback, gameState: GAME_STATES.FEEDBACK });
  
            setTimeout(() => {
                if (!scenario.nextSceneId) {
                    console.log('Minigame was last scene, ending quest');
                    get().endQuest();
                    return;
                }

                const nextScenario = questData.scenarios[scenario.nextSceneId];
                
                if (!nextScenario) {
                    console.log('Next scenario after minigame not found, ending quest');
                    get().endQuest();
                    return;
                }
                
                const isMinigame = nextScenario.minigameData || nextScenario.type === 'minigame';
                const nextGameState = isMinigame ? GAME_STATES.MINIGAME : GAME_STATES.PLAYING;
                
                const newState = {
                    currentScenarioId: scenario.nextSceneId,
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
        console.log('🏁 Ending quest, transitioning to REPORT state');
        
        safeLocalStorage.setItem('quest-report-data', JSON.stringify({ stats, questData }));
        safeLocalStorage.removeItem('arunaquest-save');
        
        set({ 
            gameState: GAME_STATES.REPORT,
            lastChoiceFeedback: null,
            transientEffect: null,
        });
    },
  
    resetQuest: () => {
        safeLocalStorage.removeItem('arunaquest-save');
        safeLocalStorage.removeItem('quest-report-data');
        set({ 
            gameState: GAME_STATES.DASHBOARD,
            questData: null,
            stats: {},
            currentScenarioId: null,
            currentScenarioIndex: 0,
            lastChoiceFeedback: '',
            transientEffect: null,
            error: null,
        });
    },
  
    loadSavedGame: () => {
        const saved = safeLocalStorage.getItem('arunaquest-save');
        if (saved) {
            const savedState = JSON.parse(saved);
            savedState.allQuests = get().allQuests;
            set(savedState);
        }
    }
}));