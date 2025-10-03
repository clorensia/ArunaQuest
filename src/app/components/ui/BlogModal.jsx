'use client'
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { backdropVariants, modalVariants } from "./ModalVariants.jsx"

export default function BlogModal({ isOpen, onClose }) {
  if (!isOpen) return null

  const blogPosts = [
    { title: "Kesalahan Fatal Saat Memilih Karier", excerpt: "Hindari jebakan umum.", date: "15 Des 2024", readTime: "5 min" },
    { title: "Mengapa Simulasi Lebih Efektif", excerpt: "Learning by doing lebih efektif.", date: "10 Des 2024", readTime: "7 min" },
    { title: "Career Path: Engineer vs PM", excerpt: "Analisis perbedaan jalur karier.", date: "5 Des 2024", readTime: "8 min" }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          <motion.div
            className="relative w-full max-w-3xl bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-700 my-8"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-6 flex justify-between">
              <h2 className="text-2xl font-bold text-white">📝 Blog & Insights</h2>
              <button onClick={onClose} className="bg-slate-800 hover:bg-slate-700 rounded-full p-2">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {blogPosts.map((post, i) => (
                <motion.article
                  key={i}
                  className="glass-card p-6 border border-slate-700 hover:border-purple-500"
                  whileHover={{ scale: 1.02 }}
                >
                  <h3 className="text-lg font-bold text-white mb-2">{post.title}</h3>
                  <p className="text-slate-400 text-sm mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>📅 {post.date}</span>
                    <span>⏱️ {post.readTime}</span>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
