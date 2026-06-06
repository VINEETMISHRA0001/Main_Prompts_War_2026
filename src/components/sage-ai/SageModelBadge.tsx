import { Shield } from 'lucide-react'

export function SageModelBadge() {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-primary font-medium">
        <Shield className="h-3 w-3" aria-hidden />
        Sage Wellness Model
      </span>
      <span>STT · NLP · Prosody · Safety filter ON</span>
    </div>
  )
}
