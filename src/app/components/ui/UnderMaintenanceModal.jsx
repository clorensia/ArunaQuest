import { useEffect } from 'react'
import { Construction, ArrowLeft } from 'lucide-react'

export default function UnderMaintenanceModal({ isOpen, onClose, feature = "Fitur ini" }) {
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
        className="glass-card p-8 rounded-2xl w-full max-w-md text-center animate-in zoom-in-95 duration-300 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-teal-500 rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        <div className="relative z-10">
          {/* Icon with Animation */}
          <div className="bg-amber-500/20 text-amber-400 rounded-2xl w-20 h-20 flex items-center justify-center mb-6 mx-auto animate-bounce">
            <Construction className="w-10 h-10" />
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-2">
            Sedang Dalam Pengembangan
          </h3>
          
          <p className="text-slate-300 mb-1 font-medium">
            {feature}
          </p>
          
          <p className="text-slate-400 text-sm mb-6">
            Tim kami sedang bekerja keras untuk menghadirkan pengalaman terbaik untukmu. Stay tuned! 🚀
          </p>

          {/* Progress Bar Animation */}
          <div className="w-full bg-slate-700/50 rounded-full h-2 mb-6 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 via-teal-400 to-purple-500 rounded-full animate-pulse" 
                 style={{ width: '65%' }} />
          </div>
          
          <button
            onClick={onClose}
            className="w-full cta-gradient text-white font-semibold px-6 py-3 rounded-lg cta-button flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </button>
        </div>
      </div>
    </div>
  )
}