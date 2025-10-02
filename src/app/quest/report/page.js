"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import QuestReport from "@/app/components/quest/QuestReport";
import { useGameStore } from "@/app/store/gameStore";

export default function ReportPage() {
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const resetQuest = useGameStore((state) => state.resetQuest);
  useEffect(() => {
    // Check if window is defined (client-side only)
    if (typeof window === "undefined") return;

    const loadReportData = () => {
      try {
        const data = localStorage.getItem("quest-report-data");

        if (data) {
          const parsedData = JSON.parse(data);
          setReportData(parsedData);
          setIsLoading(false);
        } else {
          console.log("No report data found, redirecting to dashboard");
          router.replace("/quest");
        }
      } catch (error) {
        console.error("Error loading report data:", error);
        router.replace("/quest");
      }
    };

    // Small delay to ensure localStorage is ready
    const timer = setTimeout(loadReportData, 100);

    return () => clearTimeout(timer);
  }, [router]);

   const handleBackToDashboard = () => {
        // Hapus localStorage (opsional karena resetQuest sudah melakukannya)
        localStorage.removeItem('quest-report-data');
        
        // Reset state game ke kondisi awal
        resetQuest(); // <-- PANGGIL FUNGSI RESET DI SINI
        
        // Arahkan kembali ke dashboard
        router.push('/quest');
    };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="loader"></div>
        <p className="text-xl font-medium mt-6 text-slate-400">
          Memuat Laporan...
        </p>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <p className="text-xl text-slate-400 mb-4">
          Data laporan tidak ditemukan
        </p>
        <button
          onClick={() => router.push("/quest")}
          className="cta-gradient text-white font-bold py-3 px-6 rounded-lg cta-button"
        >
          Kembali ke Dashboard
        </button>
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
