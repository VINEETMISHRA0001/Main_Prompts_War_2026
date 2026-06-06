import { useMemo } from 'react'
import { useMoodStore, getAverageMoodScore } from '@/store/slices/moodSlice'
import { useJournalStore, getWeeklyReflectionCount } from '@/store/slices/journalSlice'
import { useWellnessStore, getTopStressTrigger } from '@/store/slices/wellnessSlice'
import { useHabitStore } from '@/store/slices/habitSlice'
import { useDashboardStore, useDailyQuests } from '@/store/slices/dashboardSlice'
import { STRESS_TRIGGER_MAP } from '@/constants/stressTriggers'
import { mockSuggestions, getQuoteOfDay } from '@/data/mockDashboard'
import { daysUntil } from '@/utils/formatDate'
import { buildWeeklyTrend, moodLabel, stressLabel, getTodayKey } from '@/utils/gamification'
import { assessBurnout } from '@/utils/burnout'
import { buildMonthlyTrend, buildMoodHeatmap } from '@/utils/moodTrends'
import { MOOD_MAP } from '@/constants/moods'

export function useDashboardMetrics() {
  const entries = useMoodStore((s) => s.entries)
  const journalEntries = useJournalStore((s) => s.entries)
  const triggers = useWellnessStore((s) => s.triggers)
  const balanceLogs = useWellnessStore((s) => s.balanceLogs)
  const habitLogs = useHabitStore((s) => s.logs)
  const profile = useDashboardStore((s) => s.profile)
  const preferences = useDashboardStore((s) => s.preferences)
  const { completed: habitsCompleted } = useDailyQuests()

  const balanceComparison = useMemo(
    () => useWellnessStore.getState().getWeeklyBalanceComparison(),
    [balanceLogs],
  )
  const habitWeekRate = useMemo(
    () => useHabitStore.getState().getWeekCompletionRate(),
    [habitLogs],
  )

  return useMemo(() => {
    const recentEntries = entries.slice(0, 14)
    const moodScore = getAverageMoodScore(recentEntries.length ? recentEntries : entries)
    const totalTriggers = triggers.reduce((s, t) => s + t.count, 0)
    const stressLevel = Math.min(95, Math.round(totalTriggers * 2.5 + (100 - moodScore) * 0.3))
    const consistencyStreak = profile.streak
    const reflectionCount = getWeeklyReflectionCount(journalEntries)

    const overwhelmedCount = recentEntries.filter(
      (e) =>
        e.mood === 'overwhelmed' ||
        e.mood === 'stressed' ||
        e.mood === 'burned_out' ||
        e.mood === 'nervous',
    ).length
    const baseBurnoutRisk = Math.min(
      100,
      Math.round(overwhelmedCount * 18 + stressLevel * 0.4 + (habitsCompleted === 0 ? 20 : 0)),
    )
    const burnout = assessBurnout(baseBurnoutRisk, recentEntries)

    const sleepTrigger = triggers.find((t) => t.category === 'sleep')
    const studyLifeBalance = Math.min(
      100,
      Math.round(
        habitsCompleted * 20 +
          habitWeekRate * 0.3 +
          (reflectionCount > 0 ? 15 : 0) +
          (sleepTrigger && sleepTrigger.count < 3 ? 20 : 10) +
          moodScore * 0.25,
      ),
    )

    const today = getTodayKey()
    const todayMoods = entries.filter((e) => e.timestamp.startsWith(today))
    const todayJournal = journalEntries.some((e) => e.date.startsWith(today))
    const weeklyTrend = buildWeeklyTrend(entries)
    const monthlyTrend = buildMonthlyTrend(entries)
    const moodHeatmap = buildMoodHeatmap(entries)

    const topTrigger = getTopStressTrigger(triggers)
    const topTriggerLabel = topTrigger
      ? STRESS_TRIGGER_MAP[topTrigger.category]?.label ?? topTrigger.category
      : 'None logged yet'

    const suggestions = mockSuggestions.map((s, i) => {
      if (i === 0 && topTrigger && topTrigger.count > 3) {
        return {
          ...s,
          title: `Manage ${topTriggerLabel.toLowerCase()} pressure`,
          description: `This is your top exam stress trigger. Take a 5-minute breathing break before your next study block.`,
        }
      }
      if (i === 1 && burnout.tier !== 'low') {
        return {
          ...s,
          title: 'Burnout prevention break',
          description: burnout.recommendation,
        }
      }
      return s
    })

    const latestMood = todayMoods[0]?.mood ?? entries[0]?.mood
    const encouragement = latestMood
      ? MOOD_MAP[latestMood].score >= 50
        ? 'You showed up today. Consistency during prep season is your superpower.'
        : 'Hard days happen during exam prep. Logging how you feel is already a win.'
      : 'Start with a 5-second mood check-in. Your future self will thank you.'

    return {
      stats: {
        moodScore,
        stressLevel,
        consistencyStreak,
        reflectionCount,
        burnoutRisk: burnout.score,
      },
      burnout,
      weeklyTrend,
      monthlyTrend,
      moodHeatmap,
      balanceComparison,
      suggestions,
      quote: getQuoteOfDay(),
      encouragement,
      examCountdown: daysUntil(profile.examDate),
      examName: preferences.examFocus || profile.exam,
      topStressTrigger: { label: topTriggerLabel, count: topTrigger?.count ?? 0 },
      studyLifeBalance,
      habitWeekRate,
      dailySummary: {
        mood: moodLabel(moodScore),
        stress: stressLabel(stressLevel),
        checkInsToday: todayMoods.length,
        hasJournal: todayJournal,
      },
    }
  }, [
    entries,
    journalEntries,
    triggers,
    balanceComparison,
    profile,
    preferences,
    habitsCompleted,
    habitWeekRate,
  ])
}

/** @deprecated Use useDashboardMetrics */
export const useDashboardStats = useDashboardMetrics
