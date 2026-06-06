import { useMemo } from 'react'
import { useMoodStore } from '@/store/slices/moodSlice'
import { useWellnessStore } from '@/store/slices/wellnessSlice'
import { useJournalStore } from '@/store/slices/journalSlice'
import { useDashboardStore, useDailyQuests } from '@/store/slices/dashboardSlice'
import { MOOD_MAP } from '@/constants/moods'
import type { MoodType } from '@/types'
import { getTodayKey } from '@/utils/gamification'

export function useMoodTracker() {
  const entries = useMoodStore((s) => s.entries)
  const selectedMood = useMoodStore((s) => s.selectedMood)
  const note = useMoodStore((s) => s.note)
  const setSelectedMood = useMoodStore((s) => s.setSelectedMood)
  const setNote = useMoodStore((s) => s.setNote)
  const addEntry = useMoodStore((s) => s.addEntry)
  const addQuickEntry = useMoodStore((s) => s.addQuickEntry)
  const clearForm = useMoodStore((s) => s.clearForm)

  const moodDistribution = useMemo(() => {
    const counts: Record<MoodType, number> = {
      happy: 0,
      calm: 0,
      neutral: 0,
      stressed: 0,
      overwhelmed: 0,
    }
    entries.forEach((e) => {
      counts[e.mood] += 1
    })
    return counts
  }, [entries])

  const todayEntry = useMemo(() => {
    const today = getTodayKey()
    return entries.find((e) => e.timestamp.startsWith(today))
  }, [entries])

  return {
    entries,
    selectedMood,
    note,
    setSelectedMood,
    setNote,
    addEntry,
    addQuickEntry,
    clearForm,
    moodDistribution,
    todayEntry,
    getMoodConfig: (mood: MoodType) => MOOD_MAP[mood],
  }
}

/** @deprecated Use useMoodTracker */
export const useMoodData = useMoodTracker

export function useWellnessInsights() {
  const triggers = useWellnessStore((s) => s.triggers)
  const journalEntries = useJournalStore((s) => s.entries)
  const { completed, total } = useDailyQuests()
  const streak = useDashboardStore((s) => s.profile.streak)

  return useMemo(() => {
    const topTrigger = [...triggers].sort((a, b) => b.count - a.count)[0]
    const weeklyJournals = journalEntries.filter((e) => {
      const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
      return new Date(e.date).getTime() >= weekAgo
    }).length

    return {
      topTrigger,
      weeklyJournals,
      habitsProgress: `${completed}/${total}`,
      streak,
    }
  }, [triggers, journalEntries, completed, total, streak])
}
