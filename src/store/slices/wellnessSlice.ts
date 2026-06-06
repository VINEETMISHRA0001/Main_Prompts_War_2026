import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { StressTrigger, StressTriggerCategory } from '@/types'
import { mockStressData } from '@/data/mockStress'

interface WellnessSlice {
  triggers: StressTrigger[]
  logTrigger: (category: StressTriggerCategory) => void
}

export const useWellnessStore = create<WellnessSlice>()(
  persist(
    (set, get) => ({
      triggers: mockStressData,
      logTrigger: (category) => {
        const triggers = get().triggers.map((t) =>
          t.category === category
            ? {
                ...t,
                count: t.count + 1,
                lastLogged: new Date().toISOString().split('T')[0] ?? '',
              }
            : t,
        )
        set({ triggers })
      },
    }),
    { name: 'mindflow-stress' },
  ),
)

/** @deprecated Use useWellnessStore */
export const useStressStore = useWellnessStore

export function getTopStressTrigger(triggers: StressTrigger[]) {
  return [...triggers].sort((a, b) => b.count - a.count)[0]
}
