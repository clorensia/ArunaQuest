'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGameStore, GAME_STATES } from '@/app/store/gameStore';

import QuestDashboard from '@/app/components/quest/QuestDashboard';
import QuestPlayer from '@/app/components/quest/QuestPlayer';
import MiniGamePlayer from '@/app/components/quest/MiniGamePlayer';
import FeedbackScreen from '@/app/components/quest/FeedbackScreen';
import FloatingScore from '@/app/components/quest/FloatingScore';

const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="loader"></div>
      <p className="text-xl font-medium mt-6 text-slate-400">Menyiapkan petualanganmu...</p>
    </div>
);

export default function QuestPage() {
    const { gameState, currentScenarioId, questData, transientEffect } = useGameStore();
    const router = useRouter();

    useEffect(() => {
        if (gameState === GAME_STATES.REPORT) {
            router.push('/quest/report');
        }
    }, [gameState, router]);

    const renderContent = () => {
        switch (gameState) {
            case GAME_STATES.LOADING:
                return <LoadingSpinner />;
            case GAME_STATES.PLAYING:
                return <QuestPlayer />;
            case GAME_STATES.MINIGAME:
                const scenario = questData?.scenarios?.[currentScenarioId];
                return scenario ? <MiniGamePlayer scenario={scenario} /> : <LoadingSpinner />;
            case GAME_STATES.FEEDBACK:
                return <FeedbackScreen />;
            case GAME_STATES.DASHBOARD:
            default:
                return <QuestDashboard />;
        }
    };

    return (
        <>
            <FloatingScore effect={transientEffect} />
            {renderContent()}
        </>
    );
}