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
            default:
                userAnswer = {};
        }
        completeMinigame(userAnswer, minigameData);
    }, [completeMinigame, items, categorized, minigameData]);

    const renderGame = () => {
        switch (minigameData.type) {
            case 'spot_the_error':
                return (
                    <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
                        <div className="bg-slate-800 px-4 py-2 border-b border-slate-700">
                            <p className="text-sm text-slate-400">Click pada baris yang berisi error</p>
                        </div>
                        <pre className="text-slate-300 p-4 font-mono text-sm overflow-x-auto">
                            {minigameData.code.map((line, index) => {
                                const lineNumber = line.match(/^\d+/)?.[0];
                                return (
                                    <div 
                                        key={index} 
                                        className="hover:bg-slate-800 cursor-pointer p-2 rounded transition-colors"
                                        onClick={() => lineNumber && onCodeClick(lineNumber)}
                                    >
                                        <code>{line}</code>
                                    </div>
                                );
                            })}
                        </pre>
                    </div>
                );
            
            case 'prioritization':
            case 'flow_chart':
                return (
                    <div className="glass-card p-6">
                        <p className="text-slate-400 text-center mb-4">
                            Fitur drag & drop untuk prioritas/flow chart sedang dalam pengembangan.
                        </p>
                        <p className="text-slate-500 text-sm text-center">
                            Untuk saat ini, klik "Selesai" untuk melanjutkan.
                        </p>
                    </div>
                );

            case 'categorization':
                return (
                    <div className="flex flex-col md:flex-row gap-4">
                        <div 
                            className="w-full md:w-1/3 p-4 border-2 border-dashed border-slate-700 rounded-lg bg-slate-900/50" 
                            onDragOver={onDragOver} 
                            onDrop={(e) => onDrop(e, 'pool')}
                        >
                            <h4 className="font-bold text-center mb-4 text-slate-400">Item Tersedia</h4>
                            <div className="space-y-2 min-h-[100px]">
                                {unCategorized.map(item => (
                                    <div 
                                        key={item.id} 
                                        draggable 
                                        onDragStart={(e) => onDragStart(e, item, 'pool')} 
                                        className="bg-slate-800 p-3 rounded border border-slate-700 cursor-grab active:cursor-grabbing hover:border-purple-500 transition-colors"
                                    >
                                        {item.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {minigameData.categories.map(cat => (
                                <div 
                                    key={cat} 
                                    className="p-4 bg-slate-800/50 border-2 border-slate-700 rounded-lg min-h-[200px]" 
                                    onDragOver={onDragOver} 
                                    onDrop={(e) => onDrop(e, cat)}
                                >
                                    <h4 className="font-bold text-center mb-4 text-white">{cat}</h4>
                                    <div className="space-y-2 min-h-[100px]">
                                        {categorized[cat]?.map(item => (
                                            <div 
                                                key={item.id} 
                                                draggable 
                                                onDragStart={(e) => onDragStart(e, item, cat)} 
                                                className="bg-slate-700 p-3 rounded border border-slate-600 cursor-grab active:cursor-grabbing hover:border-teal-400 transition-colors"
                                            >
                                                {item.text}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'layouting':
                return (
                    <div className="glass-card p-6">
                        <p className="text-slate-400 text-center mb-4">
                            Fitur layouting sedang dalam pengembangan.
                        </p>
                        <p className="text-slate-500 text-sm text-center">
                            Untuk saat ini, klik "Selesai" untuk melanjutkan.
                        </p>
                    </div>
                );

            default: 
                return (
                    <div className="glass-card p-6">
                        <p className="text-slate-500 text-center">
                            Tipe mini-game tidak dikenal: {minigameData.type}
                        </p>
                    </div>
                );
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col animate-in fade-in duration-500">
            <div className="glass-card p-6 md:p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
                <p className="text-slate-300 whitespace-pre-line leading-relaxed">{narrative}</p>
            </div>
            
            <div className="mb-8">
                {renderGame()}
            </div>
            
            {minigameData.type !== 'spot_the_error' && (
                <button 
                    onClick={onSubmit} 
                    className="w-full max-w-xs mx-auto cta-gradient text-white font-bold py-3 rounded-lg cta-button"
                >
                    Selesai
                </button>
            )}
        </div>
    );
}

export default MiniGamePlayer;