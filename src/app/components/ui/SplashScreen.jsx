'use client'

import { useState, useEffect } from 'react'

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#0B0A11] z-[100] flex justify-center items-center flex-col transition-opacity duration-500">
      <h1 className="text-4xl font-bold text-white">ArunaQuest</h1>
      <div className="loader" />
    </div>
  )
}