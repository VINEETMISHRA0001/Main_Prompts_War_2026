import { describe, it, expect } from 'vitest'
import { getAverageMoodScore, getEntryMoodScore } from '@/utils/moodScore'
import type { MoodEntry } from '@/types'

const entries: MoodEntry[] = [
  { id: '1', mood: 'happy', note: '', timestamp: '2026-06-06T10:00:00' },
  { id: '2', mood: 'calm', note: '', timestamp: '2026-06-05T10:00:00' },
]

describe('moodScore utils', () => {
  it('uses explicit moodScore when present', () => {
    expect(getEntryMoodScore({ ...entries[0]!, moodScore: 6 })).toBe(60)
  })

  it('calculates average mood score', () => {
    expect(getAverageMoodScore(entries)).toBe(83)
  })

  it('returns default score for empty entries', () => {
    expect(getAverageMoodScore([])).toBe(50)
  })
})
