import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('MindFlow error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background">
          <div className="wellness-card max-w-md p-8 text-center">
            <span className="text-4xl mb-4 block" aria-hidden>🌿</span>
            <h1 className="font-display text-xl font-bold mb-2">Something went wrong</h1>
            <p className="text-secondary-muted text-sm mb-6">
              Take a breath. Reload the page to continue tracking your wellness.
            </p>
            <Button onClick={() => window.location.reload()}>Reload MindFlow</Button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
