import type { MoodEntry } from '@/types'
import { MOOD_MAP } from '@/constants/moods'

export function getEntryMoodScore(entry: MoodEntry): number {
  if (entry.moodScore != null) return entry.moodScore * 10
  return MOOD_MAP[entry.mood].score
}

export function getAverageMoodScore(entries: MoodEntry[]): number {
  if (entries.length === 0) return 50
  const total = entries.reduce((sum, e) => sum + getEntryMoodScore(e), 0)
  return Math.round(total / entries.length)
}
