import { Flame, CheckCircle, Settings, Shield, Bell } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/PageHeader'
import { useDashboardStore, useSettingsStore } from '@/store/slices/dashboardSlice'
import { useGuardianStore } from '@/store/slices/guardianSlice'
import { useNotificationStore } from '@/store/slices/notificationSlice'
import { EXAM_OPTIONS } from '@/constants/routes'
import { defaultPreferences } from '@/data/mockProfile'
import { applyTheme } from '@/utils/theme'
import type { EmbeddedPageProps } from '@/constants/desktopApps'

export default function ProfilePage({ embedded }: EmbeddedPageProps = {}) {
  const profile = useDashboardStore((s) => s.profile)
  const achievements = useDashboardStore((s) => s.achievements)
  const { preferences, updatePreferences } = useSettingsStore()
  const guardian = useGuardianStore((s) => s.guardian)
  const updateGuardian = useGuardianStore((s) => s.updateGuardian)
  const signConsent = useGuardianStore((s) => s.signConsent)
  const alertHistory = useGuardianStore((s) => s.alertHistory)
  const openVoiceModal = useNotificationStore((s) => s.openVoiceModal)
  const xp = useDashboardStore((s) => s.xp)
  const level = useDashboardStore((s) => s.level)

  const schedule = preferences.checkInSchedule ?? defaultPreferences.checkInSchedule
  const unlockedCount = achievements.filter((a) => a.unlocked).length

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {!embedded && (
        <PageHeader
          title="My Wellness Progress"
          description="Track consistency, self-awareness, and healthy habits throughout your exam journey"
        />
      )}

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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" aria-hidden />
            Voice check-in schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="voice-checkin">Voice check-ins enabled</Label>
            <input
              id="voice-checkin"
              type="checkbox"
              checked={preferences.voiceCheckInEnabled ?? true}
              onChange={(e) => updatePreferences({ voiceCheckInEnabled: e.target.checked })}
              className="h-4 w-4 rounded border-border accent-primary"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="morning-time">Morning check-in</Label>
              <Input
                id="morning-time"
                type="time"
                value={schedule.morning}
                onChange={(e) =>
                  updatePreferences({
                    checkInSchedule: { ...schedule, morning: e.target.value },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="evening-time">Evening check-in</Label>
              <Input
                id="evening-time"
                type="time"
                value={schedule.evening}
                onChange={(e) =>
                  updatePreferences({
                    checkInSchedule: { ...schedule, evening: e.target.value },
                  })
                }
              />
            </div>
          </div>
          <Button type="button" variant="outline" onClick={() => openVoiceModal('manual')}>
            Test voice check-in now
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" aria-hidden />
            Guardian & safety alerts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            If Sage detects serious distress or threat-to-life language during voice check-ins,
            your guardian receives a summary alert (no full transcript by default).
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="guardian-name">Guardian name</Label>
              <Input
                id="guardian-name"
                value={guardian.name}
                onChange={(e) => updateGuardian({ name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="guardian-phone">Phone (SMS)</Label>
              <Input
                id="guardian-phone"
                type="tel"
                value={guardian.phone}
                onChange={(e) => updateGuardian({ phone: e.target.value })}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="guardian-email">Email</Label>
              <Input
                id="guardian-email"
                type="email"
                value={guardian.email}
                onChange={(e) => updateGuardian({ email: e.target.value })}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="summary-only">Share summary only (recommended)</Label>
            <input
              id="summary-only"
              type="checkbox"
              checked={guardian.shareSummaryOnly}
              onChange={(e) => updateGuardian({ shareSummaryOnly: e.target.checked })}
              className="h-4 w-4 rounded border-border accent-primary"
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              id="guardian-consent"
              type="checkbox"
              checked={guardian.consentSigned}
              onChange={(e) => (e.target.checked ? signConsent() : updateGuardian({ consentSigned: false, consentSignedAt: null }))}
              className="h-4 w-4 rounded border-border accent-primary"
            />
            <Label htmlFor="guardian-consent" className="text-sm leading-snug">
              I consent to guardian alerts when critical safety risk is detected during voice
              check-ins.
            </Label>
          </div>
          {alertHistory.length > 0 && (
            <div className="rounded-lg border border-border bg-surface p-3 text-xs space-y-2">
              <p className="font-medium">Recent alert log (demo)</p>
              {alertHistory.slice(0, 3).map((a) => (
                <p key={a.id} className="text-muted-foreground">{a.message}</p>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

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
                const darkMode = e.target.checked
                updatePreferences({ darkMode })
                applyTheme(darkMode)
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
