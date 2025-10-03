'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut,
  onAuthStateChanged 
} from 'firebase/auth'
import { auth } from '@/lib/firebaseConfig'
import { useRouter } from 'next/navigation'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({
        prompt: 'select_account'
      })
      
      const result = await signInWithPopup(auth, provider)
      
      // Success feedback
      console.log('✅ Login successful:', result.user.displayName)
      
      // Redirect to quest dashboard after successful login
      router.push('/quest')
      
      return result.user
    } catch (error) {
      console.error('❌ Login error:', error)
      
      // User-friendly error messages
      let errorMessage = 'Terjadi kesalahan saat login'
      
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = 'Login dibatalkan'
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Tidak ada koneksi internet'
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = 'Pop-up diblokir oleh browser. Silakan izinkan pop-up dan coba lagi.'
      }
      
      alert(errorMessage)
      throw error
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
      console.log('✅ Logout successful')
      
      // Clear any stored data
      if (typeof window !== 'undefined') {
        localStorage.removeItem('quest-report-data')
      }
      
      // Redirect to home after logout
      router.push('/')
    } catch (error) {
      console.error('❌ Logout error:', error)
      alert('Terjadi kesalahan saat logout')
    }
  }

  const value = {
    user,
    loading,
    signInWithGoogle,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}