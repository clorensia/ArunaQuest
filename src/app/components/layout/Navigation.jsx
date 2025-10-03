import { useState } from 'react'
import Link from 'next/link'
import UnderMaintenanceModal from '@/app/components/ui/UnderMaintenanceModal'

export default function Navigation({ onBlogClick }) {
  const [showMaintenance, setShowMaintenance] = useState(false)

  return (
    <>
      <nav className="bg-black/30 backdrop-blur-lg sticky top-0 z-50 border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white hover:text-purple-400 transition-colors">
            ArunaQuest
          </Link>
          
          <div className="hidden md:flex items-center space-x-8 text-slate-300">
            <a href="/#problem" className="hover:text-white transition-colors">
              Problem
            </a>
            <a href="/#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="/#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
            <button 
              onClick={onBlogClick}
              className="hover:text-white transition-colors"
            >
              Blog
            </button>
          </div>
          
          <div>
            <button
              onClick={() => setShowMaintenance(true)}
              className="cta-gradient text-white font-semibold px-5 py-2 rounded-lg cta-button inline-block"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      <UnderMaintenanceModal 
        isOpen={showMaintenance}
        onClose={() => setShowMaintenance(false)}
        feature="Sistem Authentication"
      />
    </>
  )
}