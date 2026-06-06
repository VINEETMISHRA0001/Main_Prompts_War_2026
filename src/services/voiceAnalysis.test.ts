import { describe, it, expect } from 'vitest'
import { generateSageAnswer, getFollowUps, analyzeTextQuery } from '@/services/voiceAnalysis'

describe('voiceAnalysis', () => {
  it('generates crisis-aware answer for red tier', () => {
    const answer = generateSageAnswer('I feel hopeless', 'red', [], undefined)
    expect(answer.toLowerCase()).toContain('guardian')
  })

  it('returns crisis follow-ups for red tier', () => {
    const followUps = getFollowUps('critical')
    expect(followUps.some((f) => f.toLowerCase().includes('helpline'))).toBe(true)
  })

  it('analyzes text query with safety tier', async () => {
    const result = await analyzeTextQuery('I feel overwhelmed by NEET prep')
    expect(result.transcript).toContain('overwhelmed')
    expect(['green', 'amber', 'red', 'critical']).toContain(result.riskTier)
  })
})
