import { useEffect, useState } from 'react'

export function PageTransition({ children }) {
  const [isTransitioning, setIsTransitioning] = useState(true)

  useEffect(() => {
    // Trigger transition on mount
    setIsTransitioning(true)
    const timer = setTimeout(() => setIsTransitioning(false), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Transition Overlay */}
      <div
        className={`fixed inset-0 z-[200] pointer-events-none transition-opacity duration-500 ${
          isTransitioning ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-teal-900/50 backdrop-blur-sm" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="loader" />
        </div>
      </div>

      {/* Page Content */}
      <div
        className={`transition-all duration-500 ${
          isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        {children}
      </div>
    </>
  )
}

// Wrap in layout or specific pages
export default function LayoutWithTransition({ children }) {
  return (
    <PageTransition>
      <main className="bg-[#0B0A11] text-slate-300 font-sans antialiased min-h-screen">
        {children}
      </main>
    </PageTransition>
  )
}