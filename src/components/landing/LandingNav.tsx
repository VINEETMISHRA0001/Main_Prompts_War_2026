import { Link } from 'react-router-dom'
import { Leaf } from 'lucide-react'
import { APP_NAME, ROUTES } from '@/constants/routes'

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-border/50">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4"
        aria-label="Main navigation"
      >
        <Link to={ROUTES.HOME} className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-primary" aria-hidden />
          <span className="font-bold text-lg gradient-text">{APP_NAME}</span>
        </Link>
        <div className="flex items-center gap-4">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground hidden sm:inline">
            Features
          </a>
          <a href="#faq-heading" className="text-sm text-muted-foreground hover:text-foreground hidden sm:inline">
            FAQ
          </a>
          <Link
            to={ROUTES.DASHBOARD}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Open App
          </Link>
        </div>
      </nav>
    </header>
  )
}

export function LandingFooter() {
  return (
    <footer className="border-t border-border py-8 px-4" role="contentinfo">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-primary" aria-hidden />
          <span className="font-medium">{APP_NAME}</span>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} MindFlow. Built with care for students.
        </p>
      </div>
    </footer>
  )
}
