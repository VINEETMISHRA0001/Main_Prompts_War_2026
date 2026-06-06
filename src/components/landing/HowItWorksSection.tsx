import { howItWorksSteps } from '@/data/mockLanding'
import { useSectionReveal } from '@/hooks/useAnimations'

export function HowItWorksSection() {
  const ref = useSectionReveal<HTMLElement>()

  return (
    <section ref={ref} className="py-20 px-4 bg-muted/30" aria-labelledby="how-heading">
      <div className="mx-auto max-w-4xl">
        <h2 id="how-heading" className="text-3xl font-bold text-center mb-12">
          How it works
        </h2>
        <ol className="grid md:grid-cols-3 gap-8">
          {howItWorksSteps.map((item) => (
            <li key={item.step} className="text-center">
              <div
                className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold"
                aria-hidden
              >
                {item.step}
              </div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
