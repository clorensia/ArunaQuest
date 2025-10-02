'use client'

import { useEffect, useState } from 'react'
import { Mail, PartyPopper } from 'lucide-react'

export default function NotifyMeModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | success

  useEffect(() => {
    // Reset state saat modal dibuka/ditutup
    if (isOpen) {
      setStatus('idle');
      setEmail('');
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi email sederhana
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return;
    }
    setStatus('submitting');
    // Simulasi pemanggilan API
    setTimeout(() => {
      console.log(`Email submitted: ${email}`); // Di dunia nyata, ini akan dikirim ke server
      setStatus('success');
    }, 1500);
  };

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
        {status === 'success' ? (
          // Tampilan setelah berhasil submit
          <div>
            <div className="bg-teal-500/20 text-teal-300 rounded-lg w-16 h-16 flex items-center justify-center mb-5 mx-auto">
              <PartyPopper className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Terima Kasih!</h3>
            <p className="text-slate-400 mt-2">
              Kamu akan jadi yang pertama tahu saat Quest Travelis dirilis. Sampai jumpa, petualang!
            </p>
            <button
              onClick={onClose}
              className="mt-6 cta-gradient text-white font-semibold px-5 py-2 rounded-lg cta-button"
            >
              Mengerti
            </button>
          </div>
        ) : (
          // Tampilan form email
          <div>
            <div className="bg-purple-500/20 text-purple-300 rounded-lg w-16 h-16 flex items-center justify-center mb-5 mx-auto">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Jadilah yang Pertama Tahu!</h3>
            <p className="text-slate-400 mt-2">
              Masukkan email-mu untuk mendapatkan notifikasi eksklusif saat "Quest Travelis" diluncurkan.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <input
                type="email"
                placeholder="email@kamu.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-800/50 border-2 border-slate-700 p-3 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="cta-gradient text-white font-semibold px-5 py-3 rounded-lg cta-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Mengirim...
                  </div>
                ) : (
                  'Beritahu Saya'
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}