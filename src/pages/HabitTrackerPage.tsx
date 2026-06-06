import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/PageHeader'
import { HabitTrackerGrid } from '@/components/habits/HabitTrackerGrid'
import { WellnessCard } from '@/components/WellnessCard'
import { useHabitStore } from '@/store/slices/habitSlice'
import { useWellnessStore } from '@/store/slices/wellnessSlice'
import { useDashboardStore } from '@/store/slices/dashboardSlice'
import type { EmbeddedPageProps } from '@/constants/desktopApps'

export default function HabitTrackerPage({ embedded }: EmbeddedPageProps = {}) {
  const weekRate = useHabitStore((s) => s.getWeekCompletionRate())
  const todayBalance = useWellnessStore((s) => s.getTodayBalance())
  const logBalance = useWellnessStore((s) => s.logBalance)
  const comparison = useWellnessStore((s) => s.getWeeklyBalanceComparison())
  const completeWellnessQuest = useDashboardStore((s) => s.completeWellnessQuest)

  const [studyHours, setStudyHours] = useState(todayBalance?.studyHours ?? 6)
  const [breakHours, setBreakHours] = useState(todayBalance?.breakHours ?? 1)
  const [sleepHours, setSleepHours] = useState(todayBalance?.sleepHours ?? 7)

  const handleSaveBalance = () => {
    logBalance(studyHours, breakHours, sleepHours)
    completeWellnessQuest()
  }

  const studyDelta = comparison.thisWeekStudy - comparison.lastWeekStudy

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {!embedded && (
        <PageHeader
          title="Daily Habits"
          description="Build sustainable routines alongside intense exam preparation"
        />
      )}

      <WellnessCard title="This week's habit progress" glow>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="font-display text-4xl font-bold gradient-text">{weekRate}%</span>
          <span className="text-sm text-muted-foreground">of daily habits completed</span>
        </div>
      </WellnessCard>

      <Card>
        <CardHeader>
          <CardTitle>Today's habits</CardTitle>
        </CardHeader>
        <CardContent>
          <HabitTrackerGrid />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Study–life balance log</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Track hours to see if prep is crowding out rest. Balance protects memory and rank.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="study-hours">Study hours</Label>
              <Input
                id="study-hours"
                type="number"
                min={0}
                max={16}
                step={0.5}
                value={studyHours}
                onChange={(e) => setStudyHours(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="break-hours">Break hours</Label>
              <Input
                id="break-hours"
                type="number"
                min={0}
                max={8}
                step={0.5}
                value={breakHours}
                onChange={(e) => setBreakHours(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sleep-hours">Sleep hours</Label>
              <Input
                id="sleep-hours"
                type="number"
                min={0}
                max={12}
                step={0.5}
                value={sleepHours}
                onChange={(e) => setSleepHours(Number(e.target.value))}
              />
            </div>
          </div>
          <Button onClick={handleSaveBalance}>Save today's balance</Button>

          {(comparison.thisWeekStudy > 0 || comparison.lastWeekStudy > 0) && (
            <div className="rounded-lg border border-border bg-surface p-4 text-sm space-y-2">
              <p>
                Avg study this week: <strong>{comparison.thisWeekStudy}h</strong>
                {' · '}
                last week: <strong>{comparison.lastWeekStudy}h</strong>
                {studyDelta !== 0 && (
                  <span className={studyDelta > 0 ? ' text-warning' : ' text-primary'}>
                    {' '}
                    ({studyDelta > 0 ? '+' : ''}
                    {studyDelta}h)
                  </span>
                )}
              </p>
              <p>
                Avg sleep this week: <strong>{comparison.thisWeekSleep}h</strong>
                {' · '}
                last week: <strong>{comparison.lastWeekSleep}h</strong>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
