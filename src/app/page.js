// File: src/app/page.js
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
import PageTransition from '@/app/components/ui/PageTransition'

export default function Home() {
  const [videoModalOpen, setVideoModalOpen] = useState(false)
  const [blogModalOpen, setBlogModalOpen] = useState(false)
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <PageTransition>
        {showSplash ? (
          <SplashScreen />
        ) : (
          <>
            <Navigation 
              onBlogClick={() => setBlogModalOpen(true)}
            />
            
            <Hero 
              onVideoClick={() => setVideoModalOpen(true)}
            />
            
            <SocialProof />
            
            <main>
              <Problem />
              <Features />
              <Pricing />
              <FinalCTA />
            </main>
            
            <Footer 
              onBlogClick={() => setBlogModalOpen(true)}
            />
          </>
        )}
      </PageTransition>

      {/* MODALS - Outside PageTransition */}
      <VideoModal 
        isOpen={videoModalOpen} 
        onClose={() => setVideoModalOpen(false)} 
      />
      <BlogModal 
        isOpen={blogModalOpen} 
        onClose={() => setBlogModalOpen(false)} 
      />
    </>
  )
}