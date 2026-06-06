import { Flame, CheckCircle, Settings } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { PageHeader } from '@/components/PageHeader'
import { useDashboardStore, useSettingsStore } from '@/store/slices/dashboardSlice'
import { EXAM_OPTIONS } from '@/constants/routes'

export default function ProfilePage() {
  const profile = useDashboardStore((s) => s.profile)
  const achievements = useDashboardStore((s) => s.achievements)
  const { preferences, updatePreferences } = useSettingsStore()
  const xp = useDashboardStore((s) => s.xp)
  const level = useDashboardStore((s) => s.level)

  const unlockedCount = achievements.filter((a) => a.unlocked).length

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <PageHeader
        title="My Wellness Progress"
        description="Track consistency, self-awareness, and healthy habits throughout your exam journey"
      />

      <Card>
        <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-2xl">{profile.avatarInitials}</AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-bold">{profile.name}</h2>
            <p className="text-muted-foreground">{profile.exam}</p>
            <div className="flex items-center gap-3 mt-2 justify-center sm:justify-start flex-wrap">
              <Flame className="h-4 w-4 text-orange-500" aria-hidden />
              <span className="text-sm font-medium">{profile.streak} day streak</span>
              <span className="text-sm font-bold text-primary">Lv.{level}</span>
              <span className="text-sm text-muted-foreground">{xp} XP</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold gradient-text">{profile.streak}</div>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold gradient-text">{profile.totalCheckIns}</div>
            <p className="text-sm text-muted-foreground">Total Check-ins</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold gradient-text">{unlockedCount}</div>
            <p className="text-sm text-muted-foreground">Achievements</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Achievement Badges</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {achievements.map((a) => (
            <Card key={a.id} className={a.unlocked ? '' : 'opacity-50'}>
              <CardContent className="p-4 flex items-center gap-3">
                <span className="text-2xl" aria-hidden>{a.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{a.title}</span>
                    {a.unlocked && (
                      <CheckCircle className="h-4 w-4 text-emerald-500" aria-label="Unlocked" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{a.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" aria-hidden />
            Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="daily-reminders">Daily reminders</Label>
            <input
              id="daily-reminders"
              type="checkbox"
              checked={preferences.dailyReminders}
              onChange={(e) => updatePreferences({ dailyReminders: e.target.checked })}
              className="h-4 w-4 rounded border-border accent-primary"
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <Label htmlFor="reduced-motion">Reduce animations</Label>
            <input
              id="reduced-motion"
              type="checkbox"
              checked={preferences.reducedMotion}
              onChange={(e) => updatePreferences({ reducedMotion: e.target.checked })}
              className="h-4 w-4 rounded border-border accent-primary"
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode">Dark mode</Label>
            <input
              id="dark-mode"
              type="checkbox"
              checked={preferences.darkMode}
              onChange={(e) => {
                updatePreferences({ darkMode: e.target.checked })
                document.documentElement.classList.toggle('dark', e.target.checked)
              }}
              className="h-4 w-4 rounded border-border accent-primary"
            />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="exam-focus">Exam focus</Label>
            <select
              id="exam-focus"
              value={preferences.examFocus}
              onChange={(e) => updatePreferences({ examFocus: e.target.value })}
              className="w-full h-10 rounded-lg border border-border bg-background/50 px-3 text-sm"
            >
              {EXAM_OPTIONS.map((exam) => (
                <option key={exam} value={exam}>{exam}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
