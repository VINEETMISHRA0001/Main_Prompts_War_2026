import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { HabitDayLog, HabitId } from '@/types'
import { getTodayKey } from '@/utils/gamification'

interface HabitSlice {
  logs: HabitDayLog[]
  toggleHabit: (habitId: HabitId, date?: string) => void
  isCompleted: (habitId: HabitId, date?: string) => boolean
  getWeekCompletionRate: () => number
  getHabitStreak: (habitId: HabitId) => number
}

function getLogForDate(logs: HabitDayLog[], date: string): HabitDayLog | undefined {
  return logs.find((l) => l.date === date)
}

export const useHabitStore = create<HabitSlice>()(
  persist(
    (set, get) => ({
      logs: [],
      toggleHabit: (habitId, date = getTodayKey()) => {
        const { logs } = get()
        const existing = getLogForDate(logs, date)
        if (existing) {
          const completed = existing.completed.includes(habitId)
            ? existing.completed.filter((h) => h !== habitId)
            : [...existing.completed, habitId]
          set({
            logs: logs.map((l) => (l.date === date ? { ...l, completed } : l)),
          })
        } else {
          set({ logs: [{ date, completed: [habitId] }, ...logs] })
        }
      },
      isCompleted: (habitId, date = getTodayKey()) => {
        const log = getLogForDate(get().logs, date)
        return log?.completed.includes(habitId) ?? false
      },
      getWeekCompletionRate: () => {
        const { logs } = get()
        let completed = 0
        let total = 0
        for (let i = 0; i < 7; i++) {
          const d = new Date()
          d.setDate(d.getDate() - i)
          const key = d.toISOString().split('T')[0] ?? ''
          const log = getLogForDate(logs, key)
          total += 6
          completed += log?.completed.length ?? 0
        }
        return total === 0 ? 0 : Math.round((completed / total) * 100)
      },
      getHabitStreak: (habitId) => {
        const { logs } = get()
        let streak = 0
        for (let i = 0; i < 365; i++) {
          const d = new Date()
          d.setDate(d.getDate() - i)
          const key = d.toISOString().split('T')[0] ?? ''
          const log = getLogForDate(logs, key)
          if (log?.completed.includes(habitId)) streak += 1
          else break
        }
        return streak
      },
    }),
    { name: 'mindflow-habits' },
  ),
)
