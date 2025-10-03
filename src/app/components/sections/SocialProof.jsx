'use client'

import { motion } from 'framer-motion'

export default function SocialProof() {
  const companies = [
    'Skilvul',
    'Perempuan Inovasi',
    'Yayasan Dian Sastro',
    'Markoding',
    'Magnifique'
  ]

  // Varian untuk animasi marquee
  const marqueeVariants = {
    animate: {
      x: [0, -1000], // Sesuaikan nilai -1000 jika daftar perusahaan lebih panjang
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20, // Durasi untuk satu putaran
          ease: "linear",
        },
      },
    },
  };
  
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <motion.section 
      id="social-proof" 
      className="py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-6 text-center">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">
            DIPERCAYA OLEH TALENTA DARI
          </h3>
        
        <div className="relative w-full overflow-hidden mt-8">
          {/* Gradient Overlays untuk efek fade di tepi */}
          <div className="absolute inset-y-0 left-0 z-10 w-1/4 bg-gradient-to-r from-[#0B0A11] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 z-10 w-1/4 bg-gradient-to-l from-[#0B0A11] to-transparent pointer-events-none" />
          
          {/* Marquee Container dengan Framer Motion */}
          <motion.div
            className="flex"
            variants={marqueeVariants}
            animate="animate"
          >
            {/* Duplikasi list untuk loop yang mulus */}
            {[...companies, ...companies].map((company, index) => (
              <p
                key={index}
                className="mx-8 text-xl font-semibold text-slate-400 opacity-60 flex-shrink-0"
                style={{ minWidth: '150px', textAlign: 'center' }} // Memberi lebar minimum agar tidak berdempetan
              >
                {company}
              </p>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}