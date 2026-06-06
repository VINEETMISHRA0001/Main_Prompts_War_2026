import type { StressTriggerCategory } from '@/types'

export interface StressTriggerConfig {
  category: StressTriggerCategory
  label: string
  icon: string
  description: string
}

export const STRESS_TRIGGERS: StressTriggerConfig[] = [
  {
    category: 'exams',
    label: 'Exams',
    icon: '📝',
    description: 'Upcoming tests and mock exams',
  },
  {
    category: 'results',
    label: 'Results',
    icon: '📊',
    description: 'Result anxiety and score pressure',
  },
  {
    category: 'family',
    label: 'Family Pressure',
    icon: '👨‍👩‍👧',
    description: 'Expectations from family members',
  },
  {
    category: 'time',
    label: 'Time Management',
    icon: '⏰',
    description: 'Feeling behind on syllabus',
  },
  {
    category: 'sleep',
    label: 'Sleep Issues',
    icon: '😴',
    description: 'Irregular sleep affecting focus',
  },
  {
    category: 'social',
    label: 'Social Media',
    icon: '📱',
    description: 'Comparison and distraction online',
  },
]

export const STRESS_TRIGGER_MAP = Object.fromEntries(
  STRESS_TRIGGERS.map((t) => [t.category, t]),
) as Record<StressTriggerCategory, StressTriggerConfig>
