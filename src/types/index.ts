export type MoodType =
  | 'happy'
  | 'calm'
  | 'neutral'
  | 'motivated'
  | 'stressed'
  | 'nervous'
  | 'overwhelmed'
  | 'burned_out'

export interface MoodMetrics {
  moodScore: number
  sleepQuality: number
  energyLevel: number
  anxietyLevel: number
  confidenceLevel: number
}

export interface MoodEntry {
  id: string
  mood: MoodType
  note: string
  timestamp: string
  moodScore?: number
  sleepQuality?: number
  energyLevel?: number
  anxietyLevel?: number
  confidenceLevel?: number
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
  | 'relationships'
  | 'financial'
  | 'health'
  | 'study_backlog'

export interface JournalEntry {
  id: string
  content: string
  moodTag: MoodType | null
  date: string
  title: string
}

export interface JournalDraft {
  title: string
  content: string
  moodTag: MoodType | null
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

export interface MonthlyTrendPoint {
  date: string
  label: string
  mood: number
}

export interface MoodHeatmapCell {
  date: string
  day: number
  score: number
  hasEntry: boolean
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
  voiceCheckInEnabled: boolean
  checkInSchedule: CheckInSchedule
}

export interface CheckInSchedule {
  morning: string
  evening: string
}

export type RiskTier = 'green' | 'amber' | 'red' | 'critical'

export interface ProsodyScores {
  pitchVariance: number
  energyLevel: number
  speechRate: number
  agitationScore: number
  summary: string
}

export interface VoiceCheckIn {
  id: string
  timestamp: string
  transcript: string
  prosody: ProsodyScores
  riskTier: RiskTier
  distressScore: number
  durationMs: number
  source: 'scheduled' | 'manual' | 'sage-ai'
}

export interface GuardianProfile {
  name: string
  phone: string
  email: string
  relationship: string
  consentSigned: boolean
  consentSignedAt: string | null
  notifyOnRed: boolean
  shareSummaryOnly: boolean
}

export interface SafetyAlert {
  id: string
  checkInId: string
  tier: RiskTier
  reason: string
  guardianNotified: boolean
  createdAt: string
}

export interface SageSource {
  id: number
  label: string
  detail: string
}

export interface SageMessage {
  id: string
  role: 'user' | 'sage'
  content: string
  timestamp: string
  sources?: SageSource[]
  prosody?: ProsodyScores
  riskTier?: RiskTier
  isVoice?: boolean
}

export interface InAppNotification {
  id: string
  title: string
  body: string
  type: 'check-in' | 'alert' | 'info'
  createdAt: string
  read: boolean
  action?: 'voice-check-in' | 'open-sage-ai'
}

export type HabitId = 'water' | 'exercise' | 'meditation' | 'sleep' | 'outdoor' | 'study'

export interface HabitDayLog {
  date: string
  completed: HabitId[]
}

export interface BalanceLog {
  date: string
  studyHours: number
  breakHours: number
  sleepHours: number
}

export type BurnoutTier = 'low' | 'medium' | 'high' | 'critical'

export interface BurnoutAssessment {
  score: number
  tier: BurnoutTier
  label: string
  recommendation: string
  colorClass: string
}
