import { describe, it, expect } from 'vitest'
import {
  computeStreak,
  getTodayKey,
  moodLabel,
  buildWeeklyTrend,
} from '@/utils/gamification'

describe('gamification utils', () => {
  it('computes streak for consecutive days', () => {
    const today = getTodayKey()
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayKey = yesterday.toISOString().split('T')[0]!
    expect(computeStreak(yesterdayKey, 5)).toBe(6)
    expect(computeStreak(today, 5)).toBe(5)
  })

  it('returns mood labels for scores', () => {
    expect(moodLabel(80).label).toBe('Good')
    expect(moodLabel(25).label).toBe('Needs care')
  })

  it('builds weekly trend with 7 data points', () => {
    const trend = buildWeeklyTrend([])
    expect(trend).toHaveLength(7)
  })
})
