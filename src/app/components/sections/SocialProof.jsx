'use client'

import RevealOnScroll from '@/app/components/animations/RevealOnScroll'

export default function SocialProof() {
  const companies = [
    'Skillvul',
    'Perempuan Inovasi',
    'Yayasan Dian Sastro',
    'Markoding',
    'Magnifique'
  ]

  return (
    <section id="social-proof" className="py-16">
      <div className="container mx-auto px-6 text-center">
        <RevealOnScroll>
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">
            DIPERCAYA OLEH TALENTA DARI
          </h3>
        </RevealOnScroll>
        
        <div className="relative w-full overflow-hidden mt-8">
          {/* Gradient Overlays */}
          <div className="absolute inset-0 z-10 pointer-events-none before:absolute before:left-0 before:top-0 before:h-full before:w-1/4 before:bg-gradient-to-r before:from-[#0B0A11] before:content-[''] after:absolute after:right-0 after:top-0 after:h-full after:w-1/4 after:bg-gradient-to-l after:from-[#0B0A11] after:content-['']" />
          
          {/* Marquee Container */}
          <div className="flex animate-marquee">
            {/* First Set */}
            <div className="flex min-w-full shrink-0 items-center justify-around">
              {companies.map((company, index) => (
                <p
                  key={`first-${index}`}
                  className="mx-8 text-xl font-semibold text-slate-400 opacity-60"
                >
                  {company}
                </p>
              ))}
            </div>
            
            {/* Duplicate Set for Seamless Loop */}
            <div className="flex min-w-full shrink-0 items-center justify-around">
              {companies.map((company, index) => (
                <p
                  key={`second-${index}`}
                  className="mx-8 text-xl font-semibold text-slate-400 opacity-60"
                >
                  {company}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}