import { cn } from '@/utils/cn'
import type { DesktopAppConfig } from '@/constants/desktopApps'
import { useDailyQuests } from '@/store/slices/dashboardSlice'

interface DesktopIconProps {
  app: DesktopAppConfig
  onOpen: () => void
  style?: React.CSSProperties
}

const QUEST_BADGE: Partial<Record<string, 'mood' | 'wellness' | 'journal'>> = {
  'mood-check': 'mood',
  toolkit: 'wellness',
  reflection: 'journal',
}

export function DesktopIcon({ app, onOpen, style }: DesktopIconProps) {
  const { quests } = useDailyQuests()
  const questKey = QUEST_BADGE[app.id]
  const showBadge = questKey && !quests[questKey]

  return (
    <button
      type="button"
      onClick={onOpen}
      style={style}
      className={cn(
        'group flex flex-col items-center gap-1.5 w-24 p-2 rounded-xl',
        'hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        'transition-colors cursor-pointer select-none',
      )}
      aria-label={`Open ${app.label}. ${app.description}`}
    >
      <div className="relative">
        <span
          className="text-4xl block drop-shadow-[0_0_12px_rgba(0,255,148,0.3)] group-hover:scale-110 transition-transform"
          aria-hidden
        >
          {app.icon}
        </span>
        {showBadge && (
          <span
            className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary animate-pulse"
            aria-label="Quest incomplete"
          />
        )}
      </div>
      <span className="text-[11px] font-medium text-center text-white/90 leading-tight px-1">
        {app.label}
      </span>
    </button>
  )
}
