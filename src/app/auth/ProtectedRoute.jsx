'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      console.log('🚫 Unauthorized access - redirecting to login')
      router.push('/login?redirect=/quest')
    }
  }, [user, loading, router])

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="loader"></div>
        <p className="text-xl font-medium mt-6 text-slate-400">
          Memuat...
        </p>
      </div>
    )
  }

  // Not authenticated
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="glass-card p-8 max-w-md text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-xl font-bold text-white mb-2">
            Akses Terbatas
          </h2>
          <p className="text-slate-400 mb-6">
            Silakan login untuk mengakses halaman ini.
          </p>
          <div className="loader"></div>
        </div>
      </div>
    )
  }

  // Authenticated - render children
  return <>{children}</>
}