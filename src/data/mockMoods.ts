import type { MoodEntry } from '@/types'

export const mockMoodHistory: MoodEntry[] = [
  {
    id: 'm1',
    mood: 'calm',
    note: 'Finished organic chemistry revision. Feeling good.',
    timestamp: '2026-06-06T08:30:00',
  },
  {
    id: 'm2',
    mood: 'stressed',
    note: 'Mock test score was lower than expected.',
    timestamp: '2026-06-05T19:45:00',
  },
  {
    id: 'm3',
    mood: 'happy',
    note: 'Scored 92% in physics weekly test!',
    timestamp: '2026-06-05T14:00:00',
  },
  {
    id: 'm4',
    mood: 'neutral',
    note: 'Regular study day, nothing special.',
    timestamp: '2026-06-04T21:00:00',
  },
  {
    id: 'm5',
    mood: 'overwhelmed',
    note: 'Too much syllabus left. Need to replan.',
    timestamp: '2026-06-03T22:30:00',
  },
  {
    id: 'm6',
    mood: 'calm',
    note: 'Meditation helped before evening session.',
    timestamp: '2026-06-03T17:00:00',
  },
]
