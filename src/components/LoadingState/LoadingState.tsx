import { Skeleton } from '@/components/ui/skeleton'

export function LoadingState() {
  return (
    <div className="space-y-4 p-4" role="status" aria-label="Loading page">
      <Skeleton className="h-10 w-64 bg-surface" />
      <Skeleton className="h-4 w-96 bg-surface" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <Skeleton className="h-28 bg-surface" />
        <Skeleton className="h-28 bg-surface" />
        <Skeleton className="h-28 bg-surface" />
        <Skeleton className="h-28 bg-surface" />
      </div>
    </div>
  )
}
