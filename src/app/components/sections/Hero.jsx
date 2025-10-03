import { useState, useEffect } from 'react'
import { PlayCircle } from 'lucide-react'
import RevealOnScroll from '@/app/components/animations/RevealOnScroll'
import Link from 'next/link'

export default function ParallaxHero({ onVideoClick }) {
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className="hero-gradient relative overflow-hidden min-h-[90vh] flex items-center">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Floating Orbs with Parallax */}
                <div 
                    className="absolute top-20 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
                    style={{ transform: `translateY(${scrollY * 0.3}px)` }}
                />
                <div 
                    className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse"
                    style={{ transform: `translateY(${scrollY * 0.5}px)` }}
                />
                <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-3xl animate-pulse"
                    style={{ transform: `translate(-50%, -50%) scale(${1 + scrollY * 0.0005})` }}
                />

                {/* Floating Icons/Elements */}
                <div 
                    className="absolute top-32 right-1/4 text-6xl opacity-10 animate-float"
                    style={{ transform: `translateY(${scrollY * 0.2}px)` }}
                >
                    🎯
                </div>
                <div 
                    className="absolute bottom-40 left-1/4 text-5xl opacity-10 animate-float-delayed"
                    style={{ transform: `translateY(${scrollY * 0.4}px)` }}
                >
                    🚀
                </div>
                <div 
                    className="absolute top-1/3 left-10 text-4xl opacity-10 animate-float"
                    style={{ transform: `translateY(${scrollY * 0.25}px)` }}
                >
                    💡
                </div>
            </div>

            <div className="container mx-auto px-6 py-24 text-center relative z-10">
                <RevealOnScroll>
                    <div className="inline-block mb-6">
                        <span className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold border border-purple-500/30">
                            🎉 New: AI-Powered Career Analysis
                        </span>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                        Tidak Yakin dengan Pilihan Karier?{' '}
                        <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                            Coba Dulu Sebelum Memutuskan.
                        </span>
                    </h1>
                </RevealOnScroll>

                <RevealOnScroll delay={150}>
                    <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        Jangan tebak-tebakan. Coba langsung berbagai profesi melalui simulasi interaktif,
                        dan temukan bidang yang paling cocok dengan potensimu.
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={300}>
                    <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link
                            href="/quest"
                            className="group cta-gradient text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg cta-button inline-block w-full sm:w-auto relative overflow-hidden"
                        >
                            <span className="relative z-10">Coba Simulasi Gratis</span>
                            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                        </Link>

                        <button
                            onClick={onVideoClick}
                            className="group secondary-cta text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg inline-flex items-center justify-center gap-2 w-full sm:w-auto"
                        >
                            <PlayCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            Lihat Demo Singkat
                        </button>
                    </div>
                </RevealOnScroll>

                {/* Trust Badge */}
                <RevealOnScroll delay={450}>
                    <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            <span>100% Gratis untuk Pemula</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            <span>Tanpa Kartu Kredit</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-green-400">✓</span>
                            <span>AI-Powered Analysis</span>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }

                @keyframes float-delayed {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-30px); }
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                .animate-float-delayed {
                    animation: float-delayed 8s ease-in-out infinite;
                    animation-delay: 1s;
                }
            `}</style>
        </header>
    )
}