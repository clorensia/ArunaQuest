'use client'

import { CheckCircle } from 'lucide-react'
import RevealOnScroll from '@/components/animations/RevealOnScroll'

export default function Pricing() {
const plans = [
  {
    name: 'Explorer',
    description: 'Sempurna untuk memulai.',
    price: 'Gratis',
    features: [
      'Akses ke 3 simulasi awal',
      'Laporan keahlian dasar',
    ],
    buttonText: 'Coba Gratis',
    buttonClass: 'secondary-cta',
    delay: 200,
  },
  {
    name: 'Adventurer',
    description: 'Untuk eksplorasi karier yang mendalam.',
    price: 'Rp 150K',
    priceUnit: '/tahun',
    features: [
      'Akses tak terbatas ke semua simulasi',
      'Laporan performa yang mendetail',
      'Dapatkan lencana digital profesional',
      'Akses prioritas untuk simulasi baru',
    ],
    buttonText: 'Mulai Eksplorasi',
    buttonClass: 'cta-gradient cta-button',
    popular: true,
    delay: 350,
  },
  {
    name: 'Untuk Institusi',
    description: 'Bagi universitas & organisasi.',
    price: 'Hubungi Kami',
    features: [
      'Akses terintegrasi untuk mahasiswa',
      'Dasbor & laporan analitik',
      'Opsi simulasi yang disesuaikan',
    ],
    buttonText: 'Hubungi Tim Sales',
    buttonClass: 'secondary-cta',
    delay: 500,
  },
]
  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <RevealOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Pilih Jalur Eksplorasimu
            </h2>
          </RevealOnScroll>
          
          <RevealOnScroll delay={150}>
            <p className="mt-4 text-slate-400 max-w-3xl mx-auto">
              Mulai gratis, dan tingkatkan paketmu saat siap untuk eksplorasi lebih dalam.
            </p>
          </RevealOnScroll>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {plans.map((plan, index) => (
            <RevealOnScroll key={index} delay={plan.delay}>
              <div className={`glass-card p-8 rounded-2xl h-full ${plan.popular ? 'border-2 border-purple-500 relative' : ''}`}>
                {plan.popular && (
                  <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-500 text-white text-sm font-bold rounded-full">
                    PALING POPULER
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                <p className="text-slate-400 mt-2">{plan.description}</p>
                
                <p className="text-5xl font-extrabold text-white mt-8">
                  {plan.price}
                  {plan.priceUnit && (
                    <span className="text-lg font-medium text-slate-400">
                      {plan.priceUnit}
                    </span>
                  )}
                </p>
                
                <ul className="mt-8 space-y-4 text-slate-300">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <a
                  href="#"
                  className={`${plan.buttonClass} block text-center w-full mt-10 text-white font-bold py-3 rounded-lg`}
                >
                  {plan.buttonText}
                </a>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}