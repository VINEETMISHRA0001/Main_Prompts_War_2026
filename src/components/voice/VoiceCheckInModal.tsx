import { useRef, useState, useCallback } from 'react'
import { Loader2 } from 'lucide-react'
import { VoiceOrb } from '@/components/voice/VoiceOrb'
import { CRISIS_HELPLINES } from '@/constants/sagePrompts'
import { analyzeVoiceRecording } from '@/services/voiceAnalysis'
import { useVoiceCheckInStore } from '@/store/slices/voiceCheckInSlice'
import { useNotificationStore } from '@/store/slices/notificationSlice'
import { useDashboardStore } from '@/store/slices/dashboardSlice'
import { handleCriticalVoiceRisk } from '@/utils/criticalRiskHandler'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/utils/cn'

export function VoiceCheckInModal() {
  const open = useNotificationStore((s) => s.voiceModalOpen)
  const source = useNotificationStore((s) => s.voiceModalSource)
  const closeVoiceModal = useNotificationStore((s) => s.closeVoiceModal)
  const addCheckIn = useVoiceCheckInStore((s) => s.addCheckIn)
  const recordMoodCheckIn = useDashboardStore((s) => s.recordMoodCheckIn)

  const [isRecording, setIsRecording] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<Awaited<ReturnType<typeof analyzeVoiceRecording>> | null>(
    null,
  )
  const startTime = useRef(0)
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const chunks = useRef<Blob[]>([])

  const reset = useCallback(() => {
    setResult(null)
    setIsAnalyzing(false)
    setIsRecording(false)
    chunks.current = []
  }, [])

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      reset()
      closeVoiceModal()
    }
  }

  const startRecording = async () => {
    if (isAnalyzing) return
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      chunks.current = []
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.current.push(e.data)
      }
      recorder.onstop = () => stream.getTracks().forEach((t) => t.stop())
      mediaRecorder.current = recorder
      startTime.current = Date.now()
      recorder.start()
      setIsRecording(true)
      setResult(null)
    } catch {
      useNotificationStore.getState().pushNotification({
        title: 'Microphone access needed',
        body: 'Allow mic access for voice check-ins, or use Sage AI suggestion chips.',
        type: 'info',
      })
    }
  }

  const stopRecording = async () => {
    if (!isRecording || !mediaRecorder.current) return
    setIsRecording(false)
    mediaRecorder.current.stop()
    const durationMs = Math.max(2000, Date.now() - startTime.current)
    setIsAnalyzing(true)

    try {
      const checkIn = await analyzeVoiceRecording(durationMs, source)
      setResult(checkIn)
      const alert = addCheckIn(checkIn)
      recordMoodCheckIn()
      handleCriticalVoiceRisk(checkIn, alert)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-w-md border-border bg-card"
        aria-describedby="voice-checkin-desc"
      >
        <DialogHeader>
          <DialogTitle id="voice-checkin-title">Voice Check-in</DialogTitle>
          <p id="voice-checkin-desc" className="text-xs text-muted-foreground text-center">
            {source === 'scheduled'
              ? 'Scheduled wellness check-in — speak freely, no typing needed'
              : 'Share how prep feels today using your voice only'}
          </p>
        </DialogHeader>

        {isAnalyzing ? (
          <div className="flex flex-col items-center gap-3 py-8" role="status" aria-live="polite">
            <Loader2 className="h-10 w-10 text-primary animate-spin" aria-hidden />
            <p className="text-sm text-muted-foreground">Analyzing speech, tone & safety…</p>
          </div>
        ) : result ? (
          <div className="space-y-4">
            <div
              className={cn(
                'rounded-lg border p-3 text-sm',
                result.riskTier === 'critical' || result.riskTier === 'red'
                  ? 'border-destructive/50 bg-destructive/5'
                  : 'border-border bg-surface',
              )}
            >
              <p className="text-xs text-muted-foreground mb-1">Transcript</p>
              <p className="italic">&ldquo;{result.transcript}&rdquo;</p>
              <p className="text-xs mt-2 text-muted-foreground">{result.prosody.summary}</p>
              <p className="text-xs mt-1 capitalize">
                Risk: <span className="font-medium">{result.riskTier}</span>
              </p>
            </div>
            {(result.riskTier === 'red' || result.riskTier === 'critical') && (
              <div className="text-xs space-y-1">
                <p className="font-medium text-destructive">Crisis support</p>
                {CRISIS_HELPLINES.map((h) => (
                  <p key={h.number}>
                    {h.name}: {h.number}
                  </p>
                ))}
              </div>
            )}
            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              className="w-full rounded-lg bg-primary text-primary-foreground py-2 text-sm font-medium"
            >
              Done
            </button>
          </div>
        ) : (
          <VoiceOrb
            isRecording={isRecording}
            onStart={startRecording}
            onStop={stopRecording}
          />
        )}

        <p className="text-[10px] text-muted-foreground text-center">
          Sage analyzes voice for wellness only — not emergency services. Critical risk may alert
          your guardian (summary only).
        </p>
      </DialogContent>
    </Dialog>
  )
}
