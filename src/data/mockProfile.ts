import type { Achievement, UserPreferences, ToolkitItem, GuardianProfile } from '@/types'

export const mockAchievements: Achievement[] = [
  {
    id: 'a1',
    title: 'First Check-in',
    description: 'Logged your first mood entry',
    icon: '🌱',
    unlocked: true,
  },
  {
    id: 'a2',
    title: '7-Day Streak',
    description: 'Checked in for 7 consecutive days',
    icon: '🔥',
    unlocked: true,
  },
  {
    id: 'a3',
    title: 'Journal Keeper',
    description: 'Wrote 10 journal entries',
    icon: '📔',
    unlocked: true,
  },
  {
    id: 'a4',
    title: 'Calm Master',
    description: 'Completed 5 breathing exercises',
    icon: '🧘',
    unlocked: false,
  },
  {
    id: 'a5',
    title: 'Stress Buster',
    description: 'Identified and managed all trigger types',
    icon: '💪',
    unlocked: false,
  },
  {
    id: 'a6',
    title: '30-Day Warrior',
    description: 'Maintained a 30-day streak',
    icon: '🏆',
    unlocked: false,
  },
]

export const defaultPreferences: UserPreferences = {
  dailyReminders: true,
  reducedMotion: false,
  darkMode: false,
  examFocus: 'NEET',
  voiceCheckInEnabled: true,
  checkInSchedule: { morning: '08:00', evening: '21:00' },
}

export const defaultGuardianProfile: GuardianProfile = {
  name: '',
  phone: '',
  email: '',
  relationship: 'Parent / Guardian',
  consentSigned: false,
  consentSignedAt: null,
  notifyOnRed: true,
  shareSummaryOnly: true,
}

export const mockToolkitItems: ToolkitItem[] = [
  {
    id: 'tk1',
    title: 'Breathing Exercise',
    description: '4-7-8 breathing technique to calm your nervous system',
    duration: '5 min',
    icon: '🌬️',
    steps: [
      'Sit comfortably with your back straight',
      'Inhale through your nose for 4 seconds',
      'Hold your breath for 7 seconds',
      'Exhale slowly through your mouth for 8 seconds',
      'Repeat 4 cycles',
    ],
  },
  {
    id: 'tk2',
    title: 'Focus Technique',
    description: 'Pomodoro method adapted for long study sessions',
    duration: '25 min',
    icon: '🎯',
    steps: [
      'Choose one topic to focus on',
      'Set a timer for 25 minutes',
      'Study with full concentration — no phone',
      'Take a 5-minute break when timer ends',
      'After 4 cycles, take a 15-30 minute break',
    ],
  },
  {
    id: 'tk3',
    title: 'Motivation Boost',
    description: 'Quick visualization exercise for exam motivation',
    duration: '3 min',
    icon: '⚡',
    steps: [
      'Close your eyes and take 3 deep breaths',
      'Visualize yourself on exam day, calm and prepared',
      'Picture receiving your desired result',
      'Feel the pride and relief in that moment',
      'Open your eyes and write one goal for today',
    ],
  },
  {
    id: 'tk4',
    title: 'Study Break Ideas',
    description: 'Healthy breaks that actually recharge you',
    duration: '10 min',
    icon: '☕',
    steps: [
      'Take a short walk outside',
      'Do 10 stretches or yoga poses',
      'Listen to one calming song',
      'Have a healthy snack with water',
      'Avoid social media during breaks',
    ],
  },
  {
    id: 'tk5',
    title: 'Sleep Tips',
    description: 'Wind-down routine for better sleep before exams',
    duration: '15 min',
    icon: '🌙',
    steps: [
      'Stop studying 1 hour before bed',
      'Dim lights and put away screens',
      'Write tomorrow\'s top 3 tasks on paper',
      'Do gentle stretching or meditation',
      'Aim for 7-8 hours of sleep consistently',
    ],
  },
]
