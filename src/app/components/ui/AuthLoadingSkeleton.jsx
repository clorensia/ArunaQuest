'use client'
export function AuthLoadingSkeleton() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="glass-card p-8 md:p-12 rounded-2xl w-full max-w-md">
        {/* Logo skeleton */}
        <div className="w-20 h-20 mx-auto mb-6 bg-slate-700 rounded-2xl animate-pulse" />
        
        {/* Title skeleton */}
        <div className="h-8 bg-slate-700 rounded w-3/4 mx-auto mb-2 animate-pulse" />
        <div className="h-4 bg-slate-700 rounded w-1/2 mx-auto mb-8 animate-pulse" />
        
        {/* Benefits box skeleton */}
        <div className="mb-8 bg-slate-800/30 p-4 rounded-lg border border-slate-700">
          <div className="h-4 bg-slate-700 rounded w-1/2 mb-3 animate-pulse" />
          <div className="space-y-2">
            <div className="h-3 bg-slate-700 rounded animate-pulse" />
            <div className="h-3 bg-slate-700 rounded animate-pulse" />
            <div className="h-3 bg-slate-700 rounded animate-pulse" />
          </div>
        </div>
        
        {/* Button skeleton */}
        <div className="h-14 bg-slate-700 rounded-xl animate-pulse" />
      </div>
    </div>
  )
}

export function QuestAccessDenied({ onRedirectToLogin }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="glass-card p-8 max-w-md text-center">
        <div className="text-6xl mb-6 animate-bounce">🔒</div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Login Diperlukan
        </h2>
        <p className="text-slate-400 mb-6 leading-relaxed">
          Kamu perlu login untuk mengakses Quest Dashboard dan menyimpan progress petualanganmu.
        </p>
        
        <div className="bg-slate-800/50 p-4 rounded-lg mb-6 text-left">
          <p className="text-sm font-semibold text-white mb-2">Keuntungan login:</p>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Progress tersimpan otomatis
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Analisis AI personal
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Kumpulkan badge prestasi
            </li>
          </ul>
        </div>

        <button
          onClick={onRedirectToLogin}
          className="w-full cta-gradient text-white font-bold py-3 rounded-lg cta-button mb-4"
        >
          Login Sekarang
        </button>
        
        <a
          href="/"
          className="text-sm text-slate-400 hover:text-white transition-colors"
        >
          &larr; Kembali ke Beranda
        </a>
      </div>
    </div>
  )
}