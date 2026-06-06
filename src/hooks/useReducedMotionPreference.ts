import { useEffect, useState } from 'react'
import { useDashboardStore } from '@/store/slices/dashboardSlice'

/**
 * Respects both OS prefers-reduced-motion and in-app reducedMotion preference.
 */
export function useReducedMotionPreference(): boolean {
  const prefReduced = useDashboardStore((s) => s.preferences.reducedMotion)
  const [mediaReduced, setMediaReduced] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setMediaReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return prefReduced || mediaReduced
}
