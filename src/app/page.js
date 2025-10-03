'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/app/components/layout/Navigation'
import Footer from '@/app/components/layout/Footer'
import Hero from '@/app/components/sections/Hero'
import SocialProof from '@/app/components/sections/SocialProof'
import Features from '@/app/components/sections/Features'
import Pricing from '@/app/components/sections/Pricing'
import FinalCTA from '@/app/components/sections/FinalCTA'
import VideoModal from '@/app/components/ui/VideoModal'
import BlogModal from '@/app/components/ui/BlogModal'
import Problem from '@/app/components/sections/Problem'
import SplashScreen from '@/app/components/ui/SplashScreen'
import UnderMaintenanceModal from '@/app/components/ui/UnderMaintenanceModal'
import PageTransition from '@/app/components/ui/PageTransition'

export default function Home() {
  const [videoModalOpen, setVideoModalOpen] = useState(false)
  const [blogModalOpen, setBlogModalOpen] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const [maintenanceModalOpen, setMaintenanceModalOpen] = useState(false)
  const [maintenanceFeature, setMaintenanceFeature] = useState('Fitur ini')

  // Debug logs
  useEffect(() => {
    console.log('🎬 App State:')
    console.log('  - Video modal:', videoModalOpen)
    console.log('  - Blog modal:', blogModalOpen)
    console.log('  - Maintenance modal:', maintenanceModalOpen)
    console.log('  - Feature:', maintenanceFeature)
  }, [videoModalOpen, blogModalOpen, maintenanceModalOpen, maintenanceFeature])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const handleCommunityClick = () => {
    console.log('🌐 Community link clicked!')
    setMaintenanceFeature('Halaman Komunitas')
    setMaintenanceModalOpen(true)
  }

  const handleVideoClick = () => {
    console.log('📹 Video button clicked!')
    setVideoModalOpen(true)
  }

  const handleBlogClick = () => {
    console.log('📝 Blog button clicked!')
    setBlogModalOpen(true)
  }

  const handleCloseMaintenanceModal = () => {
    console.log('❌ Closing maintenance modal')
    setMaintenanceModalOpen(false)
  }

  return (
    <>
      <PageTransition>
        {showSplash ? (
          <SplashScreen />
        ) : (
          <>
            <Navigation 
              onBlogClick={handleBlogClick}
              onCommunityClick={handleCommunityClick}
            />
            
            <Hero 
              onVideoClick={handleVideoClick}
            />
            
            <SocialProof />
            
            <main>
              <Problem />
              <Features />
              <Pricing />
              <FinalCTA />
            </main>
            
            <Footer 
              onBlogClick={handleBlogClick}
              onCommunityClick={handleCommunityClick}
            />
          </>
        )}
      </PageTransition>

      {/* ALL MODALS - Outside PageTransition to ensure proper z-index */}
      <VideoModal 
        isOpen={videoModalOpen} 
        onClose={() => setVideoModalOpen(false)} 
      />
      
      <BlogModal 
        isOpen={blogModalOpen} 
        onClose={() => setBlogModalOpen(false)} 
      />
      
      <UnderMaintenanceModal 
        isOpen={maintenanceModalOpen} 
        onClose={handleCloseMaintenanceModal} 
        feature={maintenanceFeature} 
      />
    </>
  )
}