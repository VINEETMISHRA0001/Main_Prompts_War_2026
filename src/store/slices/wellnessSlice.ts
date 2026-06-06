import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { BalanceLog, StressTrigger, StressTriggerCategory } from '@/types'
import { mockStressData } from '@/data/mockStress'
import { STRESS_TRIGGERS } from '@/constants/stressTriggers'
import { getTodayKey } from '@/utils/gamification'

interface WellnessSlice {
  triggers: StressTrigger[]
  balanceLogs: BalanceLog[]
  logTrigger: (category: StressTriggerCategory) => void
  logBalance: (studyHours: number, breakHours: number, sleepHours: number) => void
  getTodayBalance: () => BalanceLog | null
  getWeeklyBalanceComparison: () => {
    thisWeekStudy: number
    lastWeekStudy: number
    thisWeekSleep: number
    lastWeekSleep: number
  }
}

function ensureAllTriggers(triggers: StressTrigger[]): StressTrigger[] {
  const existing = new Set(triggers.map((t) => t.category))
  const missing = STRESS_TRIGGERS.filter((t) => !existing.has(t.category)).map((t) => ({
    id: crypto.randomUUID(),
    category: t.category,
    count: 0,
    lastLogged: '',
  }))
  return missing.length ? [...triggers, ...missing] : triggers
}

function avgStudyForRange(logs: BalanceLog[], startDaysAgo: number, endDaysAgo: number): number {
  const slice = logs.filter((l) => {
    const diff = Math.floor(
      (Date.now() - new Date(l.date).getTime()) / (1000 * 60 * 60 * 24),
    )
    return diff >= startDaysAgo && diff < endDaysAgo
  })
  if (slice.length === 0) return 0
  return Math.round((slice.reduce((s, l) => s + l.studyHours, 0) / slice.length) * 10) / 10
}

function avgSleepForRange(logs: BalanceLog[], startDaysAgo: number, endDaysAgo: number): number {
  const slice = logs.filter((l) => {
    const diff = Math.floor(
      (Date.now() - new Date(l.date).getTime()) / (1000 * 60 * 60 * 24),
    )
    return diff >= startDaysAgo && diff < endDaysAgo
  })
  if (slice.length === 0) return 0
  return Math.round((slice.reduce((s, l) => s + l.sleepHours, 0) / slice.length) * 10) / 10
}

export const useWellnessStore = create<WellnessSlice>()(
  persist(
    (set, get) => ({
      triggers: ensureAllTriggers(mockStressData),
      balanceLogs: [],
      logTrigger: (category) => {
        const today = getTodayKey()
        const triggers = ensureAllTriggers(get().triggers).map((t) =>
          t.category === category
            ? { ...t, count: t.count + 1, lastLogged: today }
            : t,
        )
        set({ triggers })
      },
      logBalance: (studyHours, breakHours, sleepHours) => {
        const date = getTodayKey()
        const { balanceLogs } = get()
        const existing = balanceLogs.find((l) => l.date === date)
        if (existing) {
          set({
            balanceLogs: balanceLogs.map((l) =>
              l.date === date ? { date, studyHours, breakHours, sleepHours } : l,
            ),
          })
        } else {
          set({
            balanceLogs: [{ date, studyHours, breakHours, sleepHours }, ...balanceLogs],
          })
        }
      },
      getTodayBalance: () => {
        const date = getTodayKey()
        return get().balanceLogs.find((l) => l.date === date) ?? null
      },
      getWeeklyBalanceComparison: () => {
        const { balanceLogs } = get()
        return {
          thisWeekStudy: avgStudyForRange(balanceLogs, 0, 7),
          lastWeekStudy: avgStudyForRange(balanceLogs, 7, 14),
          thisWeekSleep: avgSleepForRange(balanceLogs, 0, 7),
          lastWeekSleep: avgSleepForRange(balanceLogs, 7, 14),
        }
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
