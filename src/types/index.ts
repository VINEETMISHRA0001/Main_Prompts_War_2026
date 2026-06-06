export type MoodType = 'happy' | 'calm' | 'neutral' | 'stressed' | 'overwhelmed'

export interface MoodEntry {
  id: string
  mood: MoodType
  note: string
  timestamp: string
}

export interface StressTrigger {
  id: string
  category: StressTriggerCategory
  count: number
  lastLogged: string
}

export type StressTriggerCategory =
  | 'exams'
  | 'results'
  | 'family'
  | 'time'
  | 'sleep'
  | 'social'

export interface JournalEntry {
  id: string
  content: string
  moodTag: MoodType | null
  date: string
  title: string
}

export interface DashboardStats {
  moodScore: number
  stressLevel: number
  focusScore: number
  motivation: number
}

export interface WeeklyTrendPoint {
  day: string
  mood: number
  stress: number
  focus: number
}

export interface WellnessSuggestion {
  id: string
  title: string
  description: string
  category: 'break' | 'focus' | 'calm' | 'sleep'
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
}

export interface UserProfile {
  name: string
  exam: string
  examDate: string
  streak: number
  totalCheckIns: number
  avatarInitials: string
}

export interface Testimonial {
  id: string
  name: string
  exam: string
  quote: string
  rating: number
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface ToolkitItem {
  id: string
  title: string
  description: string
  duration: string
  icon: string
  steps: string[]
}

export interface UserPreferences {
  dailyReminders: boolean
  reducedMotion: boolean
  darkMode: boolean
  examFocus: string
}
