import type { JournalEntry } from '@/types'

export const mockJournalEntries: JournalEntry[] = [
  {
    id: 'j1',
    title: 'A productive morning',
    content:
      'Woke up early and completed two chapters of biology. The Pomodoro technique really helped me stay focused without burning out.',
    moodTag: 'happy',
    date: '2026-06-06',
  },
  {
    id: 'j2',
    title: 'Dealing with mock test anxiety',
    content:
      'Today\'s mock test didn\'t go as planned. Instead of spiraling, I reviewed my mistakes and made a list of weak topics to revisit tomorrow.',
    moodTag: 'stressed',
    date: '2026-06-05',
  },
  {
    id: 'j3',
    title: 'Gratitude moment',
    content:
      'Grateful for my study group. We discussed difficult problems together and it made everything feel less overwhelming.',
    moodTag: 'calm',
    date: '2026-06-04',
  },
  {
    id: 'j4',
    title: 'Rest day reflection',
    content:
      'Took a half-day break. Watched a movie, went for a walk. Came back refreshed and ready for the evening revision session.',
    moodTag: 'calm',
    date: '2026-06-03',
  },
]
