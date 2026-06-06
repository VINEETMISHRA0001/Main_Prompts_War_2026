import { Bell, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNotificationStore } from '@/store/slices/notificationSlice'
import { useDesktopStore } from '@/store/slices/desktopSlice'

export function InAppNotificationStack() {
  const notifications = useNotificationStore((s) => s.notifications)
  const markRead = useNotificationStore((s) => s.markRead)
  const openVoiceModal = useNotificationStore((s) => s.openVoiceModal)
  const openApp = useDesktopStore((s) => s.openApp)

  const unread = notifications.filter((n) => !n.read).slice(0, 3)

  const handleAction = (id: string, action?: string) => {
    markRead(id)
    if (action === 'voice-check-in') openVoiceModal('scheduled')
    if (action === 'open-sage-ai') openApp('sage-ai')
  }

  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[190] w-full max-w-md px-4 pointer-events-none"
      role="status"
      aria-live="polite"
      aria-label="Wellness notifications"
    >
      <AnimatePresence>
        {unread.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="pointer-events-auto mb-2 wellness-card p-4 shadow-lg border-primary/20"
          >
            <div className="flex gap-3">
              <Bell className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{n.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{n.body}</p>
                {n.action && (
                  <button
                    type="button"
                    onClick={() => handleAction(n.id, n.action)}
                    className="mt-2 text-xs font-medium text-primary hover:underline"
                  >
                    {n.action === 'voice-check-in' ? 'Start voice check-in →' : 'Open Sage AI →'}
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => markRead(n.id)}
                className="shrink-0 p-1 hover:bg-white/5 rounded"
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
