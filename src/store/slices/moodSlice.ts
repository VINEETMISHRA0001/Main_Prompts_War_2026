import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { MoodEntry, MoodMetrics, MoodType } from '@/types'
import { mockMoodHistory } from '@/data/mockMoods'
import { DEFAULT_MOOD_METRICS } from '@/constants/moods'

export { getAverageMoodScore } from '@/utils/moodScore'

interface MoodSlice extends MoodMetrics {
  entries: MoodEntry[]
  selectedMood: MoodType | null
  note: string
  setSelectedMood: (mood: MoodType) => void
  setNote: (note: string) => void
  setMoodScore: (value: number) => void
  setSleepQuality: (value: number) => void
  setEnergyLevel: (value: number) => void
  setAnxietyLevel: (value: number) => void
  setConfidenceLevel: (value: number) => void
  addEntry: (options?: { skipMetrics?: boolean }) => void
  addQuickEntry: (mood: MoodType) => void
  clearForm: () => void
}

function buildEntry(
  mood: MoodType,
  note: string,
  metrics: MoodMetrics,
  skipMetrics: boolean,
): MoodEntry {
  const entry: MoodEntry = {
    id: crypto.randomUUID(),
    mood,
    note: note.trim(),
    timestamp: new Date().toISOString(),
  }
  if (!skipMetrics) {
    entry.moodScore = metrics.moodScore
    entry.sleepQuality = metrics.sleepQuality
    entry.energyLevel = metrics.energyLevel
    entry.anxietyLevel = metrics.anxietyLevel
    entry.confidenceLevel = metrics.confidenceLevel
  }
  return entry
}

export const useMoodStore = create<MoodSlice>()(
  persist(
    (set, get) => ({
      entries: mockMoodHistory,
      selectedMood: null,
      note: '',
      ...DEFAULT_MOOD_METRICS,
      setSelectedMood: (mood) => set({ selectedMood: mood }),
      setNote: (note) => set({ note }),
      setMoodScore: (moodScore) => set({ moodScore }),
      setSleepQuality: (sleepQuality) => set({ sleepQuality }),
      setEnergyLevel: (energyLevel) => set({ energyLevel }),
      setAnxietyLevel: (anxietyLevel) => set({ anxietyLevel }),
      setConfidenceLevel: (confidenceLevel) => set({ confidenceLevel }),
      addEntry: (options) => {
        const state = get()
        if (!state.selectedMood) return
        const entry = buildEntry(
          state.selectedMood,
          state.note,
          state,
          options?.skipMetrics ?? false,
        )
        set({
          entries: [entry, ...state.entries],
          selectedMood: null,
          note: '',
          ...DEFAULT_MOOD_METRICS,
        })
      },
      addQuickEntry: (mood) => {
        const today = new Date().toISOString().split('T')[0] ?? ''
        const entry = buildEntry(mood, '', DEFAULT_MOOD_METRICS, true)
        set((s) => ({
          entries: [
            entry,
            ...s.entries.filter((e) => !e.timestamp.startsWith(today)),
          ],
        }))
      },
      clearForm: () =>
        set({ selectedMood: null, note: '', ...DEFAULT_MOOD_METRICS }),
    }),
    { name: 'mindflow-mood' },
  ),
)
