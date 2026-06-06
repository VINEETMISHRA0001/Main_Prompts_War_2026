import { Heart, Brain, Target, Zap, Calendar, Quote, Lightbulb } from 'lucide-react'
import { StatCard } from '@/components/dashboard/StatCard'
import { WeeklyTrendChart } from '@/components/dashboard/WeeklyTrendChart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useDashboardStats } from '@/hooks/useDashboardStats'

export default function DashboardPage() {
  const { stats, weeklyTrend, suggestions, quote, examCountdown, examName } = useDashboardStats()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Your wellness overview for today</p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Mood Score" value={stats.moodScore} suffix="%" icon={Heart} color="bg-emerald-100 text-emerald-600" />
        <StatCard title="Stress Level" value={stats.stressLevel} suffix="%" icon={Brain} color="bg-amber-100 text-amber-600" invert />
        <StatCard title="Focus Score" value={stats.focusScore} suffix="%" icon={Target} color="bg-blue-100 text-blue-600" />
        <StatCard title="Motivation" value={stats.motivation} suffix="%" icon={Zap} color="bg-purple-100 text-purple-600" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <WeeklyTrendChart data={weeklyTrend} />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" aria-hidden />
                Today&apos;s Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {suggestions.map((s) => (
                <div key={s.id} className="rounded-lg border border-border p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{s.title}</span>
                    <Badge variant="secondary">{s.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{s.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" aria-hidden />
                Exam Countdown
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-5xl font-bold gradient-text mb-2">{examCountdown}</div>
              <p className="text-muted-foreground">days until {examName}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Quote className="h-5 w-5 text-primary" aria-hidden />
                Quote of the Day
              </CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="text-sm italic text-muted-foreground">
                &ldquo;{quote}&rdquo;
              </blockquote>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Daily Wellness Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Overall mood</span>
                <span className="font-medium text-emerald-600">Good</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stress level</span>
                <span className="font-medium text-amber-600">Moderate</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Check-ins today</span>
                <span className="font-medium">1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Journal entry</span>
                <span className="font-medium">Yes</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
