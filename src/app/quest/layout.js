'use client'
import ProtectedRoute from '@/app/components/auth/ProtectedRoute'

export default function QuestLayout({ children }) {
  return (
    <ProtectedRoute>
      <main className="bg-[#0B0A11] text-slate-300 font-sans antialiased">
        <div className="container mx-auto px-4 py-8 min-h-screen">
          {children}
        </div>
      </main>
    </ProtectedRoute>
  )
}