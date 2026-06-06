import { cn } from '@/utils/cn'
import { DESKTOP_APPS } from '@/constants/desktopApps'
import type { DesktopAppId } from '@/constants/desktopApps'
import { useDashboardStore } from '@/store/slices/dashboardSlice'
import { useDesktopStore } from '@/store/slices/desktopSlice'
import { Leaf } from 'lucide-react'

export function Taskbar() {
  const openWindows = useDesktopStore((s) => s.openWindows)
  const focusedAppId = useDesktopStore((s) => s.focusedAppId)
  const openApp = useDesktopStore((s) => s.openApp)
  const focusApp = useDesktopStore((s) => s.focusApp)
  const xp = useDashboardStore((s) => s.xp)
  const level = useDashboardStore((s) => s.level)
  const streak = useDashboardStore((s) => s.profile.streak)
  const exam = useDashboardStore((s) => s.preferences.examFocus)

  const time = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <footer
      className="h-12 flex items-center gap-2 px-3 bg-[#0f0f0f]/95 backdrop-blur-xl border-t border-border shrink-0"
      role="toolbar"
      aria-label="Taskbar"
    >
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/15 text-primary text-sm font-display font-bold hover:bg-primary/25"
        onClick={() => openApp('wellness-hub')}
      >
        <Leaf className="h-4 w-4" aria-hidden />
        MindFlow OS
      </button>

      <div className="flex gap-1 overflow-x-auto flex-1">
        {openWindows.map((w) => {
          const app = DESKTOP_APPS.find((a) => a.id === w.appId)!
          return (
            <button
              key={w.appId}
              type="button"
              onClick={() => focusApp(w.appId)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-colors',
                focusedAppId === w.appId
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'bg-white/5 text-secondary-muted hover:bg-white/10',
                w.isMinimized && 'opacity-50',
              )}
              aria-pressed={focusedAppId === w.appId}
            >
              <span aria-hidden>{app.icon}</span>
              {app.label}
            </button>
          )
        })}
      </div>

      <div className="hidden sm:flex items-center gap-3 text-xs text-secondary-muted shrink-0">
        <span className="text-primary font-bold">Lv.{level}</span>
        <span>{xp} XP</span>
        <span>🔥 {streak}d</span>
        <span className="text-secondary-muted">{exam}</span>
        <time dateTime={new Date().toISOString()}>{time}</time>
      </div>
    </footer>
  )
}

export function openDesktopApp(appId: DesktopAppId) {
  useDesktopStore.getState().openApp(appId)
}
