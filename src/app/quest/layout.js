'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const LoadingScreen = () => (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <div className="loader"></div>
    <p className="text-xl font-medium mt-6 text-slate-400">
      Memuat...
    </p>
  </div>
);

export default function QuestLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (user) {
    return (
      <main className="bg-[#0B0A11] text-slate-300 font-sans antialiased">
        <div className="container mx-auto px-4 py-8 min-h-screen">
          {children}
        </div>
      </main>
    );
  }

  return null;
}