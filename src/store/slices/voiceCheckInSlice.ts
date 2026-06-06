import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { SafetyAlert, VoiceCheckIn } from '@/types'
import { classifyTranscript } from '@/services/safetyClassifier'
import { useGuardianStore } from '@/store/slices/guardianSlice'

interface VoiceCheckInSlice {
  checkIns: VoiceCheckIn[]
  alerts: SafetyAlert[]
  addCheckIn: (checkIn: VoiceCheckIn) => SafetyAlert | null
  getTodayCheckIns: () => VoiceCheckIn[]
}

export const useVoiceCheckInStore = create<VoiceCheckInSlice>()(
  persist(
    (set, get) => ({
      checkIns: [],
      alerts: [],
      addCheckIn: (checkIn) => {
        set({ checkIns: [checkIn, ...get().checkIns].slice(0, 50) })

        if (checkIn.riskTier !== 'red' && checkIn.riskTier !== 'critical') {
          return null
        }

        const safety = classifyTranscript(checkIn.transcript)
        const guardian = useGuardianStore.getState()
        const notified =
          guardian.guardian.consentSigned &&
          guardian.guardian.notifyOnRed &&
          guardian.guardian.phone.length > 0

        const alert: SafetyAlert = {
          id: crypto.randomUUID(),
          checkInId: checkIn.id,
          tier: checkIn.riskTier,
          reason: safety.reason,
          guardianNotified: notified,
          createdAt: new Date().toISOString(),
        }

        if (notified) {
          guardian.recordAlertSent(alert)
        }

        set({ alerts: [alert, ...get().alerts].slice(0, 30) })
        return alert
      },
      getTodayCheckIns: () => {
        const today = new Date().toISOString().split('T')[0] ?? ''
        return get().checkIns.filter((c) => c.timestamp.startsWith(today))
      },
    }),
    { name: 'mindflow-voice-checkins' },
  ),
)
