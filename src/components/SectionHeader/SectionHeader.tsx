import { cn } from '@/utils/cn'

export interface SectionHeaderProps {
  title: string
  description?: string
  className?: string
  id?: string
}

export function SectionHeader({ title, description, className, id }: SectionHeaderProps) {
  return (
    <div className={cn('mb-4', className)}>
      <h2 id={id} className="font-display text-lg md:text-xl font-semibold">{title}</h2>
      {description && <p className="text-secondary-muted text-sm mt-1">{description}</p>}
    </div>
  )
}
