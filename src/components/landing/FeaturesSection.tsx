import { Heart, Brain, BookOpen, Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { landingFeatures } from '@/data/mockLanding'
import { useSectionReveal } from '@/hooks/useAnimations'

const iconMap = {
  Heart,
  Brain,
  BookOpen,
  Sparkles,
} as const

export function FeaturesSection() {
  const ref = useSectionReveal<HTMLElement>()

  return (
    <section id="features" ref={ref} className="py-20 px-4" aria-labelledby="features-heading">
      <div className="mx-auto max-w-6xl">
        <h2 id="features-heading" className="text-3xl font-bold text-center mb-4">
          Everything you need for mental wellness
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          A complete toolkit designed specifically for the unique challenges of competitive exam
          preparation.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {landingFeatures.map((feature) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap]
            return (
              <Card key={feature.id} className="h-full">
                <CardHeader>
                  <div className="rounded-lg bg-primary/10 w-fit p-3 mb-2">
                    <Icon className="h-6 w-6 text-primary" aria-hidden />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
