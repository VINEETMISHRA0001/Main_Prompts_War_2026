import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { Minus, X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { DESKTOP_APP_MAP, DESKTOP_APP_COMPONENTS } from '@/constants/desktopApps'
import type { DesktopWindowState } from '@/store/slices/desktopSlice'
import { LoadingState } from '@/components/LoadingState'

interface DesktopWindowProps {
  window: DesktopWindowState
  isFocused: boolean
  onFocus: () => void
  onClose: () => void
  onMinimize: () => void
}

export function DesktopWindow({
  window: win,
  isFocused,
  onFocus,
  onClose,
  onMinimize,
}: DesktopWindowProps) {
  const config = DESKTOP_APP_MAP[win.appId]
  const AppComponent = DESKTOP_APP_COMPONENTS[win.appId]

  if (win.isMinimized) return null

  return (
    <motion.div
      role="dialog"
      aria-label={config.label}
      aria-modal="false"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      style={{
        zIndex: win.zIndex,
        left: win.position.x,
        top: win.position.y,
        width: win.size.width,
        maxWidth: 'calc(100vw - 2rem)',
      }}
      className={cn(
        'absolute flex flex-col rounded-lg overflow-hidden shadow-2xl border',
        isFocused ? 'border-primary/50 shadow-[0_0_30px_rgba(0,255,148,0.15)]' : 'border-border',
      )}
      onMouseDown={onFocus}
      drag
      dragMomentum={false}
      dragElastic={0}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] border-b border-border shrink-0 cursor-grab active:cursor-grabbing">
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={onClose}
            className="h-3 w-3 rounded-full bg-destructive hover:brightness-110 focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Close ${config.label}`}
          />
          <button
            type="button"
            onClick={onMinimize}
            className="h-3 w-3 rounded-full bg-warning hover:brightness-110 focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`Minimize ${config.label}`}
          />
          <button
            type="button"
            className="h-3 w-3 rounded-full bg-primary hover:brightness-110 opacity-50 cursor-default"
            aria-hidden
          />
        </div>
        <span className="flex-1 text-center text-xs font-medium text-secondary-muted truncate">
          {config.icon} {config.label}.app — MindFlow OS
        </span>
        <div className="flex gap-1 opacity-0 sm:opacity-100">
          <button type="button" onClick={onMinimize} aria-label="Minimize" className="p-0.5 text-secondary-muted hover:text-white">
            <Minus className="h-3 w-3" />
          </button>
          <button type="button" onClick={onClose} aria-label="Close" className="p-0.5 text-secondary-muted hover:text-white">
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div
        className="flex-1 overflow-y-auto bg-card/95 backdrop-blur-sm p-3 sm:p-4 max-h-[min(70vh,520px)]"
        style={{ minHeight: Math.min(win.size.height - 40, 480) }}
      >
        <Suspense fallback={<LoadingState />}>
          <AppComponent embedded />
        </Suspense>
      </div>
    </motion.div>
  )
}
