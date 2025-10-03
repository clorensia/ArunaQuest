'use client'

import { useState, useEffect } from 'react'
import UnderMaintenanceModal from '@/app/components/ui/UnderMaintenanceModal'

export default function ModalTestPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  useEffect(() => {
    console.log('🔄 Modal state changed:', modalOpen)
    console.log('📊 Total clicks:', clickCount)
  }, [modalOpen, clickCount])

  const handleOpenModal = () => {
    console.log('🔥 Button clicked! Opening modal...')
    setClickCount(prev => prev + 1)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    console.log('❌ Closing modal...')
    setModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#0B0A11] text-slate-300 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🧪 Modal Test Page
          </h1>
          <p className="text-slate-400">
            Test UnderMaintenanceModal component
          </p>
        </div>

        {/* Test Controls */}
        <div className="glass-card p-8 rounded-2xl mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Test Controls</h2>
          
          <div className="space-y-4">
            <button
              onClick={handleOpenModal}
              className="w-full cta-gradient text-white font-bold py-4 px-6 rounded-lg hover:shadow-lg transition-all"
            >
              🚀 Open Modal
            </button>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setModalOpen(true)}
                className="bg-green-500/20 border border-green-500/50 text-green-300 py-3 px-4 rounded-lg hover:bg-green-500/30 transition-all"
              >
                ✅ Set True
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="bg-red-500/20 border border-red-500/50 text-red-300 py-3 px-4 rounded-lg hover:bg-red-500/30 transition-all"
              >
                ❌ Set False
              </button>
            </div>
          </div>
        </div>

        {/* Debug Info */}
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-3">Debug Info</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
              <span className="text-slate-400">Modal Open:</span>
              <span className={`font-bold ${modalOpen ? 'text-green-400' : 'text-red-400'}`}>
                {modalOpen ? '✅ TRUE' : '❌ FALSE'}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
              <span className="text-slate-400">Click Count:</span>
              <span className="font-bold text-white">{clickCount}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
              <span className="text-slate-400">Component Rendered:</span>
              <span className="font-bold text-teal-400">✅ YES</span>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-blue-300 text-xs">
              💡 <strong>Tips:</strong> Open browser console (F12) to see detailed logs
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 text-center">
          <p className="text-slate-500 text-sm">
            Press <kbd className="px-2 py-1 bg-slate-700 rounded text-slate-300">ESC</kbd> or click backdrop to close modal
          </p>
        </div>
      </div>

      {/* The Modal */}
      <UnderMaintenanceModal 
        isOpen={modalOpen}
        onClose={handleCloseModal}
        feature="Test Feature"
      />

      {/* Global Styles */}
      <style jsx global>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .cta-gradient {
          background: linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%);
        }

        .cta-button:hover {
          transform: translateY(-2px);
        }

        kbd {
          font-family: monospace;
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  )
}