import { Link } from 'react-router-dom'
import { CheckCircle2, Circle } from 'lucide-react'
import { WellnessCard } from '@/components/WellnessCard'
import { useDailyQuests } from '@/store/slices/dashboardSlice'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/utils/cn'

const HABITS = [
  {
    key: 'mood' as const,
    label: 'Daily mood check-in',
    href: ROUTES.MOOD,
    emoji: '😊',
  },
  {
    key: 'wellness' as const,
    label: 'Healthy habit exercise',
    href: ROUTES.TOOLKIT,
    emoji: '🧘',
  },
  {
    key: 'journal' as const,
    label: 'Reflection journal entry',
    href: ROUTES.JOURNAL,
    emoji: '📔',
  },
]

export function DailyQuests() {
  const { quests, completed, total } = useDailyQuests()

  return (
    <WellnessCard
      title="Consistency Tracker"
      description="Build healthy exam-prep habits — small daily actions prevent burnout"
    >
      <p className="text-sm text-primary font-medium mb-3">{completed}/{total} habits completed today</p>
      <ul className="space-y-2">
        {HABITS.map((q) => {
          const done = quests[q.key]
          return (
            <li key={q.key}>
              <Link
                to={q.href}
                className={cn(
                  'flex items-center gap-3 rounded-xl p-3 transition-colors',
                  done
                    ? 'bg-primary/10 border border-primary/20'
                    : 'bg-surface border border-border hover:border-primary/30',
                )}
              >
                {done ? (
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" aria-hidden />
                ) : (
                  <Circle className="h-5 w-5 text-secondary-muted shrink-0" aria-hidden />
                )}
                <span className="text-lg" aria-hidden>{q.emoji}</span>
                <span className={cn('flex-1 text-sm font-medium', done && 'text-secondary-muted')}>
                  {q.label}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </WellnessCard>
  )
}
