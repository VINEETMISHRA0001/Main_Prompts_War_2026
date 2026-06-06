import type { MoodEntry, MoodHeatmapCell, MonthlyTrendPoint } from '@/types'
import { getEntryMoodScore } from '@/utils/moodScore'

export function buildMonthlyTrend(entries: MoodEntry[], days = 30): MonthlyTrendPoint[] {
  const result: MonthlyTrendPoint[] = []

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = d.toISOString().split('T')[0] ?? ''
    const dayEntries = entries.filter((e) => e.timestamp.startsWith(key))
    const mood =
      dayEntries.length > 0
        ? Math.round(
            dayEntries.reduce((s, e) => s + getEntryMoodScore(e), 0) / dayEntries.length,
          )
        : 0
    result.push({
      date: key,
      label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      mood,
    })
  }

  return result
}

export function buildMoodHeatmap(entries: MoodEntry[], days = 35): MoodHeatmapCell[] {
  const cells: MoodHeatmapCell[] = []

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = d.toISOString().split('T')[0] ?? ''
    const dayEntries = entries.filter((e) => e.timestamp.startsWith(key))
    const score =
      dayEntries.length > 0
        ? Math.round(
            dayEntries.reduce((s, e) => s + getEntryMoodScore(e), 0) / dayEntries.length,
          )
        : 0
    cells.push({
      date: key,
      day: d.getDate(),
      score,
      hasEntry: dayEntries.length > 0,
    })
  }

  return cells
}

export function heatmapColor(score: number, hasEntry: boolean): string {
  if (!hasEntry) return 'bg-muted/40'
  if (score >= 75) return 'bg-primary/80'
  if (score >= 55) return 'bg-primary/50'
  if (score >= 35) return 'bg-warning/60'
  return 'bg-destructive/60'
}
