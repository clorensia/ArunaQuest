'use client'

import { useState } from 'react'
import UnderMaintenanceModal from '@/app/components/ui/UnderMaintenanceModal'

export default function Home() {
  const [testModal, setTestModal] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button 
        onClick={() => {
          console.log('🔥 Button clicked!')
          setTestModal(true)
        }}
        className="cta-gradient text-white font-bold py-3 px-6 rounded-lg"
      >
        TEST MODAL
      </button>

      <UnderMaintenanceModal 
        isOpen={testModal}
        onClose={() => setTestModal(false)}
        feature="Test Feature"
      />
    </div>
  )
}