import { useMemo } from 'react'
import { useMoodStore } from '@/store/moodStore'
import { MOOD_MAP } from '@/constants/moods'
import type { MoodType } from '@/types'

export function useMoodData() {
  const entries = useMoodStore((s) => s.entries)
  const selectedMood = useMoodStore((s) => s.selectedMood)
  const note = useMoodStore((s) => s.note)
  const setSelectedMood = useMoodStore((s) => s.setSelectedMood)
  const setNote = useMoodStore((s) => s.setNote)
  const addEntry = useMoodStore((s) => s.addEntry)
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
    const today = new Date().toISOString().split('T')[0]
    return entries.find((e) => e.timestamp.startsWith(today ?? ''))
  }, [entries])

  return {
    entries,
    selectedMood,
    note,
    setSelectedMood,
    setNote,
    addEntry,
    clearForm,
    moodDistribution,
    todayEntry,
    getMoodConfig: (mood: MoodType) => MOOD_MAP[mood],
  }
}
