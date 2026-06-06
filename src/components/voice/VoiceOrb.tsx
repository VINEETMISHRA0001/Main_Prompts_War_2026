import { motion } from 'framer-motion'
import { Mic, Square } from 'lucide-react'
import { cn } from '@/utils/cn'

interface VoiceOrbProps {
  isRecording: boolean
  onStart: () => void
  onStop: () => void
  disabled?: boolean
  size?: 'md' | 'lg'
}

export function VoiceOrb({ isRecording, onStart, onStop, disabled, size = 'lg' }: VoiceOrbProps) {
  const dim = size === 'lg' ? 'h-24 w-24' : 'h-16 w-16'
  const icon = size === 'lg' ? 'h-8 w-8' : 'h-5 w-5'

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      if (!isRecording) onStart()
    }
  }

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (disabled) return
    if ((e.key === ' ' || e.key === 'Enter') && isRecording) {
      e.preventDefault()
      onStop()
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.button
        type="button"
        disabled={disabled}
        onMouseDown={onStart}
        onMouseUp={onStop}
        onMouseLeave={isRecording ? onStop : undefined}
        onTouchStart={(e) => {
          e.preventDefault()
          onStart()
        }}
        onTouchEnd={(e) => {
          e.preventDefault()
          onStop()
        }}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        className={cn(
          'rounded-full flex items-center justify-center border-2 transition-all disabled:opacity-50',
          dim,
          isRecording
            ? 'border-destructive bg-destructive/10 scale-105'
            : 'border-primary bg-primary/10 hover:bg-primary/20',
        )}
        aria-label={
          isRecording
            ? 'Recording. Release Space or Enter to finish.'
            : 'Hold Space or Enter to speak. Voice only, no typing.'
        }
        aria-pressed={isRecording}
      >
        {isRecording ? (
          <Square className={cn(icon, 'text-destructive')} aria-hidden />
        ) : (
          <Mic className={cn(icon, 'text-primary')} aria-hidden />
        )}
      </motion.button>
      <p className="text-sm text-muted-foreground text-center">
        {isRecording ? 'Recording… release to analyze' : 'Hold to speak or use Space / Enter'}
      </p>
      {isRecording && (
        <motion.div
          className="flex gap-1 h-8 items-end"
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.span
              key={i}
              className="w-1 bg-primary rounded-full"
              animate={{ height: [8, 24, 12, 28, 8] }}
              transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
            />
          ))}
        </motion.div>
      )}
    </div>
  )
}
