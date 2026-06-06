import { useEffect } from 'react'
import { useDashboardStore } from '@/store/slices/dashboardSlice'
import { useNotificationStore } from '@/store/slices/notificationSlice'
import { useVoiceCheckInStore } from '@/store/slices/voiceCheckInSlice'
import { defaultPreferences } from '@/data/mockProfile'

function currentHHMM(): string {
  const d = new Date()
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

function slotKey(period: 'morning' | 'evening', date: string): string {
  return `${date}-${period}`
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number)
  return (h ?? 0) * 60 + (m ?? 0)
}

export function useCheckInScheduler() {
  const preferences = useDashboardStore((s) => s.preferences)
  const lastScheduledSlot = useNotificationStore((s) => s.lastScheduledSlot)
  const setLastScheduledSlot = useNotificationStore((s) => s.setLastScheduledSlot)
  const pushNotification = useNotificationStore((s) => s.pushNotification)
  const incrementMissed = useNotificationStore((s) => s.incrementMissed)
  const getTodayCheckIns = useVoiceCheckInStore((s) => s.getTodayCheckIns)

  useEffect(() => {
    const schedule = preferences.checkInSchedule ?? defaultPreferences.checkInSchedule
    const remindersOn = preferences.dailyReminders ?? true
    const voiceOn = preferences.voiceCheckInEnabled ?? true

    if (!remindersOn || !voiceOn) return

    const tick = () => {
      const now = currentHHMM()
      const today = new Date().toISOString().split('T')[0] ?? ''

      const slots: { period: 'morning' | 'evening'; time: string; label: string }[] = [
        { period: 'morning', time: schedule.morning, label: 'Morning voice check-in' },
        { period: 'evening', time: schedule.evening, label: 'Evening voice check-in' },
      ]

      const nowMinutes = toMinutes(now)

      for (const slot of slots) {
        const key = slotKey(slot.period, today)
        const slotMinutes = toMinutes(slot.time)

        if (now === slot.time && lastScheduledSlot !== key) {
          setLastScheduledSlot(key)
          const done = getTodayCheckIns().length > 0
          pushNotification({
            title: slot.label,
            body: done
              ? 'Optional update — how has prep felt since your last check-in?'
              : 'Time for your 2-minute voice wellness check-in. Hold to speak — no typing needed.',
            type: 'check-in',
            action: 'voice-check-in',
          })

          if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
            new Notification('MindFlow — ' + slot.label, {
              body: 'Tap to open your voice check-in.',
              tag: key,
            })
          }
        }

        const missedKey = `${key}-missed`
        if (
          nowMinutes >= slotMinutes + 120 &&
          getTodayCheckIns().length === 0 &&
          lastScheduledSlot !== missedKey
        ) {
          setLastScheduledSlot(missedKey)
          incrementMissed()
        }
      }
    }

    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [
    preferences,
    lastScheduledSlot,
    setLastScheduledSlot,
    pushNotification,
    incrementMissed,
    getTodayCheckIns,
  ])

  useEffect(() => {
    if (
      typeof Notification !== 'undefined' &&
      Notification.permission === 'default' &&
      preferences.dailyReminders
    ) {
      void Notification.requestPermission()
    }
  }, [preferences.dailyReminders])
}
