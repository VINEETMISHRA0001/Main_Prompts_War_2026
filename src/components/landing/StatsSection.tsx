import { useEffect, useRef } from 'react'
import { wellnessStats } from '@/data/mockLanding'
import { useAnimations, useSectionReveal } from '@/hooks/useAnimations'

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const { animateCounter } = useAnimations()

  useEffect(() => {
    animateCounter(ref.current, value)
  }, [value, animateCounter])

  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
        <span ref={ref}>0</span>
        {suffix}
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}

export function StatsSection() {
  const ref = useSectionReveal<HTMLElement>()

  return (
    <section ref={ref} className="py-20 px-4" aria-labelledby="stats-heading">
      <div className="mx-auto max-w-5xl">
        <h2 id="stats-heading" className="text-3xl font-bold text-center mb-4">
          Mental wellness matters
        </h2>
        <p className="text-muted-foreground text-center mb-12">
          Students who track their wellness see measurable improvements in focus and resilience.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {wellnessStats.map((stat) => (
            <StatCounter key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
