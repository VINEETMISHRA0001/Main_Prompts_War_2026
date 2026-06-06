import { describe, it, expect } from 'vitest'
import { buildMonthlyTrend, buildMoodHeatmap } from '@/utils/moodTrends'
import type { MoodEntry } from '@/types'

const entries: MoodEntry[] = [
  { id: '1', mood: 'happy', note: '', timestamp: '2026-06-06T10:00:00', moodScore: 8 },
  { id: '2', mood: 'calm', note: '', timestamp: '2026-06-05T10:00:00', moodScore: 7 },
]

describe('moodTrends', () => {
  it('builds monthly trend with requested days', () => {
    expect(buildMonthlyTrend(entries, 30)).toHaveLength(30)
  })

  it('builds heatmap cells with entry flags', () => {
    const cells = buildMoodHeatmap(entries, 7)
    expect(cells).toHaveLength(7)
    expect(cells.some((c) => c.hasEntry)).toBe(true)
  })
})
