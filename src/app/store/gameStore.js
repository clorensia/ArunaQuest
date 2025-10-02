// file: src/app/store/gameStore.js (KODE LENGKAP PENGGANTI)
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const GAME_STATES = {
  SPLASH: 'SPLASH',
  DASHBOARD: 'DASHBOARD',
  LOADING: 'LOADING',
  PLAYING: 'PLAYING',
  FEEDBACK: 'FEEDBACK',
  MINIGAME: 'MINIGAME',
  REPORT: 'REPORT',
};

export const STATS = {
  TEKNIS: 'teknis',
  SOSIAL: 'sosial',
  INISIATIF: 'inisiatif',
};

// Fungsi baru untuk memanggil "jembatan" API kita
const generateQuestFromAPI = async (questId) => {
  const response = await fetch('/api/generate-quest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ questId }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Gagal berkomunikasi dengan server ArunaQuest.');
  }
  return await response.json();
};

export const useGameStore = create(
  persist(
    (set, get) => ({
      // STATE
      gameState: GAME_STATES.SPLASH,
      allQuests: {},
      questData: null,
      stats: {},
      currentScenarioId: null,
      currentScenarioIndex: 0,
      lastFeedback: null,
      error: null,
      isLoadingQuests: true,
      pendingNextScenarioId: null,
      transientEffect: null,
      
      // ACTIONS
      setGameState: (gameState) => set({ gameState }),

      fetchAllQuests: () => {
        // Daftar quest yang tersedia sekarang statis, hanya untuk ditampilkan di dashboard
        const availableQuests = {
          'product-manager': { id: 'product-manager', title: 'A Day as a Product Manager', description: 'Navigasi permintaan, dilema prioritas, dan konflik tim.' },
          'ui-ux-designer': { id: 'ui-ux-designer', title: 'A Day as a UI/UX Designer', description: 'Hadapi brief tidak jelas dan kendala teknis.' },
          'backend-engineer': { id: 'backend-engineer', title: 'A Day as a Back-End Engineer', description: 'Atasi bug, rancang sistem, dan berkolaborasi.' },
        };
        set({ allQuests: availableQuests, isLoadingQuests: false });
      },

      startQuest: async (questId) => {
        set({ gameState: GAME_STATES.LOADING, error: null });
        try {
          const data = await generateQuestFromAPI(questId);

          if (!data || !data.scenarios) {
              throw new Error("Data quest yang diterima dari AI tidak valid.");
          }
          
          set({
            questData: data,
            stats: { ...data.initialStats },
            currentScenarioId: data.startScenarioId,
            currentScenarioIndex: 1,
            gameState: GAME_STATES.PLAYING,
          });
        } catch (error) {
          console.error('Error starting quest:', error);
          set({
            error: `Gagal memuat quest: ${error.message}`,
            gameState: GAME_STATES.DASHBOARD,
          });
        }
      },

      handleChoice: (choice) => {
        const { effect, feedback, nextSceneId } = choice;
        const newStats = { ...get().stats };
        newStats[STATS.TEKNIS] += (effect.teknis || 0);
        newStats[STATS.SOSIAL] += (effect.sosial || 0);
        newStats[STATS.INISIATIF] += (effect.inisiatif || 0);

        set({
          stats: newStats,
          lastFeedback: { effect, feedback },
          gameState: GAME_STATES.FEEDBACK,
          pendingNextScenarioId: nextSceneId,
          transientEffect: effect,
        });
        setTimeout(() => set({ transientEffect: null }), 1000);
      },
      
      advanceToNextScenario: () => {
        const nextSceneId = get().pendingNextScenarioId;
        if (nextSceneId === null) {
          get().endQuest();
          return;
        }

        const nextScenario = get().questData.scenarios[nextSceneId];
        const newGameState = nextScenario?.type === 'minigame' ? GAME_STATES.MINIGAME : GAME_STATES.PLAYING;
        
        set((state) => ({
          currentScenarioId: nextSceneId,
          currentScenarioIndex: state.currentScenarioIndex + 1,
          gameState: newGameState,
          lastFeedback: null,
        }));
      },

      completeMinigame: (minigameEffect, feedback, nextSceneId) => {
        get().handleChoice({ effect: minigameEffect, feedback, nextSceneId });
      },
      
      endQuest: () => {
        const { questData, stats } = get();
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('lastQuestReport', JSON.stringify({ questData, stats }));
        }
        set({ gameState: GAME_STATES.REPORT });
      },

      resetGame: () => {
        set({
          gameState: GAME_STATES.DASHBOARD,
          questData: null,
          stats: {},
          currentScenarioId: null,
          currentScenarioIndex: 0,
          lastFeedback: null,
          error: null,
        });
      },
    }),
    {
      name: 'arunaquest-storage',
      storage: createJSONStorage(() => sessionStorage), // Ganti ke sessionStorage agar tidak tersimpan selamanya
      partialize: (state) => ({
        // Hanya simpan state yang aman untuk disimpan
      }),
    }
  )
);