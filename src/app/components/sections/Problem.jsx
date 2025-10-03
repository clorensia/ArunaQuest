'use client'

import { Compass, Users, Shield, FileText, GraduationCap } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Problem() {
  const problems = [
    {
      icon: Compass,
      iconColor: 'text-purple-400',
      description: 'Bingung memilih dari banyaknya opsi karier tanpa arahan yang jelas.',
    },
    {
      icon: Users,
      iconColor: 'text-teal-400',
      description: 'Tertarik pada suatu bidang, tapi ragu dengan kemampuan diri sendiri.',
    },
    {
      icon: Shield,
      iconColor: 'text-rose-400',
      description: 'Takut salah pilih dan terjebak di karier yang tidak sesuai passion.',
    },
    {
      icon: FileText,
      iconColor: 'text-indigo-400',
      description: 'Deskripsi pekerjaan tidak menggambarkan keseharian yang sebenarnya.',
    },
    {
      icon: GraduationCap, 
      iconColor: 'text-amber-400',
      description: 'Merasa skill yang dipelajari di bangku kuliah kurang relevan untuk dunia kerja.',
    },
  ]

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.section 
      id="problem" 
      className="py-20 md:py-28 mb-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-6 text-center">
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Pernah Mengalami Hal Ini?
          </h2>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <p className="text-slate-400 max-w-2xl mx-auto mb-16">
            Jika iya, kamu tidak sendirian. Ini adalah tantangan yang sering dialami banyak orang saat merencanakan karier:
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-4"
          variants={sectionVariants}
        >
          {problems.map((problem, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <div className="glass-card p-8 rounded-xl h-full flex flex-col items-center justify-start min-h-[240px] lg:col-span-1">
                <problem.icon className={`w-16 h-16 mx-auto ${problem.iconColor} mb-6`} />
                <p className="font-medium text-slate-300 text-base leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}