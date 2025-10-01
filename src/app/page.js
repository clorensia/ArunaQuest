'use client'

import { useState } from 'react'
import Navigation from '@/app/components/layout/Navigation'
import Footer from '@/app/components/layout/Footer'
import Hero from '@/app/components/sections/Hero'
import SocialProof from '@/app/components/sections/SocialProof'
import Features from '@/app/components/sections/Features'
import Pricing from '@/app/components/sections/Pricing'
import FinalCTA from '@/app/components/sections/FinalCTA'
import VideoModal from '@/app/components/ui/VideoModal'
import BlogModal from '@/app/components/ui/BlogModal'
import SplashScreen from '@/app/components/ui/SplashScreen'
import Problem from '@/app/components/sections/Problem'

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
        <Problem/>
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