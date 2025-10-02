'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QuestReport from '@/app/components/quest/QuestReport';

export default function ReportPage() {
    const [reportData, setReportData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Check if window is defined (client-side only)
        if (typeof window === 'undefined') return;

        try {
            const data = localStorage.getItem('quest-report-data');
            if (data) {
                setReportData(JSON.parse(data));
                // Don't remove immediately - wait until component unmounts or user navigates away
            } else {
                router.replace('/quest');
            }
        } catch (error) {
            console.error('Error loading report data:', error);
            router.replace('/quest');
        }
    }, [router]);

    const handleBackToDashboard = () => {
        // Clear report data when user goes back
        if (typeof window !== 'undefined') {
            localStorage.removeItem('quest-report-data');
        }
        router.push('/quest');
    };

    if (!reportData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh]">
                <div className="loader"></div>
                <p className="text-xl font-medium mt-6 text-slate-400">Memuat Laporan...</p>
            </div>
        );
    }

    return (
        <QuestReport 
            stats={reportData.stats} 
            questData={reportData.questData} 
            onBackToDashboard={handleBackToDashboard} 
        />
    );
}