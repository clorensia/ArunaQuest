'use client'
import { useGameStore } from '@/app/store/gameStore';

function FeedbackScreen() {
    const lastChoiceFeedback = useGameStore(state => state.lastChoiceFeedback);
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center animate-in fade-in duration-500">
            <div className="max-w-2xl w-full glass-card p-8">
                <p className="text-xl md:text-2xl italic text-slate-300">"{lastChoiceFeedback}"</p>
                <div className="loader mt-6 mx-auto"></div>
            </div>
        </div>
    );
}

export default FeedbackScreen;