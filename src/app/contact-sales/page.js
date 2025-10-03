'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Send, Building, Mail, User, Phone, MessageSquare, CheckCircle, Sparkles } from 'lucide-react'

export default function ContactSalesPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('📧 Form submitted:', formData)
    
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      institution: '',
      message: ''
    })
    setIsSuccess(false)
  }

  return (
    <div className="min-h-screen bg-[#0B0A11] text-slate-300 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        {/* Animated Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse" 
               style={{ animationDelay: '1s' }} />
        </div>

        {/* Main Content */}
        <div className="relative glass-card rounded-2xl overflow-hidden">
          {isSuccess ? (
            // Success State
            <div className="p-8 md:p-12 text-center">
              <div className="relative mb-8">
                <div className="bg-green-500/20 text-green-400 rounded-full w-24 h-24 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <Sparkles className="absolute top-0 right-1/3 w-6 h-6 text-purple-400 animate-ping" />
                <Sparkles className="absolute bottom-0 left-1/3 w-8 h-8 text-teal-400 animate-ping" 
                          style={{ animationDelay: '0.5s' }} />
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">
                Pesan Berhasil Terkirim! 🎉
              </h2>
              
              <p className="text-slate-400 mb-2 max-w-lg mx-auto">
                Terima kasih telah menghubungi kami, <span className="text-white font-semibold">{formData.name}</span>!
              </p>
              
              <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                Tim sales kami akan segera menghubungi Anda melalui email di <span className="text-teal-400">{formData.email}</span> dalam 1-2 hari kerja.
              </p>

              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8 max-w-lg mx-auto">
                <h3 className="text-lg font-bold text-white mb-3">Yang Akan Kami Bahas:</h3>
                <ul className="text-left space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-400">✓</span>
                    <span>Solusi terbaik untuk institusi Anda</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-400">✓</span>
                    <span>Demo platform secara langsung</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-400">✓</span>
                    <span>Pricing yang disesuaikan kebutuhan</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <button
                  onClick={resetForm}
                  className="w-full max-w-md mx-auto block secondary-cta text-white font-semibold py-3 px-6 rounded-lg"
                >
                  Kirim Pesan Lain
                </button>
                
                <Link
                  href="/"
                  className="w-full max-w-md mx-auto block text-center text-slate-400 hover:text-white transition-colors py-2"
                >
                  ← Kembali ke Beranda
                </Link>
              </div>
            </div>
          ) : (
            // Form State
            <div className="p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="relative inline-block mb-4">
                  <div className="bg-purple-500/20 text-purple-400 rounded-2xl w-20 h-20 flex items-center justify-center">
                    <Building className="w-10 h-10" />
                  </div>
                  <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-teal-400 animate-pulse" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  Hubungi Tim Sales Kami
                </h1>
                <p className="text-slate-400 max-w-lg mx-auto">
                  Dapatkan solusi terbaik untuk institusi pendidikan atau organisasi Anda
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl mx-auto">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Nama Lengkap <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      placeholder="Contoh: Budi Santoso"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      placeholder="budi@university.ac.id"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Nomor Telepon
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      placeholder="+62 812 3456 7890"
                    />
                  </div>
                </div>

                {/* Institution */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Nama Institusi <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      type="text"
                      name="institution"
                      value={formData.institution}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      placeholder="Contoh: Universitas Indonesia"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Pesan <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-11 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                      placeholder="Ceritakan kebutuhan institusi Anda. Contoh: Kami ingin mengintegrasikan ArunaQuest untuk 500 mahasiswa..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full cta-gradient text-white font-bold py-4 px-6 rounded-lg cta-button flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Mengirim Pesan...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Kirim Pesan
                    </>
                  )}
                </button>

                <p className="text-xs text-slate-500 text-center">
                  Dengan mengirim formulir ini, Anda menyetujui untuk dihubungi oleh tim sales kami melalui email atau telepon.
                </p>
              </form>

              {/* Back Button */}
              <div className="mt-8 text-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali ke Beranda
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .cta-gradient {
          background: linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%);
        }

        .cta-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(139, 92, 246, 0.4);
        }

        .secondary-cta {
          background: transparent;
          border: 1px solid #4A5568;
        }

        .secondary-cta:hover {
          background: rgba(139, 92, 246, 0.2);
          border-color: #8B5CF6;
        }
      `}</style>
    </div>
  )
}