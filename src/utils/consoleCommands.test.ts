import { describe, it, expect, beforeEach } from 'vitest'
import { executeConsoleCommand } from '@/utils/consoleCommands'
import { useDesktopStore } from '@/store/slices/desktopSlice'

describe('consoleCommands', () => {
  beforeEach(() => {
    useDesktopStore.setState({ openWindows: [], focusedAppId: null, nextZIndex: 10 })
  })

  it('returns help text', () => {
    const result = executeConsoleCommand('help')
    expect(result).toContain('Available commands')
    expect(result).toContain('checkin calm')
  })

  it('opens mood app via command', () => {
    executeConsoleCommand('open mood')
    expect(useDesktopStore.getState().openWindows[0]?.appId).toBe('mood-check')
  })

  it('returns error for unknown command', () => {
    const result = executeConsoleCommand('foobar')
    expect(result).toContain('Unknown command')
  })

  it('returns status string', () => {
    const result = executeConsoleCommand('status')
    expect(result).toMatch(/Level \d+/)
  })
})
