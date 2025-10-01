'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QuestReport from '@/components/quest/QuestReport';

export default function ReportPage() {
    const [reportData, setReportData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const data = localStorage.getItem('quest-report-data');
        if (data) {
            setReportData(JSON.parse(data));
            localStorage.removeItem('quest-report-data');
        } else {
            router.replace('/quest');
        }
    }, [router]);

    const handleBackToDashboard = () => {
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