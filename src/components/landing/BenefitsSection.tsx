import { Check } from 'lucide-react'
import { landingBenefits } from '@/data/mockLanding'
import { useSectionReveal } from '@/hooks/useAnimations'

export function BenefitsSection() {
  const ref = useSectionReveal<HTMLElement>()

  return (
    <section ref={ref} className="py-20 px-4 bg-muted/30" aria-labelledby="benefits-heading">
      <div className="mx-auto max-w-4xl">
        <h2 id="benefits-heading" className="text-3xl font-bold text-center mb-12">
          Why students choose MindFlow
        </h2>
        <ul className="space-y-4">
          {landingBenefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-3 glass rounded-lg p-4">
              <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
