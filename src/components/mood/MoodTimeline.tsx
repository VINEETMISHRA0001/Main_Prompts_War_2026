import { motion } from 'framer-motion'
import type { MoodEntry } from '@/types'
import { MOOD_MAP } from '@/constants/moods'
import { formatDate, formatTime } from '@/utils/formatDate'
import { Card, CardContent } from '@/components/ui/card'

interface MoodTimelineProps {
  entries: MoodEntry[]
}

export function MoodTimeline({ entries }: MoodTimelineProps) {
  if (entries.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-8" role="status">
        No mood entries yet. Log your first mood above!
      </p>
    )
  }

  return (
    <ol className="relative space-y-4" aria-label="Mood history timeline">
      <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-border" aria-hidden />
      {entries.map((entry, index) => {
        const mood = MOOD_MAP[entry.mood]
        return (
          <motion.li
            key={entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative pl-14"
          >
            <div
              className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-background border-2 border-primary text-sm"
              aria-hidden
            >
              {mood.emoji}
            </div>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-medium ${mood.color}`}>{mood.label}</span>
                  <time className="text-xs text-muted-foreground" dateTime={entry.timestamp}>
                    {formatDate(entry.timestamp)} · {formatTime(entry.timestamp)}
                  </time>
                </div>
                {entry.note && (
                  <p className="text-sm text-muted-foreground">{entry.note}</p>
                )}
              </CardContent>
            </Card>
          </motion.li>
        )
      })}
    </ol>
  )
}
