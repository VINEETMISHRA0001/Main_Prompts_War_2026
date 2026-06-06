import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { DESKTOP_APPS, type DesktopAppId } from '@/constants/desktopApps'
import { DesktopIcon } from '@/components/desktop/DesktopIcon'
import { DesktopWindow } from '@/components/desktop/DesktopWindow'
import { Taskbar } from '@/components/desktop/Taskbar'
import { WellnessConsole } from '@/components/desktop/WellnessConsole'
import { AchievementToast } from '@/components/dashboard/AchievementToast'
import { useDesktopStore } from '@/store/slices/desktopSlice'
import { useDailyQuests } from '@/store/slices/dashboardSlice'
import { SkipLink } from '@/components/layout/AppLayout'

const ROUTE_APP_MAP: Record<string, DesktopAppId> = {
  dashboard: 'wellness-hub',
  mood: 'mood-check',
  stress: 'exam-pressure',
  journal: 'reflection',
  toolkit: 'toolkit',
  profile: 'progress',
}

export function DesktopShell() {
  const [searchParams] = useSearchParams()
  const openWindows = useDesktopStore((s) => s.openWindows)
  const focusedAppId = useDesktopStore((s) => s.focusedAppId)
  const openApp = useDesktopStore((s) => s.openApp)
  const closeApp = useDesktopStore((s) => s.closeApp)
  const focusApp = useDesktopStore((s) => s.focusApp)
  const toggleMinimize = useDesktopStore((s) => s.toggleMinimize)
  const pushConsoleLine = useDesktopStore((s) => s.pushConsoleLine)
  const { completed, total } = useDailyQuests()

  useEffect(() => {
    const appParam = searchParams.get('app')
    if (appParam && appParam in ROUTE_APP_MAP) {
      openApp(ROUTE_APP_MAP[appParam]!)
    }
  }, [searchParams, openApp])

  useEffect(() => {
    pushConsoleLine(
      'sage',
      `Daily habits: ${completed}/${total} complete. Double-click icons to open wellness apps.`,
    )
  }, []) // eslint-disable-line react-hooks/exhaustive-deps -- boot message once

  return (
    <>
      <SkipLink />
      <AchievementToast />
      <div className="h-screen flex flex-col overflow-hidden bg-background select-none">
        {/* Desktop area */}
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 relative overflow-hidden desktop-wallpaper"
          aria-label="MindFlow wellness desktop"
        >
          {/* Desktop icons grid */}
          <div className="absolute top-4 left-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 gap-2 z-[1] max-w-[280px] sm:max-w-none">
            {DESKTOP_APPS.map((app, i) => (
              <DesktopIcon
                key={app.id}
                app={app}
                onOpen={() => openApp(app.id)}
                style={{ animationDelay: `${i * 50}ms` }}
              />
            ))}
          </div>

          {/* Welcome widget */}
          <div className="absolute top-4 right-4 z-[1] wellness-card p-4 max-w-xs hidden md:block wellness-card-glow">
            <p className="font-display font-bold text-sm text-primary">MindFlow OS</p>
            <p className="text-xs text-secondary-muted mt-1">
              Mental wellness desktop for NEET, JEE, CUET, UPSC & Board Exams
            </p>
            <p className="text-xs text-secondary-muted mt-2">
              🎮 Double-click icons · 💻 Use Sage Console below · 🏆 Complete daily habits
            </p>
          </div>

          {/* Windows */}
          <AnimatePresence>
            {openWindows.map((win) => (
              <DesktopWindow
                key={win.appId}
                window={win}
                isFocused={focusedAppId === win.appId}
                onFocus={() => focusApp(win.appId)}
                onClose={() => closeApp(win.appId)}
                onMinimize={() => toggleMinimize(win.appId)}
              />
            ))}
          </AnimatePresence>
        </main>

        <Taskbar />
        <WellnessConsole />
      </div>
    </>
  )
}
