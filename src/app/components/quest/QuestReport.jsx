'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Home, RefreshCw, Share2, Trophy, Sparkles, ExternalLink } from 'lucide-react'

const getBadge = (stats) => {
  const sortedStats = Object.entries(stats).sort(([, a], [, b]) => b - a)
  if (!sortedStats.length) return { name: 'Pencapai Misterius', icon: '❓' }
  const topStat = sortedStats[0][0]
  switch (topStat) {
    case 'teknis': return { name: 'Problem Solver Strategis', icon: '🧠' }
    case 'sosial': return { name: 'Komunikator Andal', icon: '🤝' }
    case 'inisiatif': return { name: 'Pemimpin Proaktif', icon: '🚀' }
    default: return { name: 'Pencapai Seimbang', icon: '🌟' }
  }
}

function QuestReport({ stats, questData, onBackToDashboard }) {
  const [aiAnalysis, setAiAnalysis] = useState(null)
  const [aiRecommendations, setAiRecommendations] = useState([])
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(true)
  const [analysisError, setAnalysisError] = useState(null)
  const [shareModalOpen, setShareModalOpen] = useState(false)

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setIsLoadingAnalysis(true)
        const response = await fetch('/api/analyze-quest', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            finalStats: stats,
            questTitle: questData.title || 'Quest'
          }),
        })

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        
        const data = await response.json()
        if (data.error) throw new Error(data.error)
        
        setAiAnalysis(data.analysis)
        setAiRecommendations(data.recommendations || [])
      } catch (error) {
        console.error('Error fetching analysis:', error)
        setAnalysisError('Gagal memuat analisis: ' + error.message)
      } finally {
        setIsLoadingAnalysis(false)
      }
    }

    if (stats && questData) fetchAnalysis()
  }, [stats, questData])

  const handleResourceClick = (rec) => {
    const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(rec.searchQuery + ' tutorial')}`
    window.open(youtubeSearchUrl, '_blank')
  }

  const handleGoogleSearch = (searchQuery) => {
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`
    window.open(googleUrl, '_blank')
  }

  const handleShare = () => {
    setShareModalOpen(true)
  }

  const handleSharePlatform = (platform) => {
    const badge = getBadge(stats)
    const text = `🎯 Saya baru saja menyelesaikan ${questData.title} di ArunaQuest dan mendapat badge "${badge.name}"! Coba juga yuk simulasi karier yang seru ini!`
    const url = window.location.origin
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    }
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400')
    setShareModalOpen(false)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.origin)
    alert('Link berhasil disalin! 🎉')
    setShareModalOpen(false)
  }

  if (!stats || !questData) return null

  const badge = getBadge(stats)
  const getAnalysis = (stat, value) => {
    const formattedStat = stat.charAt(0).toUpperCase() + stat.slice(1)
    if (value >= 14) return `Sangat Baik dalam aspek ${formattedStat}. Anda menunjukkan pemahaman dan eksekusi yang luar biasa.`
    if (value >= 11) return `Cukup baik dalam aspek ${formattedStat}. Ada pemahaman yang solid, namun masih ada ruang untuk berkembang.`
    return `Aspek ${formattedStat} perlu ditingkatkan. Ini adalah area potensial untuk pengembangan diri Anda.`
  }

  const allRecommendations = aiRecommendations.length > 0 
    ? aiRecommendations 
    : (questData.recommendations || [])

  return (
    <motion.div 
      className="flex flex-col items-center justify-center px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="w-full max-w-3xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">Quest Selesai!</h1>
          <p className="text-slate-400 mt-2">Berikut hasil petualanganmu.</p>
        </motion.div>

        {/* Badge */}
        <motion.div 
          className="glass-card p-8 mb-10 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div 
            className="text-6xl mb-4"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            {badge.icon}
          </motion.div>
          <p className="text-sm text-purple-400 font-semibold tracking-wider">BADGE DIDAPATKAN</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">{badge.name}</h2>
        </motion.div>

        {/* AI Analysis */}
        <motion.div 
          className="glass-card p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-white mb-4 text-center flex items-center justify-center gap-2">
            <span>✨</span>
            Analisis Coach Nara
          </h3>

          {isLoadingAnalysis ? (
            <div className="flex flex-col items-center py-8">
              <div className="loader mb-4"></div>
              <p className="text-slate-400 text-sm">Menganalisis performamu...</p>
            </div>
          ) : analysisError ? (
            <div className="bg-rose-500/20 border border-rose-500 text-rose-300 p-4 rounded-lg">
              <p className="text-sm">{analysisError}</p>
            </div>
          ) : (
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-300 leading-relaxed italic">
                "{aiAnalysis}"
              </p>
            </div>
          )}
        </motion.div>

        {/* Detail Skor */}
        <motion.div 
          className="glass-card p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-white mb-6 text-center">Detail Skor</h3>
          <div className="space-y-6">
            {Object.entries(stats).map(([stat, value]) => (
              <div key={stat}>
                <div className="flex items-center justify-between mb-1">
                  <span className="capitalize font-medium text-slate-300">{stat}</span>
                  <span className="font-bold text-white">{value}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2.5">
                  <motion.div
                    className="bg-teal-400 h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (value / 20) * 100)}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
                <p className="text-sm text-slate-400 mt-2 italic">{getAnalysis(stat, value)}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recommendations */}
        {allRecommendations.length > 0 && (
          <motion.div 
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-xl font-bold text-white mb-4 text-center">
              {aiRecommendations.length > 0 ? '🎯 Rekomendasi Personal' : 'Rekomendasi Pengembangan'}
            </h3>
            <div className="space-y-4">
              {allRecommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-purple-500 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div className="text-2xl">{rec.icon}</div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-white mb-1">{rec.title}</p>
                    <p className="text-sm text-slate-400 mb-3">{rec.description}</p>
                    
                    {rec.searchQuery ? (
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => handleResourceClick(rec)}
                          className="text-xs px-3 py-1.5 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                        >
                          🎥 Cari Video Tutorial
                        </button>
                        <button
                          onClick={() => handleGoogleSearch(rec.searchQuery)}
                          className="text-xs px-3 py-1.5 bg-blue-500/20 border border-blue-500/50 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
                        >
                          🔍 Cari Resource Lain
                        </button>
                      </div>
                    ) : rec.link ? (
                      <a
                        href={rec.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-xs px-3 py-1.5 bg-purple-500/20 border border-purple-500/50 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors"
                      >
                        Pelajari Lebih Lanjut →
                      </a>
                    ) : null}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA Section - ENHANCED WITH MULTIPLE OPTIONS */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {/* Primary Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Try Another Quest */}
            <motion.button
              onClick={onBackToDashboard}
              className="group cta-gradient text-white font-bold py-4 px-6 rounded-xl cta-button flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              Coba Quest Lain
            </motion.button>

            {/* Share Results */}
            <motion.button
              onClick={handleShare}
              className="group secondary-cta text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Share Hasil
            </motion.button>
          </div>

          {/* Secondary Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Back to Home */}
            <motion.a
              href="/"
              className="group bg-slate-800/50 border border-slate-700 hover:border-purple-500 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Home className="w-5 h-5" />
              Kembali ke Beranda
            </motion.a>

            {/* View All Features */}
            <motion.a
              href="/#features"
              className="group bg-slate-800/50 border border-slate-700 hover:border-teal-500 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles className="w-5 h-5" />
              Lihat Semua Fitur
            </motion.a>
          </div>

          {/* Upgrade CTA */}
          <motion.div
            className="glass-card p-6 text-center bg-gradient-to-r from-purple-500/10 to-teal-500/10 border-purple-500/30"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-purple-400" />
              <p className="font-bold text-white">Suka dengan simulasinya?</p>
            </div>
            <p className="text-sm text-slate-400 mb-4">
              Upgrade ke Premium untuk akses unlimited quest & analisis AI lebih mendalam
            </p>
            <motion.a
              href="/#pricing"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-teal-500 text-white font-bold py-2 px-6 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Lihat Paket Premium
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Share Modal */}
      {shareModalOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShareModalOpen(false)}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          <motion.div
            className="relative w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-700"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-white mb-4 text-center">
              Share Hasil Kamu! 🎉
            </h3>
            <p className="text-slate-400 text-center mb-6">
              Ajak temanmu untuk mencoba ArunaQuest
            </p>

            <div className="grid grid-cols-2 gap-3">
              <motion.button
                onClick={() => handleSharePlatform('twitter')}
                className="bg-blue-500/20 border border-blue-500/50 text-blue-300 py-3 rounded-lg font-semibold hover:bg-blue-500/30 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🐦 Twitter
              </motion.button>
              <motion.button
                onClick={() => handleSharePlatform('facebook')}
                className="bg-blue-600/20 border border-blue-600/50 text-blue-400 py-3 rounded-lg font-semibold hover:bg-blue-600/30 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📘 Facebook
              </motion.button>
              <motion.button
                onClick={() => handleSharePlatform('whatsapp')}
                className="bg-green-500/20 border border-green-500/50 text-green-300 py-3 rounded-lg font-semibold hover:bg-green-500/30 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                💬 WhatsApp
              </motion.button>
              <motion.button
                onClick={() => handleSharePlatform('linkedin')}
                className="bg-blue-700/20 border border-blue-700/50 text-blue-400 py-3 rounded-lg font-semibold hover:bg-blue-700/30 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                💼 LinkedIn
              </motion.button>
            </div>

            <motion.button
              onClick={copyLink}
              className="w-full mt-4 bg-slate-800 border border-slate-700 text-white py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              📋 Copy Link
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default QuestReport