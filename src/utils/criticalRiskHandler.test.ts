import { describe, it, expect, beforeEach } from 'vitest'
import { handleCriticalVoiceRisk } from '@/utils/criticalRiskHandler'
import { useNotificationStore } from '@/store/slices/notificationSlice'
import type { VoiceCheckIn } from '@/types'

const base: VoiceCheckIn = {
  id: '1',
  timestamp: new Date().toISOString(),
  transcript: 'test',
  prosody: {
    pitchVariance: 50,
    energyLevel: 50,
    speechRate: 50,
    agitationScore: 50,
    summary: 'neutral',
  },
  riskTier: 'green',
  distressScore: 10,
  durationMs: 3000,
  source: 'manual',
}

describe('criticalRiskHandler', () => {
  beforeEach(() => {
    useNotificationStore.setState({
      crisisModalOpen: false,
      notifications: [],
    })
  })

  it('opens crisis modal for red tier', () => {
    handleCriticalVoiceRisk({ ...base, riskTier: 'red' }, null)
    expect(useNotificationStore.getState().crisisModalOpen).toBe(true)
  })

  it('pushes guardian notification when alert sent', () => {
    handleCriticalVoiceRisk(
      { ...base, riskTier: 'critical' },
      {
        id: 'a1',
        checkInId: '1',
        tier: 'critical',
        reason: 'test',
        guardianNotified: true,
        createdAt: new Date().toISOString(),
      },
    )
    expect(useNotificationStore.getState().notifications.some((n) => n.title.includes('Guardian'))).toBe(
      true,
    )
  })

  it('ignores green tier', () => {
    handleCriticalVoiceRisk(base, null)
    expect(useNotificationStore.getState().crisisModalOpen).toBe(false)
  })
})
