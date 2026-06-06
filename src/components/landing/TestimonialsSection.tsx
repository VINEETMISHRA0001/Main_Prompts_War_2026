import { Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { mockTestimonials } from '@/data/mockLanding'
import { useSectionReveal } from '@/hooks/useAnimations'

export function TestimonialsSection() {
  const ref = useSectionReveal<HTMLElement>()

  return (
    <section ref={ref} className="py-20 px-4" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-6xl">
        <h2 id="testimonials-heading" className="text-3xl font-bold text-center mb-12">
          Loved by students nationwide
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {mockTestimonials.map((t) => (
            <Card key={t.id}>
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
                  ))}
                </div>
                <blockquote className="text-sm mb-4">&ldquo;{t.quote}&rdquo;</blockquote>
                <footer>
                  <cite className="not-italic font-medium">{t.name}</cite>
                  <p className="text-xs text-muted-foreground">{t.exam}</p>
                </footer>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
