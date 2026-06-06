import type { StressTrigger } from '@/types'

export const mockStressData: StressTrigger[] = [
  { id: 't1', category: 'exams', count: 12, lastLogged: '2026-06-06' },
  { id: 't2', category: 'study_backlog', count: 9, lastLogged: '2026-06-05' },
  { id: 't3', category: 'sleep', count: 7, lastLogged: '2026-06-05' },
  { id: 't4', category: 'family', count: 5, lastLogged: '2026-06-04' },
  { id: 't5', category: 'results', count: 4, lastLogged: '2026-06-03' },
  { id: 't6', category: 'social', count: 3, lastLogged: '2026-06-02' },
  { id: 't7', category: 'relationships', count: 2, lastLogged: '2026-06-01' },
  { id: 't8', category: 'financial', count: 2, lastLogged: '2026-05-30' },
  { id: 't9', category: 'health', count: 1, lastLogged: '2026-05-28' },
  { id: 't10', category: 'time', count: 6, lastLogged: '2026-06-04' },
]

export const stressInsights = [
  {
    id: 'i1',
    title: 'Peak stress on Wednesdays',
    description: 'Your stress levels tend to spike mid-week. Consider lighter schedules on Wednesdays.',
  },
  {
    id: 'i2',
    title: 'Sleep affects focus',
    description: 'On days you log sleep issues, your focus score drops by an average of 15%.',
  },
  {
    id: 'i3',
    title: 'Exams are your top trigger',
    description: 'Exam-related stress accounts for 32% of your logged triggers this month.',
  },
]
