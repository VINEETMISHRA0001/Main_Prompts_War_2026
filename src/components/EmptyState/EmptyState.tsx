import { cn } from '@/utils/cn'

export interface EmptyStateProps {
  title: string
  description: string
  icon?: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({ title, description, icon = '🌿', action, className }: EmptyStateProps) {
  return (
    <div
      className={cn('wellness-card p-8 text-center', className)}
      role="status"
    >
      <span className="text-4xl mb-3 block" aria-hidden>{icon}</span>
      <h3 className="font-display font-semibold text-lg">{title}</h3>
      <p className="text-secondary-muted text-sm mt-2 max-w-sm mx-auto">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
