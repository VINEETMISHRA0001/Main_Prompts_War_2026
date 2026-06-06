import type { SafetyAlert, VoiceCheckIn } from '@/types'
import { useNotificationStore } from '@/store/slices/notificationSlice'

/** Handle red/critical voice check-in: crisis UI + optional guardian notification toast. */
export function handleCriticalVoiceRisk(
  checkIn: VoiceCheckIn,
  alert: SafetyAlert | null,
): void {
  if (checkIn.riskTier !== 'red' && checkIn.riskTier !== 'critical') return

  useNotificationStore.getState().openCrisisModal()

  if (alert?.guardianNotified) {
    useNotificationStore.getState().pushNotification({
      title: 'Guardian notified',
      body: 'A summary alert was sent to your registered guardian.',
      type: 'alert',
    })
  }
}
