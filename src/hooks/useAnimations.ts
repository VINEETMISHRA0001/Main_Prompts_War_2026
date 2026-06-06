import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function useAnimations() {
  const reducedMotion = useReducedMotion()

  const animateCounter = useCallback(
    (element: HTMLElement | null, target: number, duration = 2) => {
      if (!element || reducedMotion) {
        if (element) element.textContent = String(target)
        return
      }
      const obj = { value: 0 }
      gsap.to(obj, {
        value: target,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          element.textContent = String(Math.round(obj.value))
        },
      })
    },
    [reducedMotion],
  )

  const revealSection = useCallback(
    (element: HTMLElement | null) => {
      if (!element) return
      if (reducedMotion) {
        gsap.set(element, { opacity: 1, y: 0 })
        return
      }
      gsap.fromTo(
        element,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      )
    },
    [reducedMotion],
  )

  return { animateCounter, revealSection, reducedMotion }
}

export function useHeroParticles(containerRef: React.RefObject<HTMLElement | null>) {
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const container = containerRef.current
    if (!container || reducedMotion) return

    const emojis = ['😀', '🙂', '😐', '😟', '💚', '✨', '🌿']
    const particles: HTMLSpanElement[] = []

    for (let i = 0; i < 12; i++) {
      const span = document.createElement('span')
      span.textContent = emojis[i % emojis.length] ?? '✨'
      span.className = 'absolute text-lg opacity-30 pointer-events-none select-none'
      span.style.left = `${Math.random() * 100}%`
      span.style.top = `${Math.random() * 100}%`
      container.appendChild(span)
      particles.push(span)
    }

    particles.forEach((p, i) => {
      gsap.to(p, {
        y: `random(-30, 30)`,
        x: `random(-20, 20)`,
        rotation: `random(-15, 15)`,
        duration: `random(3, 6)`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.2,
      })
    })

    return () => {
      particles.forEach((p) => p.remove())
    }
  }, [containerRef, reducedMotion])
}

export function useSectionReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const { revealSection } = useAnimations()

  useEffect(() => {
    revealSection(ref.current)
    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === ref.current) t.kill()
      })
    }
  }, [revealSection])

  return ref
}
