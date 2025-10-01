'use client'

import { useState } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import BlogModal from '@/components/ui/BlogModal';

export default function QuestLayout({ children }) {
  const [blogModalOpen, setBlogModalOpen] = useState(false);

  return (
    <>
      <Navigation onBlogClick={() => setBlogModalOpen(true)} />
      <main className="bg-[#0B0A11] text-slate-300 font-sans antialiased relative">
        <div className="container mx-auto px-4 py-8 min-h-screen">
          {children}
        </div>
      </main>
      <Footer onBlogClick={() => setBlogModalOpen(true)} />
      <BlogModal isOpen={blogModalOpen} onClose={() => setBlogModalOpen(false)} />
    </>
  );
}