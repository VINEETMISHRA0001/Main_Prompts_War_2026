import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { StressTriggerCategory } from '@/types'
import { mockStressData } from '@/data/mockStress'

interface StressState {
  triggers: typeof mockStressData
  logTrigger: (category: StressTriggerCategory) => void
}

export const useStressStore = create<StressState>()(
  persist(
    (set, get) => ({
      triggers: mockStressData,
      logTrigger: (category) => {
        const triggers = get().triggers.map((t) =>
          t.category === category
            ? { ...t, count: t.count + 1, lastLogged: new Date().toISOString().split('T')[0] ?? '' }
            : t,
        )
        set({ triggers })
      },
    }),
    { name: 'mindflow-stress' },
  ),
)
