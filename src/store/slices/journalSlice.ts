import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { JournalDraft, JournalEntry, MoodType } from '@/types'
import { mockJournalEntries } from '@/data/mockJournal'
import { sanitizeInput } from '@/utils/sanitize'

interface JournalSlice {
  entries: JournalEntry[]
  draft: JournalDraft
  addEntry: (title: string, content: string, moodTag: MoodType | null) => void
  deleteEntry: (id: string) => void
  saveDraft: (draft: Partial<JournalDraft>) => void
  clearDraft: () => void
}

const emptyDraft: JournalDraft = { title: '', content: '', moodTag: null }

export const useJournalStore = create<JournalSlice>()(
  persist(
    (set, get) => ({
      entries: mockJournalEntries,
      draft: emptyDraft,
      addEntry: (title, content, moodTag) => {
        const entry: JournalEntry = {
          id: crypto.randomUUID(),
          title: sanitizeInput(title, 100),
          content: sanitizeInput(content, 2000),
          moodTag,
          date: new Date().toISOString().split('T')[0] ?? '',
        }
        set({ entries: [entry, ...get().entries], draft: emptyDraft })
      },
      deleteEntry: (id) => {
        set({ entries: get().entries.filter((e) => e.id !== id) })
      },
      saveDraft: (partial) => {
        set({ draft: { ...get().draft, ...partial } })
      },
      clearDraft: () => set({ draft: emptyDraft }),
    }),
    { name: 'mindflow-journal' },
  ),
)

export function getWeeklyReflectionCount(entries: JournalEntry[]): number {
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
  return entries.filter((e) => new Date(e.date).getTime() >= weekAgo).length
}

export function filterJournalEntries(entries: JournalEntry[], query: string): JournalEntry[] {
  const q = query.trim().toLowerCase()
  if (!q) return entries
  return entries.filter(
    (e) =>
      e.title.toLowerCase().includes(q) ||
      e.content.toLowerCase().includes(q) ||
      (e.moodTag?.toLowerCase().includes(q) ?? false),
  )
}
