import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { mockFaqs } from '@/data/mockLanding'
import { useSectionReveal } from '@/hooks/useAnimations'

export function FaqSection() {
  const ref = useSectionReveal<HTMLElement>()

  return (
    <section ref={ref} className="py-20 px-4 bg-muted/30" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-2xl">
        <h2 id="faq-heading" className="text-3xl font-bold text-center mb-12">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible>
          {mockFaqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
