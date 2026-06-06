import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { GuardianProfile, SafetyAlert } from '@/types'
import { defaultGuardianProfile } from '@/data/mockProfile'

interface GuardianSlice {
  guardian: GuardianProfile
  alertHistory: { id: string; message: string; sentAt: string }[]
  updateGuardian: (partial: Partial<GuardianProfile>) => void
  signConsent: () => void
  recordAlertSent: (alert: SafetyAlert) => void
}

export const useGuardianStore = create<GuardianSlice>()(
  persist(
    (set, get) => ({
      guardian: defaultGuardianProfile,
      alertHistory: [],
      updateGuardian: (partial) => {
        set({ guardian: { ...get().guardian, ...partial } })
      },
      signConsent: () => {
        set({
          guardian: {
            ...get().guardian,
            consentSigned: true,
            consentSignedAt: new Date().toISOString(),
          },
        })
      },
      recordAlertSent: (alert) => {
        const g = get().guardian
        const summary = g.shareSummaryOnly
          ? `MindFlow: ${g.name ? 'Your ward' : 'Student'} had a flagged wellness check-in (${alert.tier} risk). Please reach out. No transcript shared.`
          : `MindFlow safety alert (${alert.tier}): ${alert.reason}. Please contact your ward.`
        set({
          alertHistory: [
            {
              id: alert.id,
              message: `[Mock SMS/Email to ${g.phone || g.email}] ${summary}`,
              sentAt: alert.createdAt,
            },
            ...get().alertHistory,
          ].slice(0, 20),
        })
      },
    }),
    { name: 'mindflow-guardian' },
  ),
)
