'use client'

import RevealOnScroll from '@/app/components/animations/RevealOnScroll'
import Link from 'next/link' 

export default function FinalCTA() {
  return (
    <section id="final-cta" className="py-20 md:py-32">
      <div className="container mx-auto px-6 text-center">
        <RevealOnScroll>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">
            Siap Memulai Perjalanan Kariermu dengan Percaya Diri?
          </h2>
        </RevealOnScroll>
        
        <RevealOnScroll delay={200}>
          <div className="mt-10">
            <Link
              href="/quest"
              className="cta-gradient text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg cta-button inline-block"
            >
              Coba Simulasi Gratis
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}