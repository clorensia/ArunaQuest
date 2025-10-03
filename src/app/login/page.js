'use client';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const { user, signInWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/quest'); // Arahkan ke dashboard jika sudah login
    }
  }, [user, router]);

  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="glass-card p-8 md:p-12 rounded-2xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Selamat Datang!</h1>
        <p className="text-slate-400 mb-8">Masuk untuk melanjutkan petualanganmu.</p>
        
        <button
          onClick={signInWithGoogle}
          className="w-full bg-white/10 border border-white/20 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg inline-flex items-center justify-center gap-3 transition-all hover:bg-white/20"
        >
          <LogIn className="w-6 h-6" />
          Masuk dengan Google
        </button>

        <div className="mt-8">
            <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">
                &larr; Kembali ke Halaman Utama
            </Link>
        </div>
      </div>
    </main>
  );
}