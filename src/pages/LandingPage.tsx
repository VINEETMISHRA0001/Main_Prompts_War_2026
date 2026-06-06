import { LandingNavbar, LandingFooter } from '@/components/landing/LandingNav'
import { HeroSection } from '@/components/landing/HeroSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { BenefitsSection } from '@/components/landing/BenefitsSection'
import { StatsSection } from '@/components/landing/StatsSection'
import { HowItWorksSection } from '@/components/landing/HowItWorksSection'
import { TestimonialsSection } from '@/components/landing/TestimonialsSection'
import { FaqSection } from '@/components/landing/FaqSection'
import { CtaSection } from '@/components/landing/CtaSection'
import { SkipLink } from '@/components/layout/AppLayout'

export default function LandingPage() {
  return (
    <>
      <SkipLink />
      <LandingNavbar />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
        <StatsSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <FaqSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </>
  )
}
