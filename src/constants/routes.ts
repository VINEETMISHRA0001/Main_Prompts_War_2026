export const ROUTES = {
  HOME: '/',
  DESKTOP: '/desktop',
  DASHBOARD: '/desktop',
  MOOD: '/desktop?app=mood',
  STRESS: '/desktop?app=stress',
  JOURNAL: '/desktop?app=journal',
  TOOLKIT: '/desktop?app=toolkit',
  PROFILE: '/desktop?app=profile',
} as const

export const APP_NAME = 'MindFlow'

export const EXAM_OPTIONS = [
  'NEET',
  'JEE',
  'UPSC',
  'GATE',
  'CAT',
  'CUET',
  'SSC',
  'Board Exams',
] as const
