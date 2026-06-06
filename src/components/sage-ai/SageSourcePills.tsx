import type { SageSource } from '@/types'

interface SageSourcePillsProps {
  sources: SageSource[]
}

export function SageSourcePills({ sources }: SageSourcePillsProps) {
  if (sources.length === 0) return null

  return (
    <div className="mt-4 pt-3 border-t border-border">
      <p className="text-xs font-medium text-muted-foreground mb-2">Sources</p>
      <div className="flex flex-wrap gap-2">
        {sources.map((s) => (
          <span
            key={s.id}
            title={s.detail}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-1 text-xs hover:border-primary/40 transition-colors cursor-default"
          >
            <span className="text-primary font-mono">[{s.id}]</span>
            {s.label}
          </span>
        ))}
      </div>
    </div>
  )
}
