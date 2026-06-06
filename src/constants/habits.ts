import type { HabitId } from '@/types'

export interface HabitConfig {
  id: HabitId
  label: string
  icon: string
  description: string
  targetPerWeek: number
}

export const HABITS: HabitConfig[] = [
  {
    id: 'water',
    label: 'Hydration',
    icon: '💧',
    description: 'Drink enough water during study blocks',
    targetPerWeek: 7,
  },
  {
    id: 'exercise',
    label: 'Exercise',
    icon: '🏃',
    description: 'Move your body — even a short walk counts',
    targetPerWeek: 5,
  },
  {
    id: 'meditation',
    label: 'Meditation',
    icon: '🧘',
    description: 'Mindfulness or breathing practice',
    targetPerWeek: 5,
  },
  {
    id: 'sleep',
    label: 'Sleep Routine',
    icon: '😴',
    description: '7+ hours or consistent bedtime',
    targetPerWeek: 7,
  },
  {
    id: 'outdoor',
    label: 'Outdoor Time',
    icon: '🌳',
    description: 'Fresh air away from your desk',
    targetPerWeek: 4,
  },
  {
    id: 'study',
    label: 'Focused Study',
    icon: '📖',
    description: 'Completed a planned study session',
    targetPerWeek: 6,
  },
]

export const HABIT_MAP = Object.fromEntries(HABITS.map((h) => [h.id, h])) as Record<
  HabitId,
  HabitConfig
>
