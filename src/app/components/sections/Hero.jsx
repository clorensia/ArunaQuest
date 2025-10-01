'use client'

import { PlayCircle } from 'lucide-react'
import RevealOnScroll from '@/components/animations/RevealOnScroll'

export default function Hero({ onVideoClick }) {
  return (
    <header className="hero-gradient relative overflow-hidden">
      <div className="container mx-auto px-6 pt-24 pb-28 text-center">
        <RevealOnScroll>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Experience Your Future Career, Today.
          </h1>
        </RevealOnScroll>
        
        <RevealOnScroll delay={150}>
          <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
            Stop guessing. ArunaQuest lets you test-drive professions through realistic, 
            interactive simulations, so you can choose your career path with confidence.
          </p>
        </RevealOnScroll>
        
        <RevealOnScroll delay={300}>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <a 
              href="#"
              className="cta-gradient text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg cta-button inline-block w-full sm:w-auto"
            >
              Start Your First Quest
            </a>
            
            <button
              onClick={onVideoClick}
              className="secondary-cta text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg inline-flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <PlayCircle className="w-6 h-6" />
              Watch a Demo
            </button>
          </div>
        </RevealOnScroll>
      </div>
    </header>
  )
}