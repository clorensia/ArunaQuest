'use client'

import { Briefcase, TrendingUp, Award } from 'lucide-react'
import RevealOnScroll from '@/app/components/animations/RevealOnScroll'

export default function Features() {
    const features = [
        {
            icon: Briefcase,
            iconBg: 'bg-purple-500/20',
            iconColor: 'text-purple-300',
            title: 'Simulasi Realistis',
            description: 'Jalani simulasi "sehari menjadi..." yang dirancang bersama para ahli industri. Rasakan tantangan kerja yang otentik, bukan sekadar teori.',
            delay: 200,
        },
        {
            icon: TrendingUp,
            iconBg: 'bg-teal-500/20',
            iconColor: 'text-teal-300',
            title: 'Kenali Potensi Diri',
            description: 'Setiap keputusan akan memberikan umpan balik. Dapatkan laporan personal untuk memahami di mana letak kekuatan dan potensimu.',
            delay: 350,
        },
        {
            icon: Award,
            iconBg: 'bg-rose-500/20',
            iconColor: 'text-rose-300',
            title: 'Tingkatkan Profil Profesional',
            description: 'Dapatkan lencana digital setelah menyelesaikan simulasi. Tunjukkan kepada rekruter bahwa kamu proaktif dalam merencanakan karier.',
            delay: 500,
        },
    ]

    return (
        <section id="features" className="pt-20 py-20 md:py-28 scroll-mt-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <RevealOnScroll>
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            Lebih dari Simulasi, Ini Persiapan Nyata untuk Kariermu.
                        </h2>
                    </RevealOnScroll>

                    <RevealOnScroll delay={150}>
                        <p className="mt-4 text-slate-400 max-w-3xl mx-auto">
                            Dapatkan pengalaman praktis yang membantu kamu membuat keputusan karier yang lebih percaya diri.
                        </p>
                    </RevealOnScroll>
                </div>

                <div className="grid md:grid-cols-3 gap-8 text-left">
                    {features.map((feature, index) => (
                        <RevealOnScroll key={index} delay={feature.delay}>
                            <div className="glass-card p-8 rounded-2xl">
                                <div className={`${feature.iconBg} ${feature.iconColor} rounded-lg w-12 h-12 flex items-center justify-center mb-5`}>
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-white">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-400">
                                    {feature.description}
                                </p>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    )
}