import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BackgroundGradient } from '@/components/ui/spotlight'
import { ROUTES } from '@/constants/routes'
import { useHeroParticles } from '@/hooks/useAnimations'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  useHeroParticles(containerRef)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-teal-100/80 via-emerald-50/60 to-blue-50/80 dark:from-teal-950/40 dark:via-slate-900 dark:to-emerald-950/30 animate-gradient"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <BackgroundGradient className="glass-strong p-8 md:p-12">
          <div className="flex justify-center mb-6">
            <Leaf className="h-12 w-12 text-primary" aria-hidden />
          </div>
          <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Your calm companion for{' '}
            <span className="gradient-text">exam preparation</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Track your mood, manage stress, and build healthier study habits — designed for NEET,
            JEE, UPSC, and competitive exam students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to={ROUTES.DASHBOARD}>
                Start Your Journey
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </BackgroundGradient>
      </div>
    </section>
  )
}
