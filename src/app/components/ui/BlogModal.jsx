'use client'

import { useEffect } from 'react'
import { Wrench } from 'lucide-react'

export default function BlogModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="glass-card p-8 rounded-2xl w-full max-w-md text-center animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-purple-500/20 text-purple-300 rounded-lg w-16 h-16 flex items-center justify-center mb-5 mx-auto">
          <Wrench className="w-8 h-8" />
        </div>
        
        <h3 className="text-2xl font-bold text-white">Segera Hadir!</h3>
        
        <p className="text-slate-400 mt-2">
          Blog kami sedang dalam tahap pengembangan untuk memberikan Anda konten karier terbaik. 
          Nantikan ya!
        </p>
        
        <button
          onClick={onClose}
          className="mt-6 cta-gradient text-white font-semibold px-5 py-2 rounded-lg cta-button"
        >
          Mengerti
        </button>
      </div>
    </div>
  )
}