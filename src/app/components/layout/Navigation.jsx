'use client'; 
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext'; 

export default function Navigation({ onBlogClick }) {
  const { user, logOut } = useAuth(); 

  return (
    <nav className="bg-black/30 backdrop-blur-lg sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          ArunaQuest
        </Link>
        
        <div className="hidden md:flex items-center space-x-8 text-slate-300">
          <a href="/#problem" className="hover:text-white transition-colors">
            Problem
          </a>
          <a href="/#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="/#pricing" className="hover:text-white transition-colors">
            Pricing
          </a>
          <button 
            onClick={onBlogClick}
            className="hover:text-white transition-colors"
          >
            Blog
          </button>
        </div>
        
        <div>
          {user ? (
            // Jika user sudah login
            <button 
              onClick={logOut}
              className="secondary-cta text-white font-semibold px-5 py-2 rounded-lg inline-block"
            >
              Sign Out
            </button>
          ) : (
            // Jika belum login
            <Link 
              href="/login"
              className="cta-gradient text-white font-semibold px-5 py-2 rounded-lg cta-button inline-block"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}