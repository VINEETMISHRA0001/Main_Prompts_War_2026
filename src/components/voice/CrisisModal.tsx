import { Phone } from 'lucide-react'
import { CRISIS_HELPLINES } from '@/constants/sagePrompts'
import { useNotificationStore } from '@/store/slices/notificationSlice'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export function CrisisModal() {
  const open = useNotificationStore((s) => s.crisisModalOpen)
  const closeCrisisModal = useNotificationStore((s) => s.closeCrisisModal)

  return (
    <Dialog open={open} onOpenChange={(next) => !next && closeCrisisModal()}>
      <DialogContent
        className="max-w-md border-destructive/50 bg-card"
        showCloseButton
        aria-describedby="crisis-desc"
        onEscapeKeyDown={() => closeCrisisModal()}
      >
        <DialogHeader>
          <DialogTitle id="crisis-title" className="text-destructive">
            You matter — support is available
          </DialogTitle>
        </DialogHeader>
        <p id="crisis-desc" className="text-sm text-muted-foreground">
          MindFlow detected serious distress in your check-in. This app is not an emergency
          service. If you are in immediate danger, call emergency services. Your guardian may
          have been notified with a summary only.
        </p>
        <ul className="space-y-3" aria-label="Crisis helplines">
          {CRISIS_HELPLINES.map((h) => (
            <li
              key={h.number}
              className="flex items-center gap-3 rounded-lg border border-border p-3 text-sm"
            >
              <Phone className="h-4 w-4 text-primary shrink-0" aria-hidden />
              <div>
                <p className="font-medium">{h.name}</p>
                <a href={`tel:${h.number.replace(/\s/g, '')}`} className="text-primary">
                  {h.number}
                </a>
              </div>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={closeCrisisModal}
          className="w-full rounded-lg border border-border py-2 text-sm hover:bg-surface"
        >
          I understand — return to MindFlow
        </button>
      </DialogContent>
    </Dialog>
  )
}
