import type { MoodType } from '@/types'

export interface MoodConfig {
  type: MoodType
  emoji: string
  label: string
  color: string
  bgColor: string
  score: number
}

export const MOODS: MoodConfig[] = [
  {
    type: 'happy',
    emoji: '😀',
    label: 'Happy',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
    score: 90,
  },
  {
    type: 'motivated',
    emoji: '💪',
    label: 'Motivated',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
    score: 85,
  },
  {
    type: 'calm',
    emoji: '🙂',
    label: 'Calm',
    color: 'text-teal-600',
    bgColor: 'bg-teal-100 dark:bg-teal-900/30',
    score: 75,
  },
  {
    type: 'neutral',
    emoji: '😐',
    label: 'Neutral',
    color: 'text-slate-600',
    bgColor: 'bg-slate-100 dark:bg-slate-800/50',
    score: 50,
  },
  {
    type: 'nervous',
    emoji: '😰',
    label: 'Nervous',
    color: 'text-amber-500',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    score: 35,
  },
  {
    type: 'stressed',
    emoji: '😟',
    label: 'Stressed',
    color: 'text-amber-600',
    bgColor: 'bg-amber-100 dark:bg-amber-900/30',
    score: 30,
  },
  {
    type: 'overwhelmed',
    emoji: '😢',
    label: 'Overwhelmed',
    color: 'text-rose-600',
    bgColor: 'bg-rose-100 dark:bg-rose-900/30',
    score: 15,
  },
  {
    type: 'burned_out',
    emoji: '🪫',
    label: 'Burned Out',
    color: 'text-rose-700',
    bgColor: 'bg-rose-50 dark:bg-rose-950/40',
    score: 10,
  },
]

export const MOOD_TYPES = MOODS.map((m) => m.type) as [MoodType, ...MoodType[]]

export const MOOD_MAP = Object.fromEntries(MOODS.map((m) => [m.type, m])) as Record<
  MoodType,
  MoodConfig
>

export const DEFAULT_MOOD_METRICS = {
  moodScore: 5,
  sleepQuality: 5,
  energyLevel: 5,
  anxietyLevel: 5,
  confidenceLevel: 5,
} as const
