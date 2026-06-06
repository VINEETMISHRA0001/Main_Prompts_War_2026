import { useCallback, useRef, useState } from 'react'
import { Mic } from 'lucide-react'
import { SageModelBadge } from '@/components/sage-ai/SageModelBadge'
import { SageSuggestionChips } from '@/components/sage-ai/SageSuggestionChips'
import { SageAnswerCard } from '@/components/sage-ai/SageAnswerCard'
import { VoiceOrb } from '@/components/voice/VoiceOrb'
import {
  analyzeTextQuery,
  analyzeVoiceRecording,
  buildWellnessSources,
  generateSageAnswer,
  getFollowUps,
  streamText,
} from '@/services/voiceAnalysis'
import { useNotificationStore } from '@/store/slices/notificationSlice'
import { useVoiceCheckInStore } from '@/store/slices/voiceCheckInSlice'
import { handleCriticalVoiceRisk } from '@/utils/criticalRiskHandler'
import { CRISIS_HELPLINES } from '@/constants/sagePrompts'
import type { SageMessage } from '@/types'

interface SageAIHubProps {
  embedded?: boolean
}

export function SageAIHub({ embedded }: SageAIHubProps) {
  const messages = useNotificationStore((s) => s.messages)
  const addSageMessage = useNotificationStore((s) => s.addSageMessage)
  const addCheckIn = useVoiceCheckInStore((s) => s.addCheckIn)

  const [isProcessing, setIsProcessing] = useState(false)
  const [streamingId, setStreamingId] = useState<string | null>(null)
  const [streamingText, setStreamingText] = useState('')
  const [lastFollowUps, setLastFollowUps] = useState<string[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const recordStartRef = useRef(0)
  const streamCleanup = useRef<(() => void) | null>(null)

  const processQuery = useCallback(
    async (transcript: string, isVoice: boolean, durationMs = 3000) => {
      if (isProcessing) return
      streamCleanup.current?.()
      setIsProcessing(true)
      setLastFollowUps([])

      const userMsg: SageMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content: transcript,
        timestamp: new Date().toISOString(),
        isVoice,
      }
      addSageMessage(userMsg)

      const checkIn = isVoice
        ? await analyzeVoiceRecording(durationMs, 'sage-ai')
        : await analyzeTextQuery(transcript)

      if (!isVoice) {
        checkIn.transcript = transcript
      }

      const alert = addCheckIn(checkIn)
      handleCriticalVoiceRisk(checkIn, alert)

      const sources = buildWellnessSources()
      sources.push({
        id: sources.length + 1,
        label: 'Voice prosody',
        detail: checkIn.prosody.summary,
      })

      const answer = generateSageAnswer(
        transcript,
        checkIn.riskTier,
        sources,
        checkIn.prosody,
      )
      const followUps =
        transcript === 'Show crisis helplines'
          ? CRISIS_HELPLINES.map((h) => `${h.name}: ${h.number}`)
          : getFollowUps(checkIn.riskTier)
      setLastFollowUps(followUps)

      const sageId = crypto.randomUUID()
      setStreamingId(sageId)
      setStreamingText('')

      streamCleanup.current = streamText(answer, (partial) => setStreamingText(partial), 24)

      window.setTimeout(() => {
        streamCleanup.current?.()
        const sageMsg: SageMessage = {
          id: sageId,
          role: 'sage',
          content: answer,
          timestamp: new Date().toISOString(),
          sources,
          prosody: checkIn.prosody,
          riskTier: checkIn.riskTier,
        }
        addSageMessage(sageMsg)
        setStreamingId(null)
        setStreamingText('')
        setIsProcessing(false)
      }, answer.length * 14 + 400)
    },
    [addSageMessage, addCheckIn, isProcessing],
  )

  const handleVoiceStart = () => {
    if (isProcessing) return
    recordStartRef.current = Date.now()
    setIsRecording(true)
  }

  const handleVoiceStop = () => {
    if (!isRecording) return
    setIsRecording(false)
    const duration = Math.max(2000, Date.now() - recordStartRef.current)
    void processQuery('Voice check-in response', true, duration)
  }

  const displayMessages = streamingId
    ? messages
    : messages.filter((m) => m.content.length > 0)

  const empty = displayMessages.length === 0 && !streamingId

  return (
    <div
      className={`flex flex-col ${embedded ? 'h-full min-h-[420px]' : 'min-h-[70vh]'} max-w-2xl mx-auto px-1`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="font-display font-bold text-lg">Sage AI</h2>
          <p className="text-xs text-muted-foreground">Perplexity-style wellness intelligence</p>
        </div>
        <SageModelBadge />
      </div>

      {empty && !isProcessing && (
        <div className="flex-1 flex flex-col justify-center py-6 space-y-6">
          <p className="text-center text-muted-foreground text-sm">
            How can I support your exam prep today?
          </p>
          <div className="flex justify-center">
            <VoiceOrb
              isRecording={isRecording}
              onStart={handleVoiceStart}
              onStop={handleVoiceStop}
              disabled={isProcessing}
              size="md"
            />
          </div>
          <SageSuggestionChips onSelect={(t) => void processQuery(t, false)} disabled={isProcessing} />
        </div>
      )}

      {!empty && (
        <div
          className="flex-1 overflow-y-auto space-y-4 pb-4"
          aria-live="polite"
          aria-relevant="additions"
          aria-label="Sage conversation"
        >
          {displayMessages.map((msg, idx) => {
            const isLast = idx === displayMessages.length - 1 && !streamingId
            return (
              <SageAnswerCard
                key={msg.id}
                role={msg.role}
                content={msg.content}
                sources={msg.sources}
                prosody={msg.prosody}
                riskTier={msg.riskTier}
                isVoice={msg.isVoice}
                followUps={isLast && msg.role === 'sage' ? lastFollowUps : undefined}
                onFollowUp={(t) => void processQuery(t, false)}
                followUpsDisabled={isProcessing}
              />
            )
          })}
          {streamingId && (
            <SageAnswerCard
              role="sage"
              content={streamingText}
              isStreaming
            />
          )}
        </div>
      )}

      {!empty && (
        <div className="border-t border-border pt-4 mt-auto">
          <div className="flex justify-center">
            <VoiceOrb
              isRecording={isRecording}
              onStart={handleVoiceStart}
              onStop={handleVoiceStop}
              disabled={isProcessing}
              size="md"
            />
          </div>
          <p className="text-[10px] text-center text-muted-foreground mt-2 flex items-center justify-center gap-1">
            <Mic className="h-3 w-3" aria-hidden />
            Voice-first · Safety filter · Guardian alert on critical risk
          </p>
        </div>
      )}
    </div>
  )
}
