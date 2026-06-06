import { cn } from '@/utils/cn'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-lg bg-muted', className)}
      aria-hidden="true"
      {...props}
    />
  )
}

export { Skeleton }
