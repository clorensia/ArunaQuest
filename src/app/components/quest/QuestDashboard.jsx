'use client';
import { useEffect, useState } from 'react';
import { useGameStore } from '@/app/store/gameStore';
import Link from 'next/link';
import NotifyMeModal from '@/app/components/ui/NotifyMeModal';

function QuestDashboard() {
    const {
        allQuests,
        isLoadingQuests,
        error,
        fetchAllQuests,
        startQuest
    } = useGameStore();

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
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
        <>
            <NotifyMeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                        Selamat Datang di Aruna Quest
                    </h1>
                    <p className="text-xl text-slate-400">
                        Pilih petualanganmu dan mulai berkembang!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {questList.map(([questId, quest]) => (
                        <div
                            key={questId}
                            className="glass-card p-6 hover:border-purple-500 transition-all cursor-pointer group flex flex-col relative"
                            onClick={() => startQuest(questId)}
                        >
                            <div className="absolute top-0 left-4 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-b-lg animate-blink">
                                Quest Tersedia
                            </div>
                            <div className="flex-grow pt-8">
                                <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors mb-3">
                                    {quest.title || questId}
                                </h3>
                                <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-grow">
                                    {quest.description || 'Mulai petualangan ini untuk mempelajari lebih lanjut.'}
                                </p>
                            </div>
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

                            <div className="flex items-center justify-between text-sm text-slate-500 mt-auto pt-4 border-t border-slate-700/50">
                                <span>
                                    {Object.keys(quest.scenarios || {}).length} Skenario
                                </span>
                                <span className="text-purple-400 font-medium group-hover:underline">
                                    Mulai →
                                </span>
                            </div>
                        </div>
                    ))}
                    <div
                        className="glass-card p-6 border-dashed hover:border-purple-500 flex flex-col text-left"
                    >
                        <div className="flex-grow">
                             <h3 className="text-xl font-bold text-white mb-2">
                                Tunggu sebentar... 
                            </h3>
                             <p className="text-purple-400 text-sm font-semibold mb-3">Quest Baru sedang dalam perjalanan!</p>
                            <p className="text-slate-400 text-sm mb-4 flex-grow">
                                Kami sedang merancang tantangan terbaru yang bakal bikin penasaran. Simpan energimu!
                            </p>
                        </div>
                        <div className="flex items-center justify-between text-sm text-slate-500 mt-auto pt-4 border-t border-slate-700/50">
                            <span>Akan segera hadir</span>
                            <button onClick={() => setIsModalOpen(true)} className="text-purple-400 font-medium hover:underline">
                                Beritahu Saya! →
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/"
                        className="secondary-cta text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg inline-flex items-center justify-center gap-2 w-full sm:w-auto"
                    >
                        &larr; Kembali ke Halaman Utama
                    </Link>
                </div>

            </div>
        </>
    );
}

export default QuestDashboard;