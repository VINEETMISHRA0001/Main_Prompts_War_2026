import { describe, it, expect, beforeEach } from 'vitest'
import { useDesktopStore } from '@/store/slices/desktopSlice'

describe('desktopSlice', () => {
  beforeEach(() => {
    useDesktopStore.setState({
      openWindows: [],
      focusedAppId: null,
      nextZIndex: 10,
    })
  })

  it('opens an app window', () => {
    useDesktopStore.getState().openApp('mood-check')
    const state = useDesktopStore.getState()
    expect(state.openWindows).toHaveLength(1)
    expect(state.openWindows[0]?.appId).toBe('mood-check')
    expect(state.focusedAppId).toBe('mood-check')
  })

  it('focuses existing window instead of duplicating', () => {
    useDesktopStore.getState().openApp('mood-check')
    useDesktopStore.getState().openApp('wellness-hub')
    useDesktopStore.getState().openApp('mood-check')
    expect(useDesktopStore.getState().openWindows).toHaveLength(2)
    expect(useDesktopStore.getState().focusedAppId).toBe('mood-check')
  })

  it('closes a window', () => {
    useDesktopStore.getState().openApp('reflection')
    useDesktopStore.getState().closeApp('reflection')
    expect(useDesktopStore.getState().openWindows).toHaveLength(0)
  })

  it('pushes console lines', () => {
    const before = useDesktopStore.getState().consoleLines.length
    useDesktopStore.getState().pushConsoleLine('success', 'Test line')
    expect(useDesktopStore.getState().consoleLines.length).toBe(before + 1)
  })
})
