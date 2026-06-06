import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatCard } from '@/components/StatCard'
import { Heart } from 'lucide-react'

describe('StatCard', () => {
  it('renders title and value with accessible label', () => {
    render(<StatCard title="Mood Score" value={72} suffix="%" icon={Heart} />)
    expect(screen.getByLabelText('Mood Score: 72%')).toBeInTheDocument()
    expect(screen.getByText('Mood Score')).toBeInTheDocument()
    expect(screen.getByText('72%')).toBeInTheDocument()
  })

  it('renders hint when provided', () => {
    render(
      <StatCard
        title="Stress Level"
        value={40}
        suffix="%"
        icon={Heart}
        hint="From exam triggers"
      />,
    )
    expect(screen.getByText('From exam triggers')).toBeInTheDocument()
  })
})
