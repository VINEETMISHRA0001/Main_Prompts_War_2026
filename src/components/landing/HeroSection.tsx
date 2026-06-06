import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { useHeroParticles } from '@/hooks/useAnimations'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  useHeroParticles(containerRef)

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background"
      aria-labelledby="hero-heading"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(0,255,148,0.12),transparent)]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <div className="wellness-card wellness-card-glow p-8 md:p-12">
          <div className="flex justify-center mb-6">
            <Leaf className="h-12 w-12 text-primary" aria-hidden />
          </div>
          <h1
            id="hero-heading"
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
          >
            Mental wellness for{' '}
            <span className="gradient-text">high-pressure exams</span>
          </h1>
          <p className="text-base md:text-lg text-secondary-muted max-w-2xl mx-auto mb-8">
            Built for NEET, JEE, CUET, CAT, GATE, UPSC, and Board Exam students. Track mood,
            identify stress triggers, reflect on emotions, and prevent burnout during result seasons.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to={ROUTES.DESKTOP}>
                Start Daily Check-in
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#features">See How It Helps</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
