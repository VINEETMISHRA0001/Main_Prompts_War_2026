import type { ComponentType } from 'react'
import { lazy } from 'react'

export type DesktopAppId =
  | 'wellness-hub'
  | 'mood-check'
  | 'exam-pressure'
  | 'reflection'
  | 'toolkit'
  | 'progress'
  | 'sage-guide'

export interface DesktopAppConfig {
  id: DesktopAppId
  label: string
  icon: string
  description: string
  defaultSize: { width: number; height: number }
  defaultPosition: { x: number; y: number }
}

export const DESKTOP_APPS: DesktopAppConfig[] = [
  {
    id: 'wellness-hub',
    label: 'Wellness Hub',
    icon: '🖥️',
    description: 'Exam wellness dashboard — mood, stress, trends',
    defaultSize: { width: 720, height: 520 },
    defaultPosition: { x: 80, y: 40 },
  },
  {
    id: 'mood-check',
    label: 'Mood Check-in',
    icon: '😊',
    description: 'How are you feeling today?',
    defaultSize: { width: 480, height: 480 },
    defaultPosition: { x: 120, y: 60 },
  },
  {
    id: 'exam-pressure',
    label: 'Exam Pressure',
    icon: '⚡',
    description: 'What caused stress today?',
    defaultSize: { width: 560, height: 500 },
    defaultPosition: { x: 160, y: 50 },
  },
  {
    id: 'reflection',
    label: 'Reflection',
    icon: '📔',
    description: 'What went well today?',
    defaultSize: { width: 520, height: 520 },
    defaultPosition: { x: 200, y: 70 },
  },
  {
    id: 'toolkit',
    label: 'Wellness Tools',
    icon: '🧘',
    description: 'Breathing, focus & burnout prevention',
    defaultSize: { width: 540, height: 480 },
    defaultPosition: { x: 140, y: 80 },
  },
  {
    id: 'progress',
    label: 'My Progress',
    icon: '🏆',
    description: 'Streaks, badges & exam prep stats',
    defaultSize: { width: 460, height: 460 },
    defaultPosition: { x: 180, y: 90 },
  },
  {
    id: 'sage-guide',
    label: 'Sage Guide',
    icon: '🌿',
    description: 'Your wellness companion tips',
    defaultSize: { width: 400, height: 360 },
    defaultPosition: { x: 220, y: 100 },
  },
]

export const DESKTOP_APP_MAP = Object.fromEntries(
  DESKTOP_APPS.map((a) => [a.id, a]),
) as Record<DesktopAppId, DesktopAppConfig>

export interface EmbeddedPageProps {
  embedded?: boolean
}

export const DESKTOP_APP_COMPONENTS: Record<
  DesktopAppId,
  ComponentType<EmbeddedPageProps>
> = {
  'wellness-hub': lazy(() => import('@/pages/DashboardPage')),
  'mood-check': lazy(() => import('@/pages/MoodTrackerPage')),
  'exam-pressure': lazy(() => import('@/pages/StressTriggersPage')),
  reflection: lazy(() => import('@/pages/ReflectionJournalPage')),
  toolkit: lazy(() => import('@/pages/WellnessToolkitPage')),
  progress: lazy(() => import('@/pages/ProfilePage')),
  'sage-guide': lazy(() => import('@/components/desktop/SageGuideApp')),
}
