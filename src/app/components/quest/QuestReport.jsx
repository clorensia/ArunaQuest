'use client'
import React from 'react';

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

function QuestReport({ stats, questData, onBackToDashboard }) {
    if (!stats || !questData) return null;

    const badge = getBadge(stats);

    const getAnalysis = (stat, value) => {
        const formattedStat = stat.charAt(0).toUpperCase() + stat.slice(1);
        if (value >= 14) return `Sangat Baik dalam aspek ${formattedStat}. Anda menunjukkan pemahaman dan eksekusi yang luar biasa.`;
        if (value >= 11) return `Cukup baik dalam aspek ${formattedStat}. Ada pemahaman yang solid, namun masih ada ruang untuk berkembang.`;
        return `Aspek ${formattedStat} perlu ditingkatkan. Ini adalah area potensial untuk pengembangan diri Anda.`;
    };

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

                <div className="glass-card p-6 mb-8">
                    <h3 className="text-xl font-bold text-white mb-6 text-center">Analisis Kinerja</h3>
                    <div className="space-y-6">
                        {Object.entries(stats).map(([stat, value]) => (
                            <div key={stat}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="capitalize font-medium text-slate-300">{stat}</span>
                                    <span className="font-bold text-white">{value}</span>
                                </div>
                                <div className="w-full bg-slate-700 rounded-full h-2.5">
                                    <div className="bg-teal-400 h-2.5 rounded-full" style={{ width: `${Math.min(100, (value / 20) * 100)}%` }} />
                                </div>
                                <p className="text-sm text-slate-400 mt-2 italic">{getAnalysis(stat, value)}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {questData.recommendations && (
                    <div className="mb-10">
                        <h3 className="text-xl font-bold text-white mb-4 text-center">Rekomendasi Pengembangan</h3>
                        <div className="space-y-4">
                            {questData.recommendations.map(rec => (
                                <a key={rec.title} href={rec.link} target="_blank" rel="noopener noreferrer" 
                                   className="flex items-start gap-4 p-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-purple-500 transition-colors">
                                    <div className="text-2xl">{rec.icon}</div>
                                    <div className="text-left">
                                        <p className="font-semibold text-white">{rec.title}</p>
                                        <p className="text-sm text-slate-400">{rec.description}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
                
                <div className="text-center">
                    <button onClick={onBackToDashboard} className="w-full max-w-xs mx-auto cta-gradient text-white font-bold py-3 rounded-lg cta-button">
                        Kembali ke Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QuestReport;