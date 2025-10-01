'use client'

import { useState } from 'react'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import SocialProof from '@/components/sections/SocialProof'
import Features from '@/components/sections/Features'
import Pricing from '@/components/sections/Pricing'
import FinalCTA from '@/components/sections/FinalCTA'
import VideoModal from '@/components/ui/VideoModal'
import BlogModal from '@/components/ui/BlogModal'
import SplashScreen from '@/components/ui/SplashScreen'

export default function Home() {
  const [videoModalOpen, setVideoModalOpen] = useState(false)
  const [blogModalOpen, setBlogModalOpen] = useState(false)

  return (
    <>
      <SplashScreen />
      
      <Navigation 
        onBlogClick={() => setBlogModalOpen(true)}
      />
      
      <Hero 
        onVideoClick={() => setVideoModalOpen(true)}
      />
      
      <SocialProof />
      
      <main>
        <Features />
        <Pricing />
        <FinalCTA />
      </main>
      
      <Footer 
        onBlogClick={() => setBlogModalOpen(true)}
      />
      
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