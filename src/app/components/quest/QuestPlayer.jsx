'use client'

import { useGameStore } from '@/app/store/gameStore';

function VisualNovelScene({ scenario, onChoice, progress, scenarioIndex, totalScenarios, onExit }) {
    const { title, narrative, choices } = scenario;
    return (
      <div className="w-full max-w-4xl mx-auto flex flex-col">
        <div className="flex justify-between items-center mb-4 text-sm text-slate-500">
          <span className="font-medium">Skenario {scenarioIndex} dari {totalScenarios}</span>
          <button onClick={onExit} className="px-3 py-1 bg-slate-700/50 border border-slate-600 rounded text-slate-300 hover:bg-slate-700">
            Keluar
          </button>
        </div>
  
        <div className="w-full bg-slate-700 rounded-full h-2.5 mb-8">
          <div className="bg-purple-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
  
        <div className="glass-card p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
          <p className="text-slate-300 whitespace-pre-line leading-relaxed">{narrative}</p>
        </div>
  
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Pilih aksimu:</h3>
          <div className="space-y-4">
            {choices.map(choice => (
              <button key={choice.id} onClick={() => onChoice(choice)} 
                className="w-full text-left bg-slate-800/50 border-2 border-slate-700 p-4 rounded-lg transition-all hover:border-purple-500 hover:bg-slate-800">
                {choice.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
}

function QuestPlayer() {
    const { currentScenarioId, questData, currentScenarioIndex, handleChoice, resetQuest } = useGameStore();

    if (!questData || !currentScenarioId) return null;

    const scenario = questData.scenarios[currentScenarioId];
    if (!scenario) return null;

    const progress = (currentScenarioIndex / questData.totalScenarios) * 100;

    return (
        <VisualNovelScene 
            scenario={scenario} 
            onChoice={handleChoice} 
            progress={progress} 
            scenarioIndex={currentScenarioIndex} 
            totalScenarios={questData.totalScenarios} 
            onExit={resetQuest}
        />
    );
}
  
export default QuestPlayer;