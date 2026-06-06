import type { MoodHeatmapCell } from '@/types'
import { heatmapColor } from '@/utils/moodTrends'
import { ChartContainer } from '@/components/ChartContainer'

interface MoodHeatmapProps {
  cells: MoodHeatmapCell[]
}

export function MoodHeatmap({ cells }: MoodHeatmapProps) {
  return (
    <ChartContainer
      title="Mood Heatmap"
      description="Daily check-in intensity over the last 5 weeks — darker green means better mood"
    >
      <div className="grid grid-cols-7 gap-1.5" role="img" aria-label="Mood heatmap for recent days">
        {cells.map((cell) => (
          <div
            key={cell.date}
            title={
              cell.hasEntry
                ? `${cell.date}: mood ${cell.score}%`
                : `${cell.date}: no check-in`
            }
            className={`aspect-square rounded-sm ${heatmapColor(cell.score, cell.hasEntry)} flex items-center justify-center text-[10px] text-foreground/70`}
          >
            {cell.day}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 mt-4 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-1">
          <span className="h-3 w-3 rounded-sm bg-muted/40" />
          <span className="h-3 w-3 rounded-sm bg-destructive/60" />
          <span className="h-3 w-3 rounded-sm bg-warning/60" />
          <span className="h-3 w-3 rounded-sm bg-primary/50" />
          <span className="h-3 w-3 rounded-sm bg-primary/80" />
        </div>
        <span>More</span>
      </div>
    </ChartContainer>
  )
}
