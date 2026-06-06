import { describe, it, expect } from 'vitest'
import { assessBurnout } from '@/utils/burnout'
import type { MoodEntry } from '@/types'

describe('assessBurnout', () => {
  it('returns low tier for healthy signals', () => {
    const result = assessBurnout(20, [])
    expect(result.tier).toBe('low')
    expect(result.label).toBe('Low')
  })

  it('escalates tier with burned out moods and high anxiety', () => {
    const entries: MoodEntry[] = [
      {
        id: '1',
        mood: 'burned_out',
        note: '',
        timestamp: '2026-06-06',
        anxietyLevel: 9,
        sleepQuality: 2,
      },
      {
        id: '2',
        mood: 'overwhelmed',
        note: '',
        timestamp: '2026-06-05',
        anxietyLevel: 8,
        energyLevel: 2,
      },
    ]
    const result = assessBurnout(50, entries)
    expect(['high', 'critical']).toContain(result.tier)
  })
})
