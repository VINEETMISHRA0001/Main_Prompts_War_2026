import { HABITS } from '@/constants/habits'
import { useHabitStore } from '@/store/slices/habitSlice'
import { cn } from '@/utils/cn'

export function HabitTrackerGrid() {
  const toggleHabit = useHabitStore((s) => s.toggleHabit)
  const isCompleted = useHabitStore((s) => s.isCompleted)
  const getHabitStreak = useHabitStore((s) => s.getHabitStreak)

  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {HABITS.map((habit) => {
        const done = isCompleted(habit.id)
        const streak = getHabitStreak(habit.id)
        return (
          <button
            key={habit.id}
            type="button"
            onClick={() => toggleHabit(habit.id)}
            className={cn(
              'rounded-xl border p-4 text-left transition-all hover:border-primary/40',
              done ? 'border-primary/50 bg-primary/5' : 'border-border bg-surface',
            )}
            aria-pressed={done}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-2xl" aria-hidden>{habit.icon}</span>
              {streak > 0 && (
                <span className="text-xs font-medium text-primary">{streak}d streak</span>
              )}
            </div>
            <p className="font-medium text-sm mt-2">{habit.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{habit.description}</p>
            <p className="text-xs mt-2 font-medium">{done ? 'Done today ✓' : 'Tap to mark done'}</p>
          </button>
        )
      })}
    </div>
  )
}
