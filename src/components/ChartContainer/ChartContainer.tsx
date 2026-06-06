import { cn } from '@/utils/cn'

export interface ChartContainerProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  height?: number
}

export function ChartContainer({
  title,
  description,
  children,
  className,
  height = 280,
}: ChartContainerProps) {
  return (
    <section className={cn('wellness-card p-5 md:p-6', className)} aria-labelledby={`chart-${title}`}>
      <h3 id={`chart-${title}`} className="font-display text-lg font-semibold">
        {title}
      </h3>
      {description && <p className="text-secondary-muted text-sm mt-1">{description}</p>}
      <div
        className="w-full mt-4"
        style={{ height }}
        role="img"
        aria-label={`${title} chart`}
      >
        {children}
      </div>
    </section>
  )
}
