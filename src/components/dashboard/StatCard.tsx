import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/utils/cn'

interface StatCardProps {
  title: string
  value: number
  suffix?: string
  icon: LucideIcon
  color: string
  invert?: boolean
}

export function StatCard({ title, value, suffix = '', icon: Icon, color, invert }: StatCardProps) {
  const displayValue = invert ? 100 - value : value

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <div className={cn('rounded-lg p-2', color)}>
            <Icon className="h-4 w-4" aria-hidden />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold" aria-label={`${title}: ${value}${suffix}`}>
            {value}
            {suffix}
          </div>
          <Progress value={displayValue} className="mt-3" aria-hidden />
        </CardContent>
      </Card>
    </motion.div>
  )
}
