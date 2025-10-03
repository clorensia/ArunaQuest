'use client'
import { useEffect, useState, Suspense } from 'react' // Tambahkan Suspense
import { useAuth } from '@/context/AuthContext'
import { useRouter, useSearchParams } from 'next/navigation'
import { LogIn, Loader2 } from 'lucide-react'
import Link from 'next/link'
import PageTransition from '@/app/components/animations/PageTransition'

// Komponen baru untuk menangani logika redirect
function LoginRedirect() {
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/quest'

  useEffect(() => {
    if (user) {
      console.log('✅ User already logged in, redirecting to:', redirectTo)
      router.push(redirectTo)
    }
  }, [user, router, redirectTo])

  // Komponen ini tidak me-render apa pun, hanya menjalankan logika
  return null
}

export default function LoginPage() {
  const { user, signInWithGoogle } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signInWithGoogle()
      // Redirect ditangani oleh AuthContext dan LoginRedirect
    } catch (error) {
      console.error('Login failed:', error)
      setIsLoading(false)
    }
  }
  
  // Tampilkan loading jika user sudah login (menunggu redirect)
  if (user) {
    return (
      <PageTransition>
        <main className="flex items-center justify-center min-h-screen">
          <div className="glass-card p-8 md:p-12 rounded-2xl w-full max-w-md text-center">
            <div className="loader mb-4"></div>
            <p className="text-slate-400">Mengarahkan...</p>
          </div>
        </main>
      </PageTransition>
    )
  }

  return (
    // Bungkus komponen yang menggunakan useSearchParams dengan Suspense
    <Suspense fallback={
      <PageTransition>
        <main className="flex items-center justify-center min-h-screen">
            <div className="loader"></div>
        </main>
      </PageTransition>
    }>
      <LoginRedirect />
      <PageTransition>
        <main className="flex items-center justify-center min-h-screen px-4">
          <div className="glass-card p-8 md:p-12 rounded-2xl w-full max-w-md text-center">
            {/* Logo/Icon */}
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-teal-500 rounded-2xl flex items-center justify-center text-4xl">
                🎯
              </div>
            </div>

            <h1 className="text-3xl font-bold text-white mb-2">
              Selamat Datang!
            </h1>
            <p className="text-slate-400 mb-8">
              Masuk untuk melanjutkan petualangan kariermu.
            </p>
            
            {/* Login Benefits */}
            <div className="mb-8 text-left space-y-3 bg-slate-800/30 p-4 rounded-lg border border-slate-700">
              <p className="text-sm font-semibold text-white mb-2">Dengan masuk, kamu bisa:</p>
              <div className="flex items-start gap-2 text-sm text-slate-300">
                <span className="text-green-400">✓</span>
                <span>Menyimpan progress quest</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-slate-300">
                <span className="text-green-400">✓</span>
                <span>Mendapat analisis personal dari AI</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-slate-300">
                <span className="text-green-400">✓</span>
                <span>Mengumpulkan badge prestasi</span>
              </div>
            </div>

            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full bg-white text-gray-800 font-bold text-lg px-8 py-4 rounded-xl shadow-lg inline-flex items-center justify-center gap-3 transition-all hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Masuk dengan Google
                </>
              )}
            </button>

            {/* Privacy Note */}
            <p className="mt-6 text-xs text-slate-500">
              Dengan masuk, kamu menyetujui{' '}
              <button className="text-purple-400 hover:underline">
                Syarat & Ketentuan
              </button>{' '}
              dan{' '}
              <button className="text-purple-400 hover:underline">
                Kebijakan Privasi
              </button>{' '}
              kami
            </p>

            {/* Back to Home */}
            <div className="mt-8 pt-6 border-t border-slate-700">
              <Link 
                href="/" 
                className="text-sm text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2"
              >
                <span>&larr;</span>
                Kembali ke Halaman Utama
              </Link>
            </div>
          </div>
        </main>
      </PageTransition>
    </Suspense>
  )
}