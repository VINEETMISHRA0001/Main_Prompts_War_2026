import type { RiskTier } from '@/types'

const SELF_HARM_PATTERNS = [
  /\b(kill myself|end my life|suicide|don't want to live|want to die|harm myself)\b/i,
  /\b(no reason to live|better off dead)\b/i,
]

const ABUSE_PATTERNS = [
  /\b(hate you|stupid|idiot|worthless|useless)\b/i,
]

const DISTRESS_PATTERNS = [
  /\b(overwhelmed|burned out|can't cope|hopeless|anxious|panic|scared)\b/i,
  /\b(fail|failing|never pass|rank|backlog)\b/i,
]

export interface SafetyResult {
  riskTier: RiskTier
  distressScore: number
  flags: string[]
  reason: string
}

export function classifyTranscript(transcript: string): SafetyResult {
  const flags: string[] = []
  let score = 15

  for (const p of SELF_HARM_PATTERNS) {
    if (p.test(transcript)) {
      flags.push('self-harm')
      score += 55
    }
  }

  for (const p of ABUSE_PATTERNS) {
    if (p.test(transcript)) {
      flags.push('abusive-language')
      score += 20
    }
  }

  for (const p of DISTRESS_PATTERNS) {
    if (p.test(transcript)) {
      flags.push('distress')
      score += 12
    }
  }

  score = Math.min(100, score)

  let riskTier: RiskTier = 'green'
  if (flags.includes('self-harm') || score >= 80) riskTier = 'critical'
  else if (score >= 60 || flags.includes('abusive-language')) riskTier = 'red'
  else if (score >= 35) riskTier = 'amber'

  const reason =
    flags.includes('self-harm')
      ? 'Language suggesting self-harm or threat to life detected'
      : flags.includes('abusive-language')
        ? 'Abusive or harmful language detected'
        : flags.includes('distress')
          ? 'Elevated emotional distress detected'
          : 'Normal wellness range'

  return { riskTier, distressScore: score, flags, reason }
}
