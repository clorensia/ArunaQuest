'use client'
import { useState, useRef, useCallback } from 'react';
import { useGameStore } from '@/app/store/gameStore';

// Komponen ini akan menangani semua jenis mini-game
function MiniGamePlayer({ scenario }) {
    const { completeMinigame } = useGameStore();
    const { title, narrative, minigameData } = scenario;
    
    // States untuk drag & drop
    const [items, setItems] = useState(minigameData.items || []);
    const [categorized, setCategorized] = useState(() => {
        const initialState = {};
        minigameData.categories?.forEach(cat => { initialState[cat] = []; });
        return initialState;
    });
    const [unCategorized, setUnCategorized] = useState(minigameData.items || []);

    const draggedItem = useRef(null);
    const draggedSource = useRef(null);

    const onDragStart = useCallback((e, item, source) => {
        draggedItem.current = item;
        draggedSource.current = source;
        e.dataTransfer.effectAllowed = 'move';
    }, []);

    const onDragOver = useCallback((e) => e.preventDefault(), []);

    const onDrop = useCallback((e, targetCategory) => {
        e.preventDefault();
        const item = draggedItem.current;
        const source = draggedSource.current;
        if (!item) return;

        // Logic untuk memindahkan item dari source ke target
        setCategorized(prev => {
            const newCategorized = { ...prev };
            // Hapus dari source
            if (source !== 'pool') {
                newCategorized[source] = newCategorized[source].filter(i => i.id !== item.id);
            }
            // Tambah ke target
            if (targetCategory !== 'pool') {
                newCategorized[targetCategory] = [...newCategorized[targetCategory], item];
            }
            return newCategorized;
        });

        setUnCategorized(prev => {
            if (source === 'pool') {
                return prev.filter(i => i.id !== item.id);
            }
            if (targetCategory === 'pool') {
                return [...prev, item];
            }
            return prev;
        });
    }, []);


    const onCodeClick = useCallback((lineNumber) => {
        completeMinigame({ selectedLine: lineNumber }, minigameData);
    }, [completeMinigame, minigameData]);

    const onSubmit = useCallback(() => {
        let userAnswer;
        switch (minigameData.type) {
            case 'prioritization':
            case 'flow_chart':
                userAnswer = { items };
                break;
            case 'categorization':
                userAnswer = { categorizedItems: categorized };
                break;
            // ... tambahkan case lain jika ada
            default:
                userAnswer = {};
        }
        completeMinigame(userAnswer, minigameData);
    }, [completeMinigame, items, categorized, minigameData]);

    const renderGame = () => {
        switch (minigameData.type) {
            case 'spot_the_error':
                return (
                    <pre className="bg-slate-900 border border-slate-700 text-slate-300 p-4 rounded-lg font-mono text-sm">
                        {minigameData.code.map((line, index) => (
                            <div key={index} className="hover:bg-slate-800 cursor-pointer p-1 rounded" onClick={() => onCodeClick(line.match(/^\d+/)[0])}>
                                <code>{line}</code>
                            </div>
                        ))}
                    </pre>
                );
            
            case 'prioritization':
            case 'flow_chart':
                // Implementasi drag and drop untuk ordering
                // (Untuk simplisitas, kode ini belum ditambahkan, tapi bisa dikembangkan)
                return <div className='text-center text-slate-400 italic'>(Fitur Drag & Drop untuk Prioritas/Flow Chart)</div>

            case 'categorization':
                return (
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-1/3 p-4 border-2 border-dashed border-slate-700 rounded-lg" onDragOver={onDragOver} onDrop={(e) => onDrop(e, 'pool')}>
                            <h4 className="font-bold text-center mb-4 text-slate-400">Item Tersedia</h4>
                            <div className="space-y-2 min-h-[100px]">
                                {unCategorized.map(item => (
                                    <div key={item.id} draggable onDragStart={(e) => onDragStart(e, item, 'pool')} className="bg-slate-800 p-2 rounded border border-slate-700 cursor-grab">
                                        {item.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {minigameData.categories.map(cat => (
                                <div key={cat} className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg" onDragOver={onDragOver} onDrop={(e) => onDrop(e, cat)}>
                                    <h4 className="font-bold text-center mb-4 text-white">{cat}</h4>
                                    <div className="space-y-2 min-h-[100px]">
                                        {categorized[cat].map(item => (
                                            <div key={item.id} draggable onDragStart={(e) => onDragStart(e, item, cat)} className="bg-slate-700 p-2 rounded border border-slate-600 cursor-grab">
                                                {item.text}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            default: return <p className="text-slate-500">Tipe mini-game tidak dikenal.</p>;
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col animate-in fade-in duration-500">
            <div className="glass-card p-6 md:p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
                <p className="text-slate-300 whitespace-pre-line leading-relaxed">{narrative}</p>
            </div>
            <div className="mb-8">{renderGame()}</div>
            {minigameData.type !== 'spot_the_error' && (
                <button onClick={onSubmit} className="w-full max-w-xs mx-auto cta-gradient text-white font-bold py-3 rounded-lg cta-button">
                    Selesai
                </button>
            )}
        </div>
    );
}

export default MiniGamePlayer;