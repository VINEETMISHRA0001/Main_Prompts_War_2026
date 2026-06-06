import type { BurnoutAssessment, MoodEntry } from '@/types'
import { getEntryMoodScore } from '@/utils/moodScore'

const TIER_CONFIG: Record<
  BurnoutAssessment['tier'],
  Pick<BurnoutAssessment, 'label' | 'recommendation' | 'colorClass'>
> = {
  low: {
    label: 'Low',
    recommendation: 'You are pacing well. Keep balancing revision with rest.',
    colorClass: 'text-primary',
  },
  medium: {
    label: 'Medium',
    recommendation: 'Watch your sleep and breaks — small resets prevent bigger crashes.',
    colorClass: 'text-teal-500',
  },
  high: {
    label: 'High',
    recommendation: 'Schedule a real break today. Your brain needs recovery to retain syllabus.',
    colorClass: 'text-warning',
  },
  critical: {
    label: 'Critical',
    recommendation: 'Stop pushing through exhaustion. Talk to someone you trust and rest tonight.',
    colorClass: 'text-destructive',
  },
}

export function assessBurnout(
  baseRiskScore: number,
  recentEntries: MoodEntry[],
): BurnoutAssessment {
  let score = baseRiskScore

  const burnedOutCount = recentEntries.filter((e) => e.mood === 'burned_out').length
  const highAnxietyCount = recentEntries.filter(
    (e) => (e.anxietyLevel ?? 5) >= 8,
  ).length
  const lowSleepCount = recentEntries.filter((e) => (e.sleepQuality ?? 5) <= 3).length
  const lowEnergyCount = recentEntries.filter((e) => (e.energyLevel ?? 5) <= 3).length

  score += burnedOutCount * 12
  score += highAnxietyCount * 8
  score += lowSleepCount * 6
  score += lowEnergyCount * 5

  if (recentEntries.length > 0) {
    const avgMood = recentEntries.reduce((s, e) => s + getEntryMoodScore(e), 0) / recentEntries.length
    if (avgMood < 35) score += 10
  }

  score = Math.min(100, Math.round(score))

  let tier: BurnoutAssessment['tier'] = 'low'
  if (score > 75) tier = 'critical'
  else if (score > 55) tier = 'high'
  else if (score > 35) tier = 'medium'

  return {
    score,
    tier,
    ...TIER_CONFIG[tier],
  }
}
