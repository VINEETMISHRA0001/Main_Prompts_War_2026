import { motion } from 'framer-motion'
import { useMoodStore } from '@/store/slices/moodSlice'
import { useDashboardStore } from '@/store/slices/dashboardSlice'
import { useJournalStore } from '@/store/slices/journalSlice'
import { useWellnessStore } from '@/store/slices/wellnessSlice'
import { MOODS } from '@/constants/moods'
import type { MoodType } from '@/types'
import { WellnessCard } from '@/components/WellnessCard'
import { cn } from '@/utils/cn'

function syncGamification() {
  const journalCount = useJournalStore.getState().entries.length
  const uniqueTriggers = new Set(
    useWellnessStore.getState().triggers.filter((t) => t.count > 0).map((t) => t.category),
  ).size
  useDashboardStore.getState().syncAchievements(journalCount, uniqueTriggers)
}

export function QuickMoodCheck() {
  const addQuickEntry = useMoodStore((s) => s.addQuickEntry)
  const recordMoodCheckIn = useDashboardStore((s) => s.recordMoodCheckIn)
  const entries = useMoodStore((s) => s.entries)

  const todayKey = new Date().toISOString().split('T')[0] ?? ''
  const todayMood = entries.find((e) => e.timestamp.startsWith(todayKey))

  const handleSelect = (mood: MoodType) => {
    addQuickEntry(mood)
    recordMoodCheckIn()
    syncGamification()
  }

  return (
    <WellnessCard
      title="How are you feeling today?"
      description="Daily mood check-in during exam preparation — one tap is enough"
      glow
    >
      <div className="flex justify-between gap-2" role="radiogroup" aria-label="Daily mood check-in">
        {MOODS.map((m) => {
          const selected = todayMood?.mood === m.type
          return (
            <motion.button
              key={m.type}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={m.label}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleSelect(m.type)}
              className={cn(
                'flex flex-col items-center gap-1 flex-1 rounded-xl py-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                selected
                  ? 'bg-primary/15 ring-2 ring-primary'
                  : 'bg-surface hover:bg-primary/5 border border-border',
              )}
            >
              <span className="text-2xl sm:text-3xl">{m.emoji}</span>
              <span className="text-[10px] sm:text-xs font-medium text-secondary-muted hidden sm:block">
                {m.label}
              </span>
            </motion.button>
          )
        })}
      </div>
    </WellnessCard>
  )
}
