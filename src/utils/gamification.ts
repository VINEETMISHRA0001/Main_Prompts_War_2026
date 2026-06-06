import type { Achievement, MoodEntry, MoodType } from '@/types'
import { MOOD_MAP } from '@/constants/moods'
import { getEntryMoodScore } from '@/utils/moodScore'

export function getTodayKey(): string {
  return new Date().toISOString().split('T')[0] ?? ''
}

export function getLevelFromXp(xp: number): number {
  return Math.floor(xp / 100) + 1
}

export function getXpProgress(xp: number): number {
  return xp % 100
}

export function computeStreak(lastCheckInDate: string | null, currentStreak: number): number {
  const today = getTodayKey()
  if (!lastCheckInDate) return 1
  if (lastCheckInDate === today) return currentStreak

  const last = new Date(lastCheckInDate)
  const now = new Date(today)
  const diffDays = Math.round((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return currentStreak + 1
  return 1
}

export function hasCheckedInToday(lastCheckInDate: string | null): boolean {
  return lastCheckInDate === getTodayKey()
}

export function getCompanionMood(latestMood: MoodType | null, checkedInToday: boolean): string {
  if (!checkedInToday && !latestMood) return '🌱'
  if (!checkedInToday) return '💤'
  if (!latestMood) return '🙂'
  const score = MOOD_MAP[latestMood].score
  if (score >= 75) return '😊'
  if (score >= 50) return '🙂'
  if (score >= 30) return '😟'
  return '😢'
}

export function getCompanionMessage(
  latestMood: MoodType | null,
  checkedInToday: boolean,
  questsDone: number,
): string {
  if (!checkedInToday) return "I'm waiting for your check-in! Tap a mood below — it takes 5 seconds."
  if (questsDone === 3) return 'All quests done today! You crushed it. Rest or revise — you earned it.'
  if (latestMood === 'stressed' || latestMood === 'overwhelmed' || latestMood === 'burned_out') {
    return 'Tough day? Try a breathing exercise from the Toolkit. Small steps count.'
  }
  if (latestMood === 'nervous') {
    return 'Pre-exam nerves are normal. A quick breathing reset can help before your next block.'
  }
  if (questsDone > 0) return `${3 - questsDone} quest${3 - questsDone === 1 ? '' : 's'} left today. Keep going!`
  return "Great check-in! Complete today's quests to level up."
}

export function buildWeeklyTrend(entries: MoodEntry[]) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const result = []

  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = d.toISOString().split('T')[0] ?? ''
    const dayEntries = entries.filter((e) => e.timestamp.startsWith(key))
    const mood =
      dayEntries.length > 0
        ? Math.round(
            dayEntries.reduce((s, e) => s + getEntryMoodScore(e), 0) / dayEntries.length,
          )
        : 0
    result.push({
      day: days[d.getDay()] ?? '',
      mood,
      stress: mood > 0 ? Math.max(10, 100 - mood + 15) : 0,
      focus: mood > 0 ? Math.min(95, mood + 5) : 0,
    })
  }
  return result
}

export function moodLabel(score: number): { label: string; color: string } {
  if (score >= 75) return { label: 'Good', color: 'text-emerald-600' }
  if (score >= 50) return { label: 'Okay', color: 'text-teal-600' }
  if (score >= 30) return { label: 'Low', color: 'text-amber-600' }
  return { label: 'Needs care', color: 'text-rose-600' }
}

export function stressLabel(level: number): { label: string; color: string } {
  if (level <= 30) return { label: 'Low', color: 'text-emerald-600' }
  if (level <= 55) return { label: 'Moderate', color: 'text-amber-600' }
  return { label: 'High', color: 'text-rose-600' }
}

export const ACHIEVEMENT_IDS = {
  FIRST_CHECKIN: 'a1',
  STREAK_7: 'a2',
  JOURNAL_10: 'a3',
  CALM_MASTER: 'a4',
  STRESS_BUSTER: 'a5',
  STREAK_30: 'a6',
} as const

export function evaluateAchievements(input: {
  achievements: Achievement[]
  totalCheckIns: number
  streak: number
  journalCount: number
  breathingCompletions: number
  uniqueTriggerCategories: number
}): Achievement[] {
  const unlock = (id: string) =>
    input.achievements.map((a) => (a.id === id ? { ...a, unlocked: true } : a))

  let updated = [...input.achievements]

  if (input.totalCheckIns >= 1) {
    updated = unlock(ACHIEVEMENT_IDS.FIRST_CHECKIN)
  }
  if (input.streak >= 7) {
    updated = unlock(ACHIEVEMENT_IDS.STREAK_7)
  }
  if (input.journalCount >= 10) {
    updated = unlock(ACHIEVEMENT_IDS.JOURNAL_10)
  }
  if (input.breathingCompletions >= 5) {
    updated = unlock(ACHIEVEMENT_IDS.CALM_MASTER)
  }
  if (input.uniqueTriggerCategories >= 6) {
    updated = unlock(ACHIEVEMENT_IDS.STRESS_BUSTER)
  }
  if (input.streak >= 30) {
    updated = unlock(ACHIEVEMENT_IDS.STREAK_30)
  }

  return updated
}

export function findNewlyUnlocked(before: Achievement[], after: Achievement[]): Achievement | null {
  const newly = after.find((a) => a.unlocked && !before.find((b) => b.id === a.id)?.unlocked)
  return newly ?? null
}
