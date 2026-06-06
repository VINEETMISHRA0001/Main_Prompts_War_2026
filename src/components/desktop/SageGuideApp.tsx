import { WellnessCard } from '@/components/WellnessCard'
import { Button } from '@/components/ui/button'
import { useDashboardStore } from '@/store/slices/dashboardSlice'
import { useDailyQuests } from '@/store/slices/dashboardSlice'
import { getSageTip } from '@/utils/consoleCommands'
import { useState } from 'react'
import type { EmbeddedPageProps } from '@/constants/desktopApps'

export default function SageGuideApp({ embedded: _embedded }: EmbeddedPageProps) {
  const [tip, setTip] = useState(getSageTip)
  const streak = useDashboardStore((s) => s.profile.streak)
  const level = useDashboardStore((s) => s.level)
  const { completed, total } = useDailyQuests()

  return (
    <div className="space-y-4 p-1">
      <div className="text-center">
        <span className="text-6xl block mb-2" aria-hidden>🌿</span>
        <h2 className="font-display font-bold text-lg">Sage — Prep Companion</h2>
        <p className="text-secondary-muted text-sm">Level {level} · {streak}-day streak</p>
      </div>
      <WellnessCard title="Today's Tip" glow>
        <p className="text-sm italic text-secondary-muted">&ldquo;{tip}&rdquo;</p>
        <Button variant="outline" size="sm" className="mt-3" onClick={() => setTip(getSageTip())}>
          New Tip
        </Button>
      </WellnessCard>
      <WellnessCard title="Daily Habits">
        <p className="text-2xl font-display font-bold text-primary">{completed}/{total}</p>
        <p className="text-xs text-secondary-muted">Complete all habits to level up faster</p>
      </WellnessCard>
    </div>
  )
}
