import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react'

const TOAST_TYPES = {
  success: { icon: CheckCircle, color: 'bg-green-500', borderColor: 'border-green-500' },
  error: { icon: XCircle, color: 'bg-red-500', borderColor: 'border-red-500' },
  info: { icon: Info, color: 'bg-blue-500', borderColor: 'border-blue-500' },
  warning: { icon: AlertTriangle, color: 'bg-amber-500', borderColor: 'border-amber-500' }
}

export function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  const [isExiting, setIsExiting] = useState(false)
  const config = TOAST_TYPES[type]
  const Icon = config.icon

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(onClose, 300)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div 
      className={`
        fixed top-6 right-6 z-[100] max-w-md
        glass-card border-l-4 ${config.borderColor}
        p-4 pr-12 rounded-lg shadow-2xl
        ${isExiting ? 'animate-slide-out-right' : 'animate-slide-in-right'}
      `}
    >
      <div className="flex items-start gap-3">
        <div className={`${config.color} p-2 rounded-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        
        <div className="flex-1">
          <p className="text-white font-medium leading-relaxed">
            {message}
          </p>
        </div>

        <button
          onClick={() => {
            setIsExiting(true)
            setTimeout(onClose, 300)
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// Toast Manager Hook
export function useToast() {
  const [toasts, setToasts] = useState([])

  const showToast = (message, type = 'success', duration = 3000) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type, duration }])
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  return {
    toasts,
    showToast,
    success: (msg, dur) => showToast(msg, 'success', dur),
    error: (msg, dur) => showToast(msg, 'error', dur),
    info: (msg, dur) => showToast(msg, 'info', dur),
    warning: (msg, dur) => showToast(msg, 'warning', dur),
  }
}

// Toast Container Component
export function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed top-0 right-0 z-[100] pointer-events-none">
      <div className="flex flex-col gap-3 p-6 pointer-events-auto">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  )
}

// Add to globals.css
const toastStyles = `
@keyframes slide-in-right {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-out-right {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

.animate-slide-in-right {
  animation: slide-in-right 0.3s ease-out;
}

.animate-slide-out-right {
  animation: slide-out-right 0.3s ease-in;
}
`

// Usage Example in QuestDashboard
export function QuestDashboardWithToast() {
  const { toasts, success, error, info, removeToast } = useToast()
  const { startQuest } = useGameStore()

  const handleStartQuest = async (questId) => {
    try {
      info('Memuat quest...')
      await startQuest(questId)
      success('Quest berhasil dimulai! 🎉')
    } catch (err) {
      error('Gagal memuat quest. Coba lagi.')
    }
  }

  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      {/* Rest of component */}
    </>
  )
}