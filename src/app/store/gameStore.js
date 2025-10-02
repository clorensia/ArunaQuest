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
      
      // ACTIONS
      setGameState: (gameState) => set({ gameState }),

      fetchAllQuests: () => {
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
          console.log(`Memulai generate quest untuk: ${questId}`);
          const data = await generateQuestFromAPI(questId);
          console.log("Quest berhasil di-generate:", data);

          if (!data || !data.scenarios) {
              throw new Error("Data quest yang diterima dari AI tidak valid.");
          }

          const totalScenarios = Object.keys(data.scenarios).length;
          const questDataWithTotal = { ...data, totalScenarios };

          set({
            questData: questDataWithTotal,
            stats: { ...data.initialStats },
            currentScenarioId: data.startScenarioId,
            currentScenarioIndex: 1,
            gameState: GAME_STATES.PLAYING,
          });
        } catch (error) {
          console.error('Error starting quest:', error);
          set({
            error: `Gagal memuat quest dari AI: ${error.message}`,
            gameState: GAME_STATES.DASHBOARD,
          });
        }
      },

      handleChoice: (choice) => {
        const { effect, feedback, nextSceneId } = choice;

        set((state) => ({
          stats: {
            [STATS.TEKNIS]: state.stats[STATS.TEKNIS] + (effect.teknis || 0),
            [STATS.SOSIAL]: state.stats[STATS.SOSIAL] + (effect.sosial || 0),
            [STATS.INISIATIF]: state.stats[STATS.INISIATIF] + (effect.inisiatif || 0),
          },
          lastFeedback: { effect, feedback },
          gameState: GAME_STATES.FEEDBACK,
          pendingNextScenarioId: nextSceneId,
        }));
      },
      
      advanceToNextScenario: () => {
        const nextSceneId = get().pendingNextScenarioId;
        if (nextSceneId === null) {
          get().endQuest();
          return;
        }

        const nextScenario = get().questData.scenarios[nextSceneId];
        if (nextScenario.type === 'minigame') {
          set({
            currentScenarioId: nextSceneId,
            currentScenarioIndex: get().currentScenarioIndex + 1,
            gameState: GAME_STATES.MINIGAME,
            lastFeedback: null,
          });
        } else {
          set({
            currentScenarioId: nextSceneId,
            currentScenarioIndex: get().currentScenarioIndex + 1,
            gameState: GAME_STATES.PLAYING,
            lastFeedback: null,
          });
        }
      },

      completeMinigame: (minigameEffect, feedback, nextSceneId) => {
        set((state) => ({
            stats: {
                [STATS.TEKNIS]: state.stats[STATS.TEKNIS] + (minigameEffect.teknis || 0),
                [STATS.SOSIAL]: state.stats[STATS.SOSIAL] + (minigameEffect.sosial || 0),
                [STATS.INISIATIF]: state.stats[STATS.INISIATIF] + (minigameEffect.inisiatif || 0),
            },
            lastFeedback: { effect: minigameEffect, feedback },
            gameState: GAME_STATES.FEEDBACK,
            pendingNextScenarioId: nextSceneId,
        }));
      },
      
      endQuest: () => {
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
      storage: createJSONStorage(() => localStorage),
    }
  )
);