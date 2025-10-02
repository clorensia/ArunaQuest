'use client';

import { useState, useRef, useCallback } from 'react';
import { useGameStore } from '@/app/store/gameStore';

function MiniGamePlayer({ scenario }) {
    const { completeMinigame } = useGameStore();
    const { title, narrative, minigameData } = scenario;

    const [items, setItems] = useState(() => minigameData.items ? [...minigameData.items] : []);
    
    const [unCategorized, setUnCategorized] = useState(() => minigameData.type === 'categorization' ? [...minigameData.items] : []);
    const [categorized, setCategorized] = useState(() => {
        if (minigameData.type !== 'categorization') return {};
        const initialState = {};
        minigameData.categories.forEach(cat => { initialState[cat] = []; });
        return initialState;
    });

    const draggedItem = useRef(null);
    const draggedOverItem = useRef(null);
    const draggedSource = useRef(null);


    const handleDragStart = (e, item, source, index = null) => {
        draggedItem.current = { item, index, source };
        e.dataTransfer.effectAllowed = 'move';
        setTimeout(() => e.target.classList.add('dragging'), 0);
    };

    const handleDragEnter = (e, index) => {
        draggedOverItem.current = index;
    };
    
    const handleDragEnd = (e) => {
        e.target.classList.remove('dragging');
        draggedItem.current = null;
        draggedOverItem.current = null;
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, dropZone) => {
        e.preventDefault();

        const { item, index: startIndex, source } = draggedItem.current;
        
        // --- LOGIKA UNTUK PRIORITIZATION & FLOW_CHART ---
        if (minigameData.type === 'prioritization' || minigameData.type === 'flow_chart') {
            const endIndex = draggedOverItem.current;
            if (startIndex === endIndex) return;

            const newItems = [...items];
            const [reorderedItem] = newItems.splice(startIndex, 1);
            newItems.splice(endIndex, 0, reorderedItem);
            setItems(newItems);
            return;
        }

        if (minigameData.type === 'categorization') {
            if (source === 'pool') {
                setUnCategorized(prev => prev.filter(i => i.id !== item.id));
            } else {
                setCategorized(prev => ({
                    ...prev,
                    [source]: prev[source].filter(i => i.id !== item.id)
                }));
            }
            if (dropZone === 'pool') {
                setUnCategorized(prev => [...prev, item]);
            } else {
                setCategorized(prev => ({
                    ...prev,
                    [dropZone]: [...prev[dropZone], item]
                }));
            }
        }
    };

    const onCodeClick = (lineNumber) => {
        completeMinigame({ selectedLine: lineNumber }, minigameData);
    };

    const onSubmit = () => {
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
    };

    const renderGame = () => {
        switch (minigameData.type) {
            case 'spot_the_error':
                return (
                    <pre className="bg-slate-900 border border-slate-700 text-slate-300 p-4 rounded-lg font-mono text-sm leading-relaxed">
                        {minigameData.code.map((line) => {
                            const lineNumber = line.match(/^\d+/)?.[0];
                            return (
                                <div key={lineNumber} className="hover:bg-slate-800 cursor-pointer p-1 -mx-2 px-2 rounded" onClick={() => onCodeClick(lineNumber)}>
                                    <code>{line}</code>
                                </div>
                            );
                        })}
                    </pre>
                );
            
            case 'prioritization':
            case 'flow_chart':
                return (
                    <div className="space-y-3">
                        {items.map((item, index) => (
                            <div
                                key={item.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, item, 'main', index)}
                                onDragEnter={(e) => handleDragEnter(e, index)}
                                onDragEnd={handleDragEnd}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, 'main')}
                                className="w-full text-left bg-slate-800/50 border-2 border-slate-700 p-4 rounded-lg cursor-grab active:cursor-grabbing transition-all duration-300"
                            >
                                {item.text}
                            </div>
                        ))}
                    </div>
                );

            case 'categorization':
                return (
                    <div className="flex flex-col md:flex-row gap-6">
                        <div 
                            className="w-full md:w-1/3 p-4 border-2 border-dashed border-slate-700 rounded-lg min-h-[200px]" 
                            onDragOver={handleDragOver} 
                            onDrop={(e) => handleDrop(e, 'pool')}
                        >
                            <h4 className="font-bold text-center mb-4 text-slate-400 uppercase tracking-wider">Item Tersedia</h4>
                            <div className="space-y-2">
                                {unCategorized.map(item => (
                                    <div 
                                      key={item.id} 
                                      draggable 
                                      onDragStart={(e) => handleDragStart(e, item, 'pool')}
                                      onDragEnd={handleDragEnd}
                                      className="bg-slate-800 p-3 rounded border border-slate-700 cursor-grab active:cursor-grabbing"
                                    >
                                        {item.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {minigameData.categories.map(cat => (
                                <div 
                                  key={cat} 
                                  className="p-4 bg-slate-800/30 border border-slate-700 rounded-lg min-h-[200px]" 
                                  onDragOver={handleDragOver} 
                                  onDrop={(e) => handleDrop(e, cat)}
                                >
                                    <h4 className="font-bold text-center mb-4 text-white">{cat}</h4>
                                    <div className="space-y-2">
                                        {(categorized[cat] || []).map(item => (
                                            <div 
                                              key={item.id} 
                                              draggable 
                                              onDragStart={(e) => handleDragStart(e, item, cat)}
                                              onDragEnd={handleDragEnd}
                                              className="bg-slate-700 p-3 rounded border border-slate-600 cursor-grab active:cursor-grabbing"
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

            default: return <p className="text-center text-slate-500 italic">Tipe mini-game tidak dikenal atau sedang dalam pengembangan.</p>;
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col animate-in fade-in duration-500">
            <style jsx global>{`
                .dragging {
                    opacity: 0.5;
                    border-style: dashed;
                }
            `}</style>
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