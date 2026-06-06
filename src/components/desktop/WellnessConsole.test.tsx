import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { WellnessConsole } from '@/components/desktop/WellnessConsole'

describe('WellnessConsole', () => {
  it('renders console input and accepts commands', () => {
    render(<WellnessConsole />)
    const input = screen.getByLabelText(/Console command input/i)
    expect(input).toBeInTheDocument()
    fireEvent.change(input, { target: { value: 'help' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(screen.getByText(/Available commands/i)).toBeInTheDocument()
  })

  it('toggles console visibility', () => {
    render(<WellnessConsole />)
    const toggle = screen.getByRole('button', { name: /Sage Console/i })
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })
})
