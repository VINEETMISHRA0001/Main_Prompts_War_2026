import { cn } from '@/utils/cn'

export interface WellnessCardProps {
  title: string
  description?: string
  children?: React.ReactNode
  className?: string
  glow?: boolean
}

export function WellnessCard({ title, description, children, className, glow }: WellnessCardProps) {
  return (
    <section
      className={cn('wellness-card p-5 md:p-6', glow && 'wellness-card-glow', className)}
      aria-labelledby={title.replace(/\s+/g, '-').toLowerCase()}
    >
      <h3 id={title.replace(/\s+/g, '-').toLowerCase()} className="font-display text-lg font-semibold">
        {title}
      </h3>
      {description && <p className="text-secondary-muted text-sm mt-1">{description}</p>}
      {children && <div className="mt-4">{children}</div>}
    </section>
  )
}
