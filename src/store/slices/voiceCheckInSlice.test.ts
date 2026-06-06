import { describe, it, expect, beforeEach } from 'vitest'
import { useGuardianStore } from '@/store/slices/guardianSlice'
import { useVoiceCheckInStore } from '@/store/slices/voiceCheckInSlice'
import type { VoiceCheckIn } from '@/types'

const criticalCheckIn: VoiceCheckIn = {
  id: 'c1',
  timestamp: new Date().toISOString(),
  transcript: "I don't want to live anymore",
  prosody: {
    pitchVariance: 80,
    energyLevel: 20,
    speechRate: 70,
    agitationScore: 85,
    summary: 'High distress',
  },
  riskTier: 'critical',
  distressScore: 90,
  durationMs: 5000,
  source: 'manual',
}

describe('voiceCheckInSlice', () => {
  beforeEach(() => {
    useVoiceCheckInStore.setState({ checkIns: [], alerts: [] })
    useGuardianStore.setState({
      guardian: {
        name: 'Parent',
        phone: '+919999999999',
        email: 'parent@test.com',
        relationship: 'Parent',
        consentSigned: true,
        consentSignedAt: new Date().toISOString(),
        notifyOnRed: true,
        shareSummaryOnly: true,
      },
      alertHistory: [],
    })
  })

  it('stores check-in and creates alert for critical tier', () => {
    const alert = useVoiceCheckInStore.getState().addCheckIn(criticalCheckIn)
    expect(useVoiceCheckInStore.getState().checkIns).toHaveLength(1)
    expect(alert).not.toBeNull()
    expect(alert?.guardianNotified).toBe(true)
    expect(useGuardianStore.getState().alertHistory.length).toBeGreaterThan(0)
  })

  it('does not notify guardian without consent', () => {
    useGuardianStore.getState().updateGuardian({ consentSigned: false, phone: '+91111' })
    const alert = useVoiceCheckInStore.getState().addCheckIn(criticalCheckIn)
    expect(alert?.guardianNotified).toBe(false)
  })

  it('returns green tier check-ins without alert', () => {
    const green: VoiceCheckIn = { ...criticalCheckIn, riskTier: 'green', id: 'g1' }
    const alert = useVoiceCheckInStore.getState().addCheckIn(green)
    expect(alert).toBeNull()
  })
})

describe('guardianSlice', () => {
  beforeEach(() => {
    useGuardianStore.setState({
      guardian: {
        name: '',
        phone: '',
        email: '',
        relationship: 'Parent / Guardian',
        consentSigned: false,
        consentSignedAt: null,
        notifyOnRed: true,
        shareSummaryOnly: true,
      },
      alertHistory: [],
    })
  })

  it('signs consent with timestamp', () => {
    useGuardianStore.getState().signConsent()
    const g = useGuardianStore.getState().guardian
    expect(g.consentSigned).toBe(true)
    expect(g.consentSignedAt).toBeTruthy()
  })
})
