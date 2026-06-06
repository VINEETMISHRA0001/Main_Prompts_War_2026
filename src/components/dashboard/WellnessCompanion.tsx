import { motion } from 'framer-motion'
import { Progress } from '@/components/ui/progress'
import { useMoodStore } from '@/store/slices/moodSlice'
import { useDashboardStore, useDailyQuests } from '@/store/slices/dashboardSlice'
import {
  getCompanionMessage,
  getCompanionMood,
  getXpProgress,
  hasCheckedInToday,
} from '@/utils/gamification'
import { MOOD_MAP } from '@/constants/moods'

export function WellnessCompanion() {
  const entries = useMoodStore((s) => s.entries)
  const lastCheckInDate = useDashboardStore((s) => s.lastCheckInDate)
  const xp = useDashboardStore((s) => s.xp)
  const level = useDashboardStore((s) => s.level)
  const streak = useDashboardStore((s) => s.profile.streak)
  const exam = useDashboardStore((s) => s.preferences.examFocus)
  const { completed } = useDailyQuests()

  const todayKey = new Date().toISOString().split('T')[0] ?? ''
  const todayEntry = entries.find((e) => e.timestamp.startsWith(todayKey))
  const latestMood = todayEntry?.mood ?? entries[0]?.mood ?? null
  const checkedInToday = hasCheckedInToday(lastCheckInDate) || !!todayEntry
  const emoji = getCompanionMood(latestMood, checkedInToday)
  const message = getCompanionMessage(latestMood, checkedInToday, completed)

  return (
    <div className="wellness-card wellness-card-glow p-5 md:p-6 flex flex-col sm:flex-row items-center gap-5">
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="text-6xl shrink-0"
        aria-hidden
      >
        {emoji}
      </motion.div>
      <div className="flex-1 w-full text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 mb-1 flex-wrap">
          <h2 className="font-display font-bold text-lg">Sage — Your Prep Companion</h2>
          <span className="rounded-full bg-primary/15 text-primary text-xs font-bold px-2 py-0.5">
            Lv.{level}
          </span>
          {streak > 0 && (
            <span className="rounded-full bg-warning/10 text-warning text-xs font-medium px-2 py-0.5">
              🔥 {streak}-day consistency
            </span>
          )}
        </div>
        <p className="text-secondary-muted text-sm mb-1">Preparing for {exam}</p>
        <p className="text-sm mb-3">{message}</p>
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-secondary-muted">
            <span>Wellness progress</span>
            <span>{getXpProgress(xp)}/100 XP</span>
          </div>
          <Progress value={getXpProgress(xp)} aria-label="Wellness experience progress" />
        </div>
        {latestMood && checkedInToday && (
          <p className="text-xs text-secondary-muted mt-2">
            Today&apos;s mood: {MOOD_MAP[latestMood].emoji} {MOOD_MAP[latestMood].label}
          </p>
        )}
      </div>
    </div>
  )
}
