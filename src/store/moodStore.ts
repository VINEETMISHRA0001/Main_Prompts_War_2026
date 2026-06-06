import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { MoodEntry, MoodType } from '@/types'
import { mockMoodHistory } from '@/data/mockMoods'
import { MOOD_MAP } from '@/constants/moods'

interface MoodState {
  entries: MoodEntry[]
  selectedMood: MoodType | null
  note: string
  setSelectedMood: (mood: MoodType) => void
  setNote: (note: string) => void
  addEntry: () => void
  clearForm: () => void
}

export const useMoodStore = create<MoodState>()(
  persist(
    (set, get) => ({
      entries: mockMoodHistory,
      selectedMood: null,
      note: '',
      setSelectedMood: (mood) => set({ selectedMood: mood }),
      setNote: (note) => set({ note }),
      addEntry: () => {
        const { selectedMood, note, entries } = get()
        if (!selectedMood) return
        const entry: MoodEntry = {
          id: crypto.randomUUID(),
          mood: selectedMood,
          note: note.trim(),
          timestamp: new Date().toISOString(),
        }
        set({ entries: [entry, ...entries], selectedMood: null, note: '' })
      },
      clearForm: () => set({ selectedMood: null, note: '' }),
    }),
    { name: 'mindflow-mood' },
  ),
)

export function getAverageMoodScore(entries: MoodEntry[]): number {
  if (entries.length === 0) return 50
  const total = entries.reduce((sum, e) => sum + MOOD_MAP[e.mood].score, 0)
  return Math.round(total / entries.length)
}
