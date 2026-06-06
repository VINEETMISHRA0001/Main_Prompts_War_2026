import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDashboardStore } from '@/store/slices/dashboardSlice'

export function AchievementToast() {
  const toast = useDashboardStore((s) => s.toastAchievement)
  const clearToast = useDashboardStore((s) => s.clearToast)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(clearToast, 4000)
    return () => clearTimeout(timer)
  }, [toast, clearToast])

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 wellness-card wellness-card-glow px-6 py-4 flex items-center gap-3 max-w-sm mx-4"
          role="status"
          aria-live="polite"
        >
          <span className="text-3xl" aria-hidden>{toast.icon}</span>
          <div>
            <p className="font-display font-bold text-sm">Achievement Unlocked</p>
            <p className="text-sm text-secondary-muted">{toast.title}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
