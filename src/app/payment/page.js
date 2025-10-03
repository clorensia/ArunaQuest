'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Rocket, Sparkles, Clock } from 'lucide-react'

export default function PaymentPage() {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'))
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-[#0B0A11] text-slate-300 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Animated Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse" 
               style={{ animationDelay: '1s' }} />
        </div>

        {/* Main Content */}
        <div className="relative glass-card p-8 md:p-12 rounded-2xl text-center">
          {/* Icon Animation */}
          <div className="relative mb-8">
            <div className="bg-amber-500/20 text-amber-400 rounded-3xl w-24 h-24 flex items-center justify-center mx-auto animate-bounce">
              <Rocket className="w-12 h-12" />
            </div>
            <Sparkles className="absolute top-0 right-1/3 w-6 h-6 text-purple-400 animate-ping" />
            <Sparkles className="absolute bottom-0 left-1/3 w-8 h-8 text-teal-400 animate-ping" 
                      style={{ animationDelay: '0.5s' }} />
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Hampir Siap Diluncurkan!
          </h1>
          
          <p className="text-xl text-slate-300 mb-2 font-semibold">
            Paket Adventurer
          </p>
          
          <p className="text-slate-400 mb-8 max-w-lg mx-auto leading-relaxed">
            Tim kami sedang mempersiapkan sistem pembayaran yang aman dan mudah untuk kamu. 
            Fitur ini akan segera hadir!
          </p>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-teal-400" />
              <span className="text-teal-400 font-semibold">
                Sedang dalam pengembangan{dots}
              </span>
            </div>
            
            <div className="w-full max-w-md mx-auto bg-slate-700/50 rounded-full h-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 via-teal-400 to-purple-500 rounded-full animate-pulse relative" 
                   style={{ width: '75%' }}>
                <div className="absolute inset-0 bg-white/20 animate-shimmer" />
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-2">75% Complete</p>
          </div>

          {/* Features Preview */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-bold text-white mb-4">Yang Akan Kamu Dapatkan:</h3>
            <ul className="text-left space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-teal-400 text-xl">✓</span>
                <span>Akses tak terbatas ke semua simulasi karier</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-400 text-xl">✓</span>
                <span>Laporan analisis performa yang mendetail</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-400 text-xl">✓</span>
                <span>Lencana digital untuk profil profesional</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-400 text-xl">✓</span>
                <span>Akses prioritas ke simulasi dan fitur baru</span>
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4">
            <Link
              href="/quest"
              className="block w-full cta-gradient text-white font-bold py-4 px-6 rounded-lg cta-button"
            >
              Coba Versi Gratis Dulu
            </Link>
            
            <Link
              href="/"
              className="block w-full secondary-cta text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Beranda
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="relative mt-8 text-center">
          <p className="text-slate-500 text-sm">
            Ingin tahu saat fitur ini diluncurkan?{' '}
            <a href="mailto:info@arunaquest.com" className="text-purple-400 hover:text-purple-300 underline">
              Hubungi kami
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .cta-gradient {
          background: linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%);
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(139, 92, 246, 0.4);
        }

        .secondary-cta {
          background: transparent;
          border: 1px solid #4A5568;
        }

        .secondary-cta:hover {
          background: rgba(139, 92, 246, 0.2);
          border-color: #8B5CF6;
        }
      `}</style>
    </div>
  )
}