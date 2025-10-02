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
        if (entry.isIntersecting) {
          setIsVisible(true)
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

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, triggerOnce]) 
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