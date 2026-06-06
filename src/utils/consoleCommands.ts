import { MOODS } from '@/constants/moods'
import type { DesktopAppId } from '@/constants/desktopApps'
import { useMoodStore } from '@/store/slices/moodSlice'
import { useDashboardStore } from '@/store/slices/dashboardSlice'
import { useDesktopStore } from '@/store/slices/desktopSlice'
import { getTodayKey } from '@/utils/gamification'

const APP_ALIASES: Record<string, DesktopAppId> = {
  hub: 'wellness-hub',
  dashboard: 'wellness-hub',
  mood: 'mood-check',
  stress: 'exam-pressure',
  pressure: 'exam-pressure',
  journal: 'reflection',
  reflect: 'reflection',
  toolkit: 'toolkit',
  tools: 'toolkit',
  profile: 'progress',
  progress: 'progress',
  sage: 'sage-guide',
  guide: 'sage-guide',
}

export function executeConsoleCommand(input: string): string {
  const trimmed = input.trim().toLowerCase()
  if (!trimmed) return ''

  const desktop = useDesktopStore.getState()
  const parts = trimmed.split(/\s+/)
  const cmd = parts[0] ?? ''

  switch (cmd) {
    case 'help':
      return [
        'Available commands:',
        '  help          — show this list',
        '  open <app>    — open wellness app (mood, stress, journal, toolkit, hub)',
        '  status        — your wellness stats',
        '  quest         — daily habit progress',
        '  checkin calm  — quick mood check-in',
        '  clear         — clear console',
      ].join('\n')

    case 'clear':
      desktop.clearConsole()
      return ''

    case 'open': {
      const target = parts[1] ?? ''
      const appId = APP_ALIASES[target]
      if (!appId) return `Unknown app "${target}". Try: mood, stress, journal, toolkit, hub`
      desktop.openApp(appId)
      return `Launching ${target}...`
    }

    case 'status': {
      const entries = useMoodStore.getState().entries
      const streak = useDashboardStore.getState().profile.streak
      const xp = useDashboardStore.getState().xp
      const level = useDashboardStore.getState().level
      return `Level ${level} | ${xp} XP | ${streak}-day streak | ${entries.length} mood logs`
    }

    case 'quest': {
      const quests = useDashboardStore.getState().dailyQuests
      const today = getTodayKey()
      const q = quests.date === today ? quests : { mood: false, wellness: false, journal: false }
      const completed = [q.mood, q.wellness, q.journal].filter(Boolean).length
      return `Daily habits: ${completed}/3 complete. Open apps to finish today's quests!`
    }

    case 'checkin': {
      const moodName = parts[1] ?? 'calm'
      const mood = MOODS.find((m) => m.type === moodName || m.label.toLowerCase() === moodName)
      if (!mood) return `Unknown mood. Try: happy, calm, neutral, stressed, overwhelmed`
      useMoodStore.getState().addQuickEntry(mood.type)
      useDashboardStore.getState().recordMoodCheckIn()
      desktop.pushConsoleLine('success', `Mood logged: ${mood.emoji} ${mood.label} (+25 XP)`)
      return `Check-in saved! ${mood.emoji} ${mood.label}`
    }

    default:
      if (APP_ALIASES[cmd]) {
        desktop.openApp(APP_ALIASES[cmd]!)
        return `Opening ${cmd}...`
      }
      return `Unknown command "${cmd}". Type "help" for wellness commands.`
  }
}

export function getSageTip(): string {
  const profile = useDashboardStore.getState().profile
  const entries = useMoodStore.getState().entries
  const tips = [
    'You showed up today. Consistency during prep season is your superpower.',
    `Preparing for ${profile.exam}. Rest protects memory as much as revision.`,
    `${entries.length} mood logs saved. Patterns help you manage exam anxiety.`,
    'Type "checkin calm" in the console for a quick mood log.',
    'Double-click Exam Pressure to track what stressed you today.',
  ]
  return tips[Math.floor(Math.random() * tips.length)] ?? tips[0]!
}
