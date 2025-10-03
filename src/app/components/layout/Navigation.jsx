'use client'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { LogOut, User, Sparkles } from 'lucide-react'

export default function Navigation({ onBlogClick, onCommunityClick }) {
  const { user, signOut } = useAuth()

  return (
    <nav className="bg-black/30 backdrop-blur-lg sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white hover:text-purple-400 transition-colors">
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
          {onCommunityClick && (
            <button 
              onClick={onCommunityClick}
              className="hover:text-white transition-colors"
            >
              Community
            </button>
          )}
        </div>
        
        <div>
          {user ? (
            // User logged in - Show profile + quest access
            <div className="flex items-center gap-3">
              {/* Quick Quest Access */}
              <Link
                href="/quest"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/50 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span className="font-semibold">Quest</span>
              </Link>

              {/* User Profile */}
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName} 
                    className="w-8 h-8 rounded-full border-2 border-purple-500"
                  />
                ) : (
                  <User className="w-8 h-8 text-purple-400" />
                )}
                <span className="text-white text-sm font-medium hidden sm:inline max-w-[100px] truncate">
                  {user.displayName || 'User'}
                </span>
              </div>

              {/* Logout Button */}
              <button
                onClick={signOut}
                className="secondary-cta text-white font-semibold px-4 py-2 rounded-lg inline-flex items-center gap-2 hover:bg-rose-500/20 hover:border-rose-500/50 hover:text-rose-300 transition-all"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            // User not logged in - Show sign in
            <Link
              href="/login"
              className="cta-gradient text-white font-semibold px-5 py-2 rounded-lg cta-button inline-flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}