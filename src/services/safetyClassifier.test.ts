import { describe, it, expect } from 'vitest'
import { classifyTranscript } from '@/services/safetyClassifier'

describe('safetyClassifier', () => {
  it('returns green for neutral text', () => {
    const result = classifyTranscript('I finished physics revision and feel okay.')
    expect(result.riskTier).toBe('green')
  })

  it('detects distress keywords', () => {
    const result = classifyTranscript('I feel overwhelmed and anxious about my backlog.')
    expect(['amber', 'red']).toContain(result.riskTier)
  })

  it('escalates self-harm language to critical', () => {
    const result = classifyTranscript("I don't want to live anymore, everything feels hopeless.")
    expect(result.riskTier).toBe('critical')
    expect(result.flags).toContain('self-harm')
  })

  it('flags abusive language', () => {
    const result = classifyTranscript('I hate everyone, they are all stupid and worthless.')
    expect(result.flags).toContain('abusive-language')
  })
})
