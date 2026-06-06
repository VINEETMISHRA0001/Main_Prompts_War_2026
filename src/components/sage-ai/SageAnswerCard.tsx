import { motion } from 'framer-motion'
import type { ProsodyScores, RiskTier, SageSource } from '@/types'
import { SageSourcePills } from '@/components/sage-ai/SageSourcePills'
import { SageFollowUpChips } from '@/components/sage-ai/SageFollowUpChips'
import { cn } from '@/utils/cn'

interface SageAnswerCardProps {
  role: 'user' | 'sage'
  content: string
  isStreaming?: boolean
  sources?: SageSource[]
  prosody?: ProsodyScores
  riskTier?: RiskTier
  isVoice?: boolean
  followUps?: string[]
  onFollowUp?: (text: string) => void
  followUpsDisabled?: boolean
}

const TIER_STYLES: Record<RiskTier, string> = {
  green: 'border-border',
  amber: 'border-warning/40',
  red: 'border-destructive/50',
  critical: 'border-destructive bg-destructive/5',
}

export function SageAnswerCard({
  role,
  content,
  isStreaming,
  sources,
  prosody,
  riskTier,
  isVoice,
  followUps,
  onFollowUp,
  followUpsDisabled,
}: SageAnswerCardProps) {
  const isSage = role === 'sage'

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'rounded-xl border p-4',
        isSage ? cn('bg-surface', riskTier && TIER_STYLES[riskTier]) : 'bg-card/50',
      )}
    >
      <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">{isSage ? '🌿 Sage' : 'You'}</span>
        {isVoice && <span>· voice</span>}
        {riskTier && isSage && (
          <span
            className={cn(
              'capitalize ml-auto',
              riskTier === 'green' && 'text-primary',
              riskTier === 'amber' && 'text-warning',
              (riskTier === 'red' || riskTier === 'critical') && 'text-destructive',
            )}
          >
            {riskTier} tier
          </span>
        )}
      </div>
      <p className="text-sm leading-relaxed whitespace-pre-wrap">
        {content}
        {isStreaming && <span className="inline-block w-1.5 h-4 bg-primary ml-0.5 animate-pulse" />}
      </p>
      {prosody && isSage && (
        <p className="text-xs text-muted-foreground mt-2">
          Tone analysis: {prosody.summary}
        </p>
      )}
      {sources && isSage && <SageSourcePills sources={sources} />}
      {followUps && onFollowUp && isSage && !isStreaming && (
        <SageFollowUpChips items={followUps} onSelect={onFollowUp} disabled={followUpsDisabled} />
      )}
    </motion.div>
  )
}
