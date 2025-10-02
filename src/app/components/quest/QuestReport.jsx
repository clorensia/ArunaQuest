'use client'
import React, { useState, useEffect } from 'react';

const getBadge = (stats) => {
    const sortedStats = Object.entries(stats).sort(([, a], [, b]) => b - a);
    if (!sortedStats.length) return { name: 'Pencapai Misterius', icon: '❓' };
    const topStat = sortedStats[0][0];
    switch (topStat) {
        case 'teknis': return { name: 'Problem Solver Strategis', icon: '🧠' };
        case 'sosial': return { name: 'Komunikator Andal', icon: '🤝' };
        case 'inisiatif': return { name: 'Pemimpin Proaktif', icon: '🚀' };
        default: return { name: 'Pencapai Seimbang', icon: '🌟' };
    }
};

function QuestReport({ stats, questData, onBackToDashboard }) {
    const [aiAnalysis, setAiAnalysis] = useState(null);
    const [aiRecommendations, setAiRecommendations] = useState([]);
    const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(true);
    const [analysisError, setAnalysisError] = useState(null);
    const [videoModalUrl, setVideoModalUrl] = useState(null);

    useEffect(() => {
        const fetchAnalysis = async () => {
            try {
                setIsLoadingAnalysis(true);
                const response = await fetch('/api/analyze-quest', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        finalStats: stats,
                        questTitle: questData.title || 'Quest'
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                
                if (data.error) {
                    throw new Error(data.error);
                }
                
                setAiAnalysis(data.analysis);
                setAiRecommendations(data.recommendations || []);
            } catch (error) {
                console.error('Error fetching analysis:', error);
                setAnalysisError('Gagal memuat analisis: ' + error.message);
            } finally {
                setIsLoadingAnalysis(false);
            }
        };

        if (stats && questData) {
            fetchAnalysis();
        }
    }, [stats, questData]);

    const handleResourceClick = (rec) => {
        // Try to search for YouTube video first
        const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(rec.searchQuery + ' tutorial')}`;
        window.open(youtubeSearchUrl, '_blank');
    };

    const handleGoogleSearch = (searchQuery) => {
        const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
        window.open(googleUrl, '_blank');
    };

    if (!stats || !questData) return null;

    const badge = getBadge(stats);

    const getAnalysis = (stat, value) => {
        const formattedStat = stat.charAt(0).toUpperCase() + stat.slice(1);
        if (value >= 14) return `Sangat Baik dalam aspek ${formattedStat}. Anda menunjukkan pemahaman dan eksekusi yang luar biasa.`;
        if (value >= 11) return `Cukup baik dalam aspek ${formattedStat}. Ada pemahaman yang solid, namun masih ada ruang untuk berkembang.`;
        return `Aspek ${formattedStat} perlu ditingkatkan. Ini adalah area potensial untuk pengembangan diri Anda.`;
    };

    // Prioritize AI recommendations, only use static as fallback
    const allRecommendations = aiRecommendations.length > 0 
        ? aiRecommendations 
        : (questData.recommendations || []);

    return (
        <div className="flex flex-col items-center justify-center px-4 py-12 animate-in fade-in duration-500">
            <div className="w-full max-w-3xl">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white">Quest Selesai!</h1>
                    <p className="text-slate-400 mt-2">Berikut hasil petualanganmu.</p>
                </div>

                <div className="glass-card p-8 mb-10 text-center">
                    <div className="text-6xl mb-4 animate-bounce">{badge.icon}</div>
                    <p className="text-sm text-purple-400 font-semibold tracking-wider">BADGE DIDAPATKAN</p>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">{badge.name}</h2>
                </div>

                {/* AI Analysis Section */}
                <div className="glass-card p-6 mb-8">
                    <h3 className="text-xl font-bold text-white mb-4 text-center flex items-center justify-center gap-2">
                        <span>✨</span>
                        Analisis Coach Nara
                    </h3>

                    {isLoadingAnalysis ? (
                        <div className="flex flex-col items-center py-8">
                            <div className="loader mb-4"></div>
                            <p className="text-slate-400 text-sm">Menganalisis performamu...</p>
                        </div>
                    ) : analysisError ? (
                        <div className="bg-rose-500/20 border border-rose-500 text-rose-300 p-4 rounded-lg">
                            <p className="text-sm">{analysisError}</p>
                        </div>
                    ) : (
                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                            <p className="text-slate-300 leading-relaxed italic">
                                "{aiAnalysis}"
                            </p>
                        </div>
                    )}
                </div>

                {/* Stats Breakdown */}
                <div className="glass-card p-6 mb-8">
                    <h3 className="text-xl font-bold text-white mb-6 text-center">Detail Skor</h3>
                    <div className="space-y-6">
                        {Object.entries(stats).map(([stat, value]) => (
                            <div key={stat}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="capitalize font-medium text-slate-300">{stat}</span>
                                    <span className="font-bold text-white">{value}</span>
                                </div>
                                <div className="w-full bg-slate-700 rounded-full h-2.5">
                                    <div
                                        className="bg-teal-400 h-2.5 rounded-full transition-all duration-1000"
                                        style={{ width: `${Math.min(100, (value / 20) * 100)}%` }}
                                    />
                                </div>
                                <p className="text-sm text-slate-400 mt-2 italic">{getAnalysis(stat, value)}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dynamic + Static Recommendations */}
                {allRecommendations.length > 0 && (
                    <div className="mb-10">
                        <h3 className="text-xl font-bold text-white mb-4 text-center">
                            {aiRecommendations.length > 0 ? '🎯 Rekomendasi Personal' : 'Rekomendasi Pengembangan'}
                        </h3>
                        <div className="space-y-4">
                            {allRecommendations.map((rec, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-4 p-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-purple-500 transition-colors"
                                >
                                    <div className="text-2xl">{rec.icon}</div>
                                    <div className="flex-1 text-left">
                                        <p className="font-semibold text-white mb-1">{rec.title}</p>
                                        <p className="text-sm text-slate-400 mb-3">{rec.description}</p>
                                        
                                        {rec.searchQuery ? (
                                            <div className="flex gap-2 flex-wrap">
                                                <button
                                                    onClick={() => handleResourceClick(rec)}
                                                    className="text-xs px-3 py-1.5 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                                                >
                                                    🎥 Cari Video Tutorial
                                                </button>
                                                <button
                                                    onClick={() => handleGoogleSearch(rec.searchQuery)}
                                                    className="text-xs px-3 py-1.5 bg-blue-500/20 border border-blue-500/50 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
                                                >
                                                    🔍 Cari Resource Lain
                                                </button>
                                            </div>
                                        ) : rec.link ? (
                                            <a
                                                href={rec.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block text-xs px-3 py-1.5 bg-purple-500/20 border border-purple-500/50 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors"
                                            >
                                                Pelajari Lebih Lanjut →
                                            </a>
                                        ) : null}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="text-center">
                    <button
                        onClick={onBackToDashboard}
                        className="w-full max-w-xs mx-auto cta-gradient text-white font-bold py-3 rounded-lg cta-button"
                    >
                        Kembali ke Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QuestReport;