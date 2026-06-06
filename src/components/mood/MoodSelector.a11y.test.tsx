import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import { MoodSelector } from '@/components/mood/MoodSelector'

describe('MoodSelector accessibility', () => {
  it('has no axe violations', async () => {
    const { container } = render(
      <MoodSelector selected={null} onSelect={() => undefined} />,
    )
    const results = await axe(container)
    expect(results.violations).toHaveLength(0)
  })

  it('exposes radiogroup semantics', () => {
    const { getByRole } = render(
      <MoodSelector selected="calm" onSelect={() => undefined} />,
    )
    expect(getByRole('radiogroup', { name: /select your mood/i })).toBeInTheDocument()
    expect(getByRole('radio', { name: 'Calm' })).toHaveAttribute('aria-checked', 'true')
  })
})
