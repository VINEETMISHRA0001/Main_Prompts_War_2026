import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import { StatCard } from '@/components/StatCard'
import { Heart } from 'lucide-react'

describe('StatCard accessibility', () => {
  it('has no axe violations', async () => {
    const { container } = render(
      <StatCard title="Mood Score" value={72} suffix="%" icon={Heart} />,
    )
    const results = await axe(container)
    expect(results.violations).toHaveLength(0)
  })
})
