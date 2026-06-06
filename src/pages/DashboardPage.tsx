import { Heart, Brain, Flame, BookOpen, AlertTriangle, Scale, Sparkles, Zap } from 'lucide-react'
import { PageHeader } from '@/components/PageHeader'
import { SectionHeader } from '@/components/SectionHeader'
import { StatCard } from '@/components/StatCard'
import { WellnessCard } from '@/components/WellnessCard'
import { WeeklyTrendChart } from '@/components/dashboard/WeeklyTrendChart'
import { WellnessCompanion } from '@/components/dashboard/WellnessCompanion'
import { DailyQuests } from '@/components/dashboard/DailyQuests'
import { QuickMoodCheck } from '@/components/dashboard/QuickMoodCheck'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useDashboardMetrics } from '@/hooks/useDashboardMetrics'

import type { EmbeddedPageProps } from '@/constants/desktopApps'

export default function DashboardPage({ embedded }: EmbeddedPageProps = {}) {
  const {
    stats,
    weeklyTrend,
    suggestions,
    encouragement,
    examCountdown,
    examName,
    topStressTrigger,
    studyLifeBalance,
    dailySummary,
  } = useDashboardMetrics()

  return (
    <div className={embedded ? 'space-y-4' : 'space-y-8'}>
      {!embedded && (
        <PageHeader
          title="Exam Wellness Dashboard"
          description="How am I feeling? What's affecting me? Am I improving? What should I do next?"
        />
      )}

      <WellnessCompanion />

      <QuickMoodCheck />

      <section aria-labelledby="metrics-heading">
        <SectionHeader
          id="metrics-heading"
          title="Your wellness metrics"
          description="Tracked across mood, stress, consistency, and reflection during exam prep"
        />
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            title="Mood Score"
            value={stats.moodScore}
            suffix="%"
            icon={Heart}
            hint="Based on recent check-ins"
          />
          <StatCard
            title="Stress Level"
            value={stats.stressLevel}
            suffix="%"
            icon={Brain}
            variant="warning"
            invert
            hint="From triggers & mood patterns"
          />
          <StatCard
            title="Consistency Streak"
            value={stats.consistencyStreak}
            suffix=" days"
            icon={Flame}
            variant="accent"
            hint="Daily wellness check-ins"
          />
          <StatCard
            title="Reflection Activity"
            value={stats.reflectionCount}
            suffix=" this week"
            icon={BookOpen}
            hint="Journal entries logged"
          />
        </div>
      </section>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <WeeklyTrendChart data={weeklyTrend} />
          <DailyQuests />

          <WellnessCard title="Recommended Wellness Actions" description="Supportive guidance for today's prep">
            <ul className="space-y-3">
              {suggestions.map((s) => (
                <li key={s.id} className="rounded-lg border border-border bg-surface p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="h-4 w-4 text-primary" aria-hidden />
                    <span className="font-medium text-sm">{s.title}</span>
                    <Badge variant="secondary">{s.category}</Badge>
                  </div>
                  <p className="text-sm text-secondary-muted">{s.description}</p>
                </li>
              ))}
            </ul>
          </WellnessCard>
        </div>

        <div className="space-y-6">
          <WellnessCard title="Exam Countdown" glow>
            <div className="text-center py-2">
              <div className="font-display text-5xl font-bold gradient-text">{examCountdown}</div>
              <p className="text-secondary-muted text-sm mt-2">days until {examName}</p>
            </div>
          </WellnessCard>

          <WellnessCard title="Top Stress Trigger" description="What caused exam pressure most often">
            <div className="flex items-center gap-3 mt-2">
              <Zap className="h-8 w-8 text-warning" aria-hidden />
              <div>
                <p className="font-display font-semibold">{topStressTrigger.label}</p>
                <p className="text-secondary-muted text-sm">{topStressTrigger.count} times logged</p>
              </div>
            </div>
          </WellnessCard>

          <WellnessCard title="Burnout Awareness" description="Early signals during intense prep seasons">
            <div className="space-y-2 mt-2">
              <div className="flex justify-between text-sm">
                <span className="text-secondary-muted">Risk level</span>
                <span className={stats.burnoutRisk > 55 ? 'text-warning font-medium' : 'text-primary font-medium'}>
                  {stats.burnoutRisk > 55 ? 'Elevated — take a break' : 'Manageable'}
                </span>
              </div>
              <Progress value={stats.burnoutRisk} className="h-2" aria-label="Burnout risk indicator" />
              <p className="text-xs text-secondary-muted flex items-start gap-1">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-warning" aria-hidden />
                Rest is part of preparation. A 15-minute break protects focus and memory.
              </p>
            </div>
          </WellnessCard>

          <WellnessCard title="Study–Life Balance" description="Healthy habits alongside syllabus pressure">
            <div className="space-y-2 mt-2">
              <div className="flex justify-between text-sm">
                <span className="text-secondary-muted flex items-center gap-1">
                  <Scale className="h-4 w-4" aria-hidden /> Balance score
                </span>
                <span className="text-primary font-medium">{studyLifeBalance}%</span>
              </div>
              <Progress value={studyLifeBalance} className="h-2" />
            </div>
          </WellnessCard>

          <WellnessCard title="Today's Encouragement">
            <blockquote className="text-sm italic text-secondary-muted mt-2">
              &ldquo;{encouragement}&rdquo;
            </blockquote>
          </WellnessCard>

          <WellnessCard title="Today at a Glance">
            <dl className="space-y-2 text-sm mt-2">
              <div className="flex justify-between">
                <dt className="text-secondary-muted">Overall mood</dt>
                <dd className={`font-medium ${dailySummary.mood.color}`}>{dailySummary.mood.label}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-secondary-muted">Stress level</dt>
                <dd className={`font-medium ${dailySummary.stress.color}`}>{dailySummary.stress.label}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-secondary-muted">Check-ins today</dt>
                <dd className="font-medium">{dailySummary.checkInsToday}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-secondary-muted">Reflection logged</dt>
                <dd className="font-medium">{dailySummary.hasJournal ? 'Yes' : 'Not yet'}</dd>
              </div>
            </dl>
          </WellnessCard>
        </div>
      </div>
    </div>
  )
}
