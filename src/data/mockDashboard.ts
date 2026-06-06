import type {
  DashboardStats,
  WeeklyTrendPoint,
  WellnessSuggestion,
  UserProfile,
} from '@/types'

export const mockDashboardStats: DashboardStats = {
  moodScore: 72,
  stressLevel: 38,
  focusScore: 68,
  motivation: 81,
}

export const mockWeeklyTrend: WeeklyTrendPoint[] = [
  { day: 'Mon', mood: 65, stress: 45, focus: 60 },
  { day: 'Tue', mood: 70, stress: 40, focus: 65 },
  { day: 'Wed', mood: 55, stress: 60, focus: 50 },
  { day: 'Thu', mood: 68, stress: 42, focus: 70 },
  { day: 'Fri', mood: 75, stress: 35, focus: 72 },
  { day: 'Sat', mood: 80, stress: 30, focus: 78 },
  { day: 'Sun', mood: 72, stress: 38, focus: 68 },
]

export const mockSuggestions: WellnessSuggestion[] = [
  {
    id: 's1',
    title: 'Take a 10-minute walk',
    description: 'Step away from your desk and get fresh air to reset your focus.',
    category: 'break',
  },
  {
    id: 's2',
    title: 'Try the Pomodoro technique',
    description: 'Study for 25 minutes, then take a 5-minute break.',
    category: 'focus',
  },
  {
    id: 's3',
    title: 'Practice box breathing',
    description: 'Inhale 4s, hold 4s, exhale 4s, hold 4s. Repeat 4 times.',
    category: 'calm',
  },
]

export const mockProfile: UserProfile = {
  name: 'Priya Sharma',
  exam: 'NEET 2026',
  examDate: '2026-05-03',
  streak: 14,
  totalCheckIns: 47,
  avatarInitials: 'PS',
}

export const QUOTES = [
  'Progress, not perfection. Every small step counts.',
  'Your mental health is as important as your rank.',
  'Rest is not a reward — it is part of the process.',
  'Comparison is the thief of joy. Focus on your journey.',
  'You have survived 100% of your hardest days so far.',
]

export function getQuoteOfDay(): string {
  const dayIndex = new Date().getDate() % QUOTES.length
  return QUOTES[dayIndex] ?? QUOTES[0]!
}
