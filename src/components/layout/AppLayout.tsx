import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Heart,
  Brain,
  BookOpen,
  Sparkles,
  User,
  Leaf,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/utils/cn'
import { ROUTES, APP_NAME } from '@/constants/routes'
import { Button } from '@/components/ui/button'

const navItems = [
  { to: ROUTES.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
  { to: ROUTES.MOOD, label: 'Mood', icon: Heart },
  { to: ROUTES.STRESS, label: 'Stress', icon: Brain },
  { to: ROUTES.JOURNAL, label: 'Journal', icon: BookOpen },
  { to: ROUTES.TOOLKIT, label: 'Toolkit', icon: Sparkles },
  { to: ROUTES.PROFILE, label: 'Profile', icon: User },
]

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
    >
      Skip to main content
    </a>
  )
}

export function AppSidebar() {
  const location = useLocation()

  return (
    <aside
      className="hidden lg:flex w-64 flex-col border-r border-border/50 glass-strong min-h-screen p-4"
      aria-label="Main navigation"
    >
      <Link to={ROUTES.DASHBOARD} className="flex items-center gap-2 px-2 py-4 mb-4">
        <Leaf className="h-7 w-7 text-primary" aria-hidden />
        <span className="text-xl font-bold gradient-text">{APP_NAME}</span>
      </Link>
      <nav className="flex flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon }) => {
          const active = location.pathname === to
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              )}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
      {open && (
        <nav
          id="mobile-nav"
          className="absolute left-0 right-0 top-16 z-50 glass-strong border-b border-border p-4"
          aria-label="Mobile navigation"
        >
          {navItems.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium',
                  active ? 'bg-primary/10 text-primary' : 'text-muted-foreground',
                )}
                aria-current={active ? 'page' : undefined}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </Link>
            )
          })}
        </nav>
      )}
    </div>
  )
}

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border/50 glass-strong px-4 lg:hidden">
      <Link to={ROUTES.DASHBOARD} className="flex items-center gap-2">
        <Leaf className="h-6 w-6 text-primary" aria-hidden />
        <span className="font-bold gradient-text">{APP_NAME}</span>
      </Link>
      <MobileNav />
    </header>
  )
}
