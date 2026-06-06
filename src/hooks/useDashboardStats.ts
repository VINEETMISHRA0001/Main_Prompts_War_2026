import { useMemo } from 'react'
import { useMoodStore, getAverageMoodScore } from '@/store/moodStore'
import { mockDashboardStats, mockWeeklyTrend, mockSuggestions, getQuoteOfDay } from '@/data/mockDashboard'
import { mockProfile } from '@/data/mockDashboard'
import { daysUntil } from '@/utils/formatDate'

export function useDashboardStats() {
  const entries = useMoodStore((s) => s.entries)

  return useMemo(() => {
    const recentEntries = entries.slice(0, 7)
    const avgMood = getAverageMoodScore(recentEntries)

    return {
      stats: {
        ...mockDashboardStats,
        moodScore: avgMood || mockDashboardStats.moodScore,
      },
      weeklyTrend: mockWeeklyTrend,
      suggestions: mockSuggestions,
      quote: getQuoteOfDay(),
      examCountdown: daysUntil(mockProfile.examDate),
      examName: mockProfile.exam,
    }
  }, [entries])
}
