import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { useSectionReveal } from '@/hooks/useAnimations'

export function CtaSection() {
  const ref = useSectionReveal<HTMLElement>()

  return (
    <section ref={ref} className="py-20 px-4" aria-labelledby="cta-heading">
      <div className="mx-auto max-w-3xl text-center glass-strong rounded-2xl p-12">
        <h2 id="cta-heading" className="text-3xl font-bold mb-4">
          Ready to prioritize your mental wellness?
        </h2>
        <p className="text-muted-foreground mb-8">
          Join thousands of students who are building healthier study habits alongside their exam
          preparation.
        </p>
        <Button asChild size="lg">
          <Link to={ROUTES.DASHBOARD}>
            Get Started Free
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Button>
      </div>
    </section>
  )
}
