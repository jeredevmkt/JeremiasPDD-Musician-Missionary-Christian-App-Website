'use client'

import { useEffect, useRef } from 'react'

interface GlowTextProps {
  text: string;
}

export default function GlowText({ text }: GlowTextProps) {
  const layer1 = useRef<HTMLDivElement>(null)
  const layer2 = useRef<HTMLDivElement>(null)
  const layer3 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame: number
    const animate = (t: number) => {
      const s1 = Math.sin(t / 900)
      const s2 = Math.sin(t / 900 + 0.6)
      const s3 = Math.sin(t / 900 + 1.2)

      if (layer1.current) {
        layer1.current.style.opacity = String(Math.max(0, s1 * 0.8))
        layer1.current.style.transform = `scale(${1 + Math.max(0, s1) * 0.12})`
      }
      if (layer2.current) {
        layer2.current.style.opacity = String(Math.max(0, s2 * 0.7))
        layer2.current.style.transform = `scale(${1 + Math.max(0, s2) * 0.18})`
      }
      if (layer3.current) {
        layer3.current.style.opacity = String(Math.max(0, s3 * 0.6))
        layer3.current.style.transform = `scale(${1 + Math.max(0, s3) * 0.25})`
      }

      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="relative">
      <div ref={layer1} className="absolute inset-0 text-center" style={{ filter: 'blur(4px)', color: 'white', opacity: 0 }}>
        <h2 className="text-4xl md:text-6xl font-bold leading-tight">{text}</h2>
      </div>
      <div ref={layer2} className="absolute inset-0 text-center" style={{ filter: 'blur(10px)', color: 'white', opacity: 0 }}>
        <h2 className="text-4xl md:text-6xl font-bold leading-tight">{text}</h2>
      </div>
      <div ref={layer3} className="absolute inset-0 text-center" style={{ filter: 'blur(20px)', color: 'white', opacity: 0 }}>
        <h2 className="text-4xl md:text-6xl font-bold leading-tight">{text}</h2>
      </div>
      <div className="relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">{text}</h2>
      </div>
    </div>
  )
}