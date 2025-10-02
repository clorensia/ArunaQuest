'use client'

import { useEffect } from 'react';
import { useGameStore } from '@/app/store/gameStore';

// Fallback descriptions jika API return ellipsis
const QUEST_DESCRIPTIONS = {
    'backend-engineer-day-v1': 'Hadapi dilema antara kecepatan dan kualitas saat membangun sebuah fitur, lalu komunikasikan risikonya kepada tim.',
    'ui-ux-designer-day-v1': 'Hadapi brief yang tidak jelas, sintesis data riset, dan negosiasi kendala teknis saat merancang fitur baru.',
    'product-manager-day-v1': 'Navigasi permintaan mendadak dari CEO, dilema prioritas, dan konflik tim untuk menjaga roadmap tetap berjalan.'
};

function QuestDashboard() {
    const { 
        startQuest, 
        loadSavedGame, 
        fetchAllQuests,
        error, 
        allQuests,
        isLoadingQuests 
    } = useGameStore();
    
    const hasSavedGame = false; // You can add logic to check localStorage for saved game

    // Fetch quests on component mount
    useEffect(() => {
        fetchAllQuests();
    }, [fetchAllQuests]);

    // Helper function to get full description
    const getFullDescription = (quest) => {
        // If description has ellipsis or is too short, use fallback
        if (!quest.description || quest.description.includes('…') || quest.description.length < 30) {
            return QUEST_DESCRIPTIONS[quest.id] || quest.description || 'Deskripsi tidak tersedia';
        }
        return quest.description;
    };

    return (
        <div className="p-6 md:p-8 flex flex-col items-center w-full">
            <div className="mb-12 text-center max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                    Pilih Petualanganmu
                </h1>
                <p className="text-lg text-slate-400">
                    Uji kemampuanmu melalui skenario interaktif dan temukan potensimu.
                </p>
            </div>

            {hasSavedGame && (
                <button 
                    onClick={loadSavedGame} 
                    className="mb-8 cta-gradient text-white font-semibold py-3 px-8 rounded-lg shadow-lg cta-button"
                >
                    Lanjutkan Quest Tersimpan
                </button>
            )}

            {error && (
                <div className="bg-rose-500/20 border border-rose-500 text-rose-300 p-4 rounded-lg mb-6 w-full max-w-md">
                    <p className="font-semibold">Terjadi Kesalahan</p>
                    <p>{error}</p>
                </div>
            )}

            {isLoadingQuests ? (
                <div className="flex flex-col items-center justify-center min-h-[40vh]">
                    <div className="loader"></div>
                    <p className="text-xl font-medium mt-6 text-slate-400">
                        Memuat daftar quest...
                    </p>
                </div>
            ) : Object.keys(allQuests).length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-xl text-slate-400 mb-2">
                        Belum ada quest tersedia.
                    </p>
                    <p className="text-slate-500 mb-6">
                        Silakan coba lagi atau hubungi administrator.
                    </p>
                    <button 
                        onClick={fetchAllQuests}
                        className="cta-gradient text-white font-semibold py-3 px-8 rounded-lg cta-button"
                    >
                        Coba Lagi
                    </button>
                </div>
            ) : (
                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Object.values(allQuests).map(quest => (
                        <div 
                            key={quest.id} 
                            className="glass-card p-6 flex flex-col h-full hover:scale-105 transition-transform duration-300"
                        >
                            <h2 className="text-xl font-bold text-white mb-3">
                                {quest.title}
                            </h2>
                            <p className="text-slate-400 mb-6 flex-grow text-sm leading-relaxed">
                                {getFullDescription(quest)}
                            </p>
                            <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                                <span>⏱️ ~15 menit</span>
                                <span>📊 4 skenario</span>
                            </div>
                            <button 
                                onClick={() => startQuest(quest.id)} 
                                className="w-full cta-gradient text-white font-bold py-3 px-4 rounded-lg cta-button"
                            >
                                Mulai Quest
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default QuestDashboard;