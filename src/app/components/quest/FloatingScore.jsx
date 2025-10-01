import { memo } from 'react';

const FloatingScore = memo(({ effect }) => {
    if (!effect) return null;
    return (
        <div className="fixed top-24 right-8 flex flex-col items-end justify-center animate-fade-out-up pointer-events-none z-50">
            {Object.entries(effect).map(([stat, value]) => (
                <div key={stat} className={`text-lg font-bold px-3 py-1 rounded-lg shadow-lg mb-2 ${value > 0 ? 'bg-teal-500 text-white' : 'bg-rose-500 text-white'}`}>
                    {value > 0 ? '+' : ''}{value} {stat.charAt(0).toUpperCase() + stat.slice(1)}
                </div>
            ))}
        </div>
    );
});

export default FloatingScore;