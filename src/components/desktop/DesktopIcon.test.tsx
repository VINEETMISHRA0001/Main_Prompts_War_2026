import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DesktopIcon } from '@/components/desktop/DesktopIcon'
import { DESKTOP_APPS } from '@/constants/desktopApps'

describe('DesktopIcon', () => {
  it('renders app label and calls onOpen when clicked', () => {
    const onOpen = vi.fn()
    const app = DESKTOP_APPS.find((a) => a.id === 'mood-check')!
    render(<DesktopIcon app={app} onOpen={onOpen} />)
    expect(screen.getByLabelText(/Mood Check-in/i)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button'))
    expect(onOpen).toHaveBeenCalledOnce()
  })
})
