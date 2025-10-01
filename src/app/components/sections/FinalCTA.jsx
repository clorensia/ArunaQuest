'use client'

import RevealOnScroll from '@/components/animations/RevealOnScroll'

export default function FinalCTA() {
  return (
    <section id="final-cta" className="py-20 md:py-32">
      <div className="container mx-auto px-6 text-center">
        <RevealOnScroll>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">
            Ready to Find Your Career Clarity?
          </h2>
        </RevealOnScroll>
        
        <RevealOnScroll delay={200}>
          <div className="mt-10">
            <a
              href="#"
              className="cta-gradient text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg cta-button inline-block"
            >
              Sign Up & Start Your Adventure
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}