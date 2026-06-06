import { useRef, useEffect, useState, type FormEvent, type KeyboardEvent } from 'react'
import { Terminal, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useDesktopStore } from '@/store/slices/desktopSlice'
import { executeConsoleCommand } from '@/utils/consoleCommands'

const LINE_COLORS = {
  system: 'text-secondary-muted',
  success: 'text-primary',
  info: 'text-accent',
  sage: 'text-secondary',
  error: 'text-destructive',
} as const

export function WellnessConsole() {
  const consoleOpen = useDesktopStore((s) => s.consoleOpen)
  const consoleLines = useDesktopStore((s) => s.consoleLines)
  const toggleConsole = useDesktopStore((s) => s.toggleConsole)
  const pushConsoleLine = useDesktopStore((s) => s.pushConsoleLine)
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [consoleLines])

  const submit = (e?: FormEvent) => {
    e?.preventDefault()
    const cmd = input.trim()
    if (!cmd) return
    pushConsoleLine('system', `> ${cmd}`)
    const result = executeConsoleCommand(cmd)
    if (result) {
      result.split('\n').forEach((line) => pushConsoleLine('info', line))
    }
    setInput('')
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') submit()
  }

  return (
    <div
      className={cn(
        'border-t border-border bg-[#0a0a0a] transition-all duration-300',
        consoleOpen ? 'h-48 sm:h-52' : 'h-10',
      )}
      role="region"
      aria-label="Wellness console"
    >
      <button
        type="button"
        onClick={toggleConsole}
        className="w-full flex items-center gap-2 px-4 py-2 text-xs font-mono text-primary hover:bg-white/5"
        aria-label="Toggle Sage wellness console"
        aria-expanded={consoleOpen}
      >
        <Terminal className="h-4 w-4" aria-hidden />
        <span className="font-display font-semibold">Sage Console</span>
        <span className="text-secondary-muted hidden sm:inline">— type help for commands</span>
        <span className="ml-auto">
          {consoleOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </span>
      </button>

      {consoleOpen && (
        <>
          <div
            ref={scrollRef}
            className="h-[calc(100%-4.5rem)] overflow-y-auto px-4 py-2 font-mono text-xs space-y-1"
            tabIndex={0}
            aria-live="polite"
          >
            {consoleLines.map((line) => (
              <div key={line.id} className={LINE_COLORS[line.type]}>
                {line.type === 'sage' && <span className="text-primary">sage@mindflow:~$ </span>}
                {line.text}
              </div>
            ))}
          </div>
          <form onSubmit={submit} className="flex items-center gap-2 px-4 py-2 border-t border-border">
            <span className="text-primary font-mono text-sm" aria-hidden>&gt;</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="help | open mood | checkin calm | status | quest"
              className="flex-1 bg-transparent border-none outline-none font-mono text-sm text-foreground placeholder:text-secondary-muted"
              aria-label="Console command input"
            />
          </form>
        </>
      )}
    </div>
  )
}
