import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { JournalEntry, MoodType } from '@/types'
import { mockJournalEntries } from '@/data/mockJournal'
import { sanitizeInput } from '@/utils/sanitize'

interface JournalSlice {
  entries: JournalEntry[]
  addEntry: (title: string, content: string, moodTag: MoodType | null) => void
  deleteEntry: (id: string) => void
}

export const useJournalStore = create<JournalSlice>()(
  persist(
    (set, get) => ({
      entries: mockJournalEntries,
      addEntry: (title, content, moodTag) => {
        const entry: JournalEntry = {
          id: crypto.randomUUID(),
          title: sanitizeInput(title, 100),
          content: sanitizeInput(content, 2000),
          moodTag,
          date: new Date().toISOString().split('T')[0] ?? '',
        }
        set({ entries: [entry, ...get().entries] })
      },
      deleteEntry: (id) => {
        set({ entries: get().entries.filter((e) => e.id !== id) })
      },
    }),
    { name: 'mindflow-journal' },
  ),
)

export function getWeeklyReflectionCount(entries: JournalEntry[]): number {
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
  return entries.filter((e) => new Date(e.date).getTime() >= weekAgo).length
}
