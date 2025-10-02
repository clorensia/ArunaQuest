'use client';
import { useEffect } from 'react';
import { useGameStore } from '@/app/store/gameStore';

function QuestDashboard() {
    const { 
        allQuests, 
        isLoadingQuests, 
        error, 
        fetchAllQuests, 
        startQuest 
    } = useGameStore();

    useEffect(() => {
        // Fetch quests on mount if not already loaded
        if (Object.keys(allQuests).length === 0 && !error) {
            fetchAllQuests();
        }
    }, []);

    if (isLoadingQuests) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh]">
                <div className="loader"></div>
                <p className="text-xl font-medium mt-6 text-slate-400">
                    Memuat daftar quest...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
                <div className="glass-card p-8 max-w-md text-center">
                    <div className="text-5xl mb-4">⚠️</div>
                    <h2 className="text-xl font-bold text-white mb-2">Terjadi Kesalahan</h2>
                    <p className="text-slate-400 mb-6">{error}</p>
                    <button
                        onClick={() => fetchAllQuests()}
                        className="cta-gradient text-white font-bold py-3 px-6 rounded-lg cta-button"
                    >
                        Coba Lagi
                    </button>
                </div>
            </div>
        );
    }

    const questList = Object.entries(allQuests);

    if (questList.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
                <div className="glass-card p-8 max-w-md text-center">
                    <div className="text-5xl mb-4">📭</div>
                    <h2 className="text-xl font-bold text-white mb-2">Tidak Ada Quest</h2>
                    <p className="text-slate-400 mb-6">
                        Belum ada quest yang tersedia saat ini.
                    </p>
                    <button
                        onClick={() => fetchAllQuests()}
                        className="cta-gradient text-white font-bold py-3 px-6 rounded-lg cta-button"
                    >
                        Refresh
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                    Quest Dashboard
                </h1>
                <p className="text-xl text-slate-400">
                    Pilih petualanganmu dan mulai berkembang!
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {questList.map(([questId, quest]) => (
                    <div
                        key={questId}
                        className="glass-card p-6 hover:border-purple-500 transition-all cursor-pointer group"
                        onClick={() => startQuest(questId)}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="text-4xl">{quest.icon || '🎯'}</div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                                    {quest.title || questId}
                                </h3>
                            </div>
                        </div>

                        <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                            {quest.description || 'Mulai petualangan ini untuk mempelajari lebih lanjut.'}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {quest.tags?.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center justify-between text-sm text-slate-500">
                            <span>
                                {Object.keys(quest.scenarios || {}).length} Skenario
                            </span>
                            <span className="text-purple-400 font-medium group-hover:underline">
                                Mulai →
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuestDashboard;