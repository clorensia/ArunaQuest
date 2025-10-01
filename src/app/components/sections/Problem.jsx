'use client'

import { Compass, Users, Shield, FileText, GraduationCap } from 'lucide-react'
import RevealOnScroll from '@/app/components/animations/RevealOnScroll'

export default function Problem() {
  const problems = [
    {
      icon: Compass,
      iconColor: 'text-purple-400',
      description: 'Bingung memilih dari banyaknya opsi karier tanpa arahan yang jelas.',
      delay: 200,
    },
    {
      icon: Users,
      iconColor: 'text-teal-400',
      description: 'Tertarik pada suatu bidang, tapi ragu dengan kemampuan diri sendiri.',
      delay: 300,
    },
    {
      icon: Shield,
      iconColor: 'text-rose-400',
      description: 'Takut salah pilih dan terjebak di karier yang tidak sesuai passion.',
      delay: 400,
    },
    {
      icon: FileText,
      iconColor: 'text-indigo-400',
      description: 'Deskripsi pekerjaan tidak menggambarkan keseharian yang sebenarnya.',
      delay: 500,
    },
    {
      icon: GraduationCap, 
      iconColor: 'text-amber-400',
      description: 'Merasa skill yang dipelajari di bangku kuliah kurang relevan untuk dunia kerja.', // <-- MASALAH BARU
      delay: 600,
    },
  ]

  return (
    <section id="problem" className="py-20 md:py-28 mb-4 ">
      <div className="container mx-auto px-6 text-center">
        <RevealOnScroll>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Pernah Mengalami Hal Ini?
          </h2>
        </RevealOnScroll>
        
        <RevealOnScroll delay={150}>
          <p className="text-slate-400 max-w-2xl mx-auto mb-16">
            Jika iya, kamu tidak sendirian. Ini adalah tantangan yang sering dialami banyak orang saat merencanakan karier:
          </p>
        </RevealOnScroll>
        
        {/* Penyesuaian Grid untuk 5 item */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-4">
          {problems.map((problem, index) => (
            <RevealOnScroll key={index} delay={problem.delay}>
              {/* Menambahkan class 'lg:col-span-1' untuk memastikan setiap item mengambil 1 kolom di layar besar */}
              <div className="glass-card p-8 rounded-xl h-full flex flex-col items-center justify-start min-h-[240px] lg:col-span-1">
                <problem.icon className={`w-16 h-16 mx-auto ${problem.iconColor} mb-6`} />
                <p className="font-medium text-slate-300 text-base leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}