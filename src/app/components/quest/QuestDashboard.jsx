'use client'

import { useGameStore } from '@/app/store/gameStore';

function QuestDashboard() {
    const { startQuest, loadSavedGame, error, allQuests } = useGameStore();
    const hasSavedGame = false; // Ganti dengan logika pengecekan local storage jika diperlukan

    return (
        <div className="p-6 md:p-8 flex flex-col items-center w-full">
            <div className="mb-12 text-center max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Pilih Petualanganmu</h1>
                <p className="text-lg text-slate-400">Uji kemampuanmu melalui skenario interaktif dan temukan potensimu.</p>
            </div>

            {hasSavedGame && (
                <button onClick={loadSavedGame} className="mb-8 cta-gradient text-white font-semibold py-3 px-8 rounded-lg shadow-lg cta-button">
                    Lanjutkan Quest Tersimpan
                </button>
            )}

            {error && (
                <div className="bg-rose-500/20 border border-rose-500 text-rose-300 p-4 rounded-lg mb-6 w-full max-w-md">
                    <p className="font-semibold">Terjadi Kesalahan</p>
                    <p>{error}</p>
                </div>
            )}
            
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.values(allQuests).map(quest => (
                    <div key={quest.id} className="glass-card p-6 flex flex-col h-full">
                        <h2 className="text-xl font-bold text-white mb-2">{quest.title}</h2>
                        <p className="text-slate-400 mb-6 flex-grow text-sm">{quest.description}</p>
                        <button onClick={() => startQuest(quest.id)} className="w-full cta-gradient text-white font-bold py-3 px-4 rounded-lg cta-button">
                            Mulai Quest
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuestDashboard;