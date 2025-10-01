'use client'

import { useState } from 'react';
import Navigation from '@/app/components/layout/Navigation';
import Footer from '@/app/components/layout/Footer';
import BlogModal from '@/app/components/ui/BlogModal';

export default function QuestLayout({ children }) {
  return (
    <main className="bg-[#0B0A11] text-slate-300 font-sans antialiased">
      <div className="container mx-auto px-4 py-8 min-h-screen">
        {children}
      </div>
    </main>
  );
}