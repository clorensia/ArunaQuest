'use client'

import { Briefcase, TrendingUp, Award } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Features() {
    const features = [
        {
            icon: Briefcase,
            iconBg: 'bg-purple-500/20',
            iconColor: 'text-purple-300',
            title: 'Simulasi Realistis',
            description: 'Jalani simulasi "sehari menjadi..." yang dirancang bersama para ahli industri. Rasakan tantangan kerja yang otentik, bukan sekadar teori.',
        },
        {
            icon: TrendingUp,
            iconBg: 'bg-teal-500/20',
            iconColor: 'text-teal-300',
            title: 'Kenali Potensi Diri',
            description: 'Setiap keputusan akan memberikan umpan balik. Dapatkan laporan personal untuk memahami di mana letak kekuatan dan potensimu.',
        },
        {
            icon: Award,
            iconBg: 'bg-rose-500/20',
            iconColor: 'text-rose-300',
            title: 'Tingkatkan Profil Profesional',
            description: 'Dapatkan lencana digital setelah menyelesaikan simulasi. Tunjukkan kepada rekruter bahwa kamu proaktif dalam merencanakan karier.',
        },
    ]

    const sectionVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
          delayChildren: 0.2,
        }
      }
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
      }
    };

    return (
        <motion.section 
            id="features" 
            className="pt-20 py-20 md:py-28 scroll-mt-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
        >
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.div variants={itemVariants}>
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            Lebih dari Simulasi, Ini Persiapan Nyata untuk Kariermu.
                        </h2>
                    </motion.div>

                    <motion.div variants={itemVariants} custom={1}>
                        <p className="mt-4 text-slate-400 max-w-3xl mx-auto">
                            Dapatkan pengalaman praktis yang membantu kamu membuat keputusan karier yang lebih percaya diri.
                        </p>
                    </motion.div>
                </div>

                <motion.div 
                    className="grid md:grid-cols-3 gap-8 text-left"
                    variants={sectionVariants}
                >
                    {features.map((feature, index) => (
                        <motion.div 
                            key={index} 
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
                        >
                            <div className="glass-card p-8 rounded-2xl h-full">
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
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    )
}