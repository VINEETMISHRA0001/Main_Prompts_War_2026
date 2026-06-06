import type { ProsodyScores, RiskTier, SageSource, VoiceCheckIn } from '@/types'
import { classifyTranscript } from '@/services/safetyClassifier'
import { useMoodStore } from '@/store/slices/moodSlice'
import { useHabitStore } from '@/store/slices/habitSlice'
import { useDashboardStore } from '@/store/slices/dashboardSlice'
import { getAverageMoodScore } from '@/utils/moodScore'

const MOCK_TRANSCRIPTS = [
  "I feel overwhelmed, nothing is sticking from today's revision. I'm scared about my rank.",
  "Studied ten hours but I can't remember anything. My parents expect too much from me.",
  "I'm exhausted and haven't slept properly in days. The syllabus backlog keeps growing.",
  "Mock test went badly again. I feel calm but tired — just need a reset before tomorrow.",
  "I'm motivated today, finished two chapters, but still nervous about the final exam.",
]

function mockProsody(durationMs: number, agitationBoost = 0): ProsodyScores {
  const short = durationMs < 8000
  const energy = short ? 35 : 55 + Math.floor(Math.random() * 25)
  const agitation = Math.min(95, 30 + agitationBoost + (short ? 20 : 10))
  return {
    pitchVariance: 40 + Math.floor(Math.random() * 40),
    energyLevel: energy,
    speechRate: short ? 72 : 58,
    agitationScore: agitation,
    summary:
      agitation > 60
        ? 'Elevated stress · flat energy detected in tone'
        : energy > 65
          ? 'Stable pitch · moderate energy'
          : 'Low energy · slower speech pattern',
  }
}

function pickMockTranscript(durationMs: number): string {
  const idx = Math.floor((durationMs / 1000 + Date.now()) % MOCK_TRANSCRIPTS.length)
  return MOCK_TRANSCRIPTS[idx] ?? MOCK_TRANSCRIPTS[0]!
}

export function buildWellnessSources(): SageSource[] {
  const entries = useMoodStore.getState().entries
  const moodScore = getAverageMoodScore(entries.slice(0, 7))
  const weekRate = useHabitStore.getState().getWeekCompletionRate()
  const exam = useDashboardStore.getState().preferences.examFocus

  return [
    { id: 1, label: 'Mood trend', detail: `7-day avg mood ${moodScore}%` },
    { id: 2, label: 'Habit streak', detail: `${weekRate}% habits completed this week` },
    { id: 3, label: 'Exam focus', detail: `${exam} prep context` },
  ]
}

export async function analyzeVoiceRecording(
  durationMs: number,
  source: VoiceCheckIn['source'] = 'manual',
): Promise<VoiceCheckIn> {
  await delay(1200 + Math.min(durationMs, 3000))

  const transcript = pickMockTranscript(durationMs)
  const safety = classifyTranscript(transcript)
  const agitationBoost = safety.riskTier === 'critical' ? 40 : safety.riskTier === 'red' ? 25 : 0
  const prosody = mockProsody(durationMs, agitationBoost)

  if (safety.riskTier === 'amber' || safety.riskTier === 'red') {
    prosody.agitationScore = Math.max(prosody.agitationScore, 55)
  }

  return {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    transcript,
    prosody,
    riskTier: safety.riskTier,
    distressScore: safety.distressScore,
    durationMs,
    source,
  }
}

export function generateSageAnswer(
  query: string,
  riskTier: RiskTier,
  _sources: SageSource[],
  prosody?: ProsodyScores,
): string {
  const exam = useDashboardStore.getState().preferences.examFocus

  if (riskTier === 'critical' || riskTier === 'red') {
    return `I hear how much pain you're carrying during ${exam} prep. What you shared matters, and you don't have to face this alone. I've flagged this check-in for your guardian (summary only) because your safety comes first. Please reach out to someone you trust tonight, or call a crisis helpline listed below. A 15-minute pause and one small act of self-care still counts as progress.`
  }

  if (riskTier === 'amber') {
    return `It sounds like cognitive overload after long study blocks — your mood data shows strain this week [1]. Your voice tone suggests ${prosody?.summary ?? 'elevated stress'}. Try a 15-minute break: step away from your desk, hydrate, and do one breathing cycle before the next block. Rest protects memory during rank season.`
  }

  if (/sleep|rest|tired/i.test(query)) {
    return `Sleep debt compounds during ${exam} prep. Your habit data shows room to improve sleep consistency [2]. Wind down screens 45 minutes before bed, write tomorrow's top 3 tasks, and aim for 7 hours. Your brain consolidates syllabus during sleep — it's part of preparation, not laziness.`
  }

  return `Based on your recent wellness logs, you're showing up consistently during ${exam} prep [1][2]. ${query.includes('?') ? "Here's a focused next step:" : 'For what you shared:'} break your next session into one 25-minute block on a single topic, then reward yourself with a 5-minute walk. Consistency beats marathon cramming for long-term rank improvement.`
}

export function getFollowUps(riskTier: RiskTier): string[] {
  if (riskTier === 'critical' || riskTier === 'red') {
    return ['Show crisis helplines', 'I need to talk to someone now']
  }
  return [
    'What should I do in the next 15 minutes?',
    'Log a lighter plan for tomorrow',
    'Start a breathing exercise',
  ]
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Demo: analyze chip query as if voice was spoken */
export async function analyzeTextQuery(text: string): Promise<VoiceCheckIn> {
  await delay(800)
  const safety = classifyTranscript(text)
  const prosody = mockProsody(text.length * 40, safety.riskTier === 'red' ? 30 : 0)
  return {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    transcript: text,
    prosody,
    riskTier: safety.riskTier,
    distressScore: safety.distressScore,
    durationMs: text.length * 40,
    source: 'sage-ai',
  }
}

export function streamText(
  fullText: string,
  onChunk: (partial: string) => void,
  intervalMs = 28,
): () => void {
  let i = 0
  const id = setInterval(() => {
    i += 2
    onChunk(fullText.slice(0, i))
    if (i >= fullText.length) clearInterval(id)
  }, intervalMs)
  return () => clearInterval(id)
}
