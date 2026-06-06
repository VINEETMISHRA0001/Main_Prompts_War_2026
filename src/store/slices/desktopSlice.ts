import { create } from 'zustand'
import type { DesktopAppId } from '@/constants/desktopApps'
import { DESKTOP_APP_MAP } from '@/constants/desktopApps'

export interface DesktopWindowState {
  appId: DesktopAppId
  isMinimized: boolean
  zIndex: number
  position: { x: number; y: number }
  size: { width: number; height: number }
}

export interface ConsoleLine {
  id: string
  type: 'system' | 'success' | 'info' | 'sage' | 'error'
  text: string
  timestamp: string
}

interface DesktopSlice {
  openWindows: DesktopWindowState[]
  focusedAppId: DesktopAppId | null
  consoleOpen: boolean
  consoleLines: ConsoleLine[]
  nextZIndex: number
  openApp: (appId: DesktopAppId) => void
  closeApp: (appId: DesktopAppId) => void
  focusApp: (appId: DesktopAppId) => void
  toggleMinimize: (appId: DesktopAppId) => void
  toggleConsole: () => void
  pushConsoleLine: (type: ConsoleLine['type'], text: string) => void
  clearConsole: () => void
}

const BOOT_LINES: ConsoleLine[] = [
  {
    id: 'boot-1',
    type: 'system',
    text: 'MindFlow OS v2.0 — Mental Wellness Desktop for Exam Students',
    timestamp: new Date().toISOString(),
  },
  {
    id: 'boot-2',
    type: 'sage',
    text: 'Sage: Welcome back! Double-click an icon or type "help" to begin your wellness session.',
    timestamp: new Date().toISOString(),
  },
]

export const useDesktopStore = create<DesktopSlice>((set, get) => ({
  openWindows: [],
  focusedAppId: null,
  consoleOpen: true,
  consoleLines: BOOT_LINES,
  nextZIndex: 10,

  openApp: (appId) => {
    const state = get()
    const existing = state.openWindows.find((w) => w.appId === appId)
    const config = DESKTOP_APP_MAP[appId]
    const z = state.nextZIndex + 1

    if (existing) {
      set({
        focusedAppId: appId,
        nextZIndex: z,
        openWindows: state.openWindows.map((w) =>
          w.appId === appId ? { ...w, isMinimized: false, zIndex: z } : w,
        ),
      })
    } else {
      set({
        focusedAppId: appId,
        nextZIndex: z,
        openWindows: [
          ...state.openWindows,
          {
            appId,
            isMinimized: false,
            zIndex: z,
            position: config.defaultPosition,
            size: config.defaultSize,
          },
        ],
      })
    }

    get().pushConsoleLine('info', `Opened ${config.label}.app`)
  },

  closeApp: (appId) => {
    const config = DESKTOP_APP_MAP[appId]
    set((s) => ({
      openWindows: s.openWindows.filter((w) => w.appId !== appId),
      focusedAppId: s.focusedAppId === appId ? null : s.focusedAppId,
    }))
    get().pushConsoleLine('system', `Closed ${config.label}.app`)
  },

  focusApp: (appId) => {
    const z = get().nextZIndex + 1
    set((s) => ({
      focusedAppId: appId,
      nextZIndex: z,
      openWindows: s.openWindows.map((w) =>
        w.appId === appId ? { ...w, zIndex: z, isMinimized: false } : w,
      ),
    }))
  },

  toggleMinimize: (appId) => {
    set((s) => ({
      openWindows: s.openWindows.map((w) =>
        w.appId === appId ? { ...w, isMinimized: !w.isMinimized } : w,
      ),
      focusedAppId: s.focusedAppId === appId ? null : s.focusedAppId,
    }))
  },

  toggleConsole: () => set((s) => ({ consoleOpen: !s.consoleOpen })),

  pushConsoleLine: (type, text) => {
    set((s) => ({
      consoleLines: [
        ...s.consoleLines,
        {
          id: crypto.randomUUID(),
          type,
          text,
          timestamp: new Date().toISOString(),
        },
      ].slice(-100),
    }))
  },

  clearConsole: () =>
    set({
      consoleLines: [
        {
          id: crypto.randomUUID(),
          type: 'system',
          text: 'Console cleared. Type "help" for wellness commands.',
          timestamp: new Date().toISOString(),
        },
      ],
    }),
}))
