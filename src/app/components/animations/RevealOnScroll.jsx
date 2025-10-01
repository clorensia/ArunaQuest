'use client'

import { useEffect, useRef, useState } from 'react'

export default function RevealOnScroll({ 
  children, 
  delay = 0, 
  threshold = 0.1, 
  triggerOnce = true 
}) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Jika elemen terlihat di layar
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Jika animasi hanya perlu dijalankan sekali, hentikan pengamatan
          if (triggerOnce) {
            observer.unobserve(element)
          }
        }
      },
      { 
        threshold,
      }
    )

    observer.observe(element)

    // Cleanup function untuk berhenti mengamati saat komponen di-unmount
    return () => {
      observer.unobserve(element)
    }
  }, [threshold, triggerOnce]) // Jalankan ulang efek jika prop ini berubah

  return (
    <div
      ref={elementRef}
      className={`reveal ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}