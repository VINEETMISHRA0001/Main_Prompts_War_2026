import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/utils/cn'

export interface StatCardProps {
  title: string
  value: number | string
  suffix?: string
  icon: LucideIcon
  variant?: 'default' | 'warning' | 'danger' | 'accent'
  invert?: boolean
  hint?: string
}

const variantStyles = {
  default: 'bg-primary/10 text-primary',
  warning: 'bg-warning/10 text-warning',
  danger: 'bg-destructive/10 text-destructive',
  accent: 'bg-accent/10 text-accent',
} as const

export function StatCard({
  title,
  value,
  suffix = '',
  icon: Icon,
  variant = 'default',
  invert,
  hint,
}: StatCardProps) {
  const numericValue = typeof value === 'number' ? value : parseInt(String(value), 10) || 0
  const displayValue = invert ? 100 - numericValue : numericValue

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="wellness-card wellness-card-glow p-5 h-full"
      aria-label={`${title}: ${value}${suffix}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-secondary-muted text-sm font-medium">{title}</span>
        <div className={cn('rounded-lg p-2', variantStyles[variant])}>
          <Icon className="h-4 w-4" aria-hidden />
        </div>
      </div>
      <div className="font-display text-3xl font-bold text-foreground">
        {value}
        {suffix}
      </div>
      {hint && <p className="text-xs text-secondary-muted mt-1">{hint}</p>}
      {typeof value === 'number' && (
        <Progress value={displayValue} className="mt-3 h-1.5" aria-hidden />
      )}
    </motion.article>
  )
}
