'use client'
import { useState, useEffect } from 'react'
import { PlayCircle } from 'lucide-react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ParallaxHero({ onVideoClick }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollY } = useScroll()
  
  // Parallax transformations
  const y1 = useTransform(scrollY, [0, 500], [0, 150])
  const y2 = useTransform(scrollY, [0, 500], [0, 250])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.8])

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <header className="hero-gradient relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Animated Background Elements with Parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        <motion.div 
          className="absolute top-20 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
          style={{ y: y1 }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"
          style={{ y: y2 }}
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Floating Icons with Mouse Parallax */}
        <motion.div 
          className="absolute top-32 right-1/4 text-6xl opacity-10"
          style={{ 
            x: mousePosition.x * 2,
            y: mousePosition.y * 2
          }}
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🎯
        </motion.div>
        
        <motion.div 
          className="absolute bottom-40 left-1/4 text-5xl opacity-10"
          style={{ 
            x: mousePosition.x * -1.5,
            y: mousePosition.y * -1.5
          }}
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, -15, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          🚀
        </motion.div>
        
        <motion.div 
          className="absolute top-1/3 left-10 text-4xl opacity-10"
          style={{ 
            x: mousePosition.x * 3,
            y: mousePosition.y * 3
          }}
          animate={{ 
            y: [0, -15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          💡
        </motion.div>
      </div>

      {/* Content with Scroll Parallax */}
      <motion.div 
        className="container mx-auto px-6 py-24 text-center relative z-10"
        style={{ opacity, scale }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-block mb-6"
        >
          <motion.span 
            className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold border border-purple-500/30 inline-flex items-center gap-2"
            whileHover={{ scale: 1.05, borderColor: 'rgba(139, 92, 246, 0.5)' }}
          >
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              🎉
            </motion.span>
            New: AI-Powered Career Analysis
          </motion.span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Tidak Yakin dengan Pilihan Karier?{' '}
          <motion.span 
            className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ['0%', '100%', '0%']
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ backgroundSize: '200%' }}
          >
            Coba Dulu Sebelum Memutuskan.
          </motion.span>
        </motion.h1>

        {/* Description */}
        <motion.p 
          className="mt-6 text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Jangan tebak-tebakan. Coba langsung berbagai profesi melalui simulasi interaktif,
          dan temukan bidang yang paling cocok dengan potensimu.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Link href="/quest">
            <motion.button
              className="group cta-gradient text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg cta-button inline-block w-full sm:w-auto relative overflow-hidden"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Coba Simulasi Gratis</span>
              
              {/* Shine effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          </Link>

          <motion.button
            onClick={onVideoClick}
            className="group secondary-cta text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg inline-flex items-center justify-center gap-2 w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              whileHover={{ scale: 1.2, rotate: 90 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <PlayCircle className="w-6 h-6" />
            </motion.div>
            Lihat Demo Singkat
          </motion.button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div 
          className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-slate-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {[
            { icon: '✓', text: '100% Gratis untuk Pemula' },
            { icon: '✓', text: 'Tanpa Kartu Kredit' },
            { icon: '✓', text: 'AI-Powered Analysis' }
          ].map((badge, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.1, color: '#10b981' }}
            >
              <motion.span 
                className="text-green-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
              >
                {badge.icon}
              </motion.span>
              <span>{badge.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </header>
  )
}