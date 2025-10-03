'use client'
import { useEffect, useState } from 'react'

export default function ConfettiEffect({ active = false, duration = 3000 }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (!active) return

    const colors = ['#8B5CF6', '#EC4899', '#14B8A6', '#F59E0B', '#EF4444']
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 2 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 8 + Math.random() * 8,
      delay: Math.random() * 0.5,
      rotation: Math.random() * 360,
    }))

    setParticles(newParticles)

    const timer = setTimeout(() => {
      setParticles([])
    }, duration)

    return () => clearTimeout(timer)
  }, [active, duration])

  if (!active || particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[90] overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute top-0 animate-confetti-fall"
          style={{
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            animationDuration: `${particle.animationDuration}s`,
            animationDelay: `${particle.delay}s`,
            transform: `rotate(${particle.rotation}deg)`,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
          }}
        />
      ))}
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }

        .animate-confetti-fall {
          animation: confetti-fall linear forwards;
        }
      `}</style>
    </div>
  )
}

// Enhanced QuestReport with Confetti
export function QuestReportWithConfetti({ stats, questData, onBackToDashboard }) {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    // Trigger confetti on mount
    setShowConfetti(true)
    
    // Stop confetti after animation
    const timer = setTimeout(() => setShowConfetti(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <ConfettiEffect active={showConfetti} duration={4000} />
      
      <div className="flex flex-col items-center justify-center px-4 py-12 animate-in fade-in duration-500">
        <div className="w-full max-w-3xl">
          {/* Celebration Header */}
          <div className="text-center mb-10 relative">
            <div className="inline-block mb-4 animate-bounce">
              <span className="text-7xl">🎉</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
              Quest Selesai!
            </h1>
            <p className="text-slate-400 mt-2 text-lg">
              Kamu baru saja menyelesaikan sebuah perjalanan karier yang luar biasa! ✨
            </p>
          </div>

          {/* Badge Display with Animation */}
          <div className="glass-card p-8 mb-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-teal-500/10" />
            <div className="relative z-10">
              <div className="text-7xl mb-4 animate-scale-in">{getBadge(stats).icon}</div>
              <p className="text-sm text-purple-400 font-semibold tracking-wider">
                BADGE DIDAPATKAN
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
                {getBadge(stats).name}
              </h2>
            </div>
          </div>

          {/* Rest of report content */}
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-scale-in {
          animation: scale-in 0.6s ease-out;
        }
      `}</style>
    </>
  )
}