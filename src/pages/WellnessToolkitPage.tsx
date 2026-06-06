import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { mockToolkitItems } from '@/data/mockProfile'
import { PageHeader } from '@/components/PageHeader'
import { useDashboardStore } from '@/store/slices/dashboardSlice'
import type { ToolkitItem } from '@/types'

function ToolkitCard({ item }: { item: ToolkitItem }) {
  const [step, setStep] = useState(0)
  const [open, setOpen] = useState(false)
  const completeWellnessQuest = useDashboardStore((s) => s.completeWellnessQuest)

  const resetAndClose = (completed = false) => {
    if (completed) completeWellnessQuest()
    setStep(0)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? setOpen(true) : resetAndClose(false))}>
      <DialogTrigger asChild>
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="text-left w-full"
        >
          <Card className="h-full cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <span className="text-3xl mb-3 block" aria-hidden>{item.icon}</span>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
              <div className="flex items-center gap-1 text-xs text-primary">
                <Clock className="h-3 w-3" aria-hidden />
                {item.duration}
                <ChevronRight className="h-3 w-3 ml-auto" aria-hidden />
              </div>
            </CardContent>
          </Card>
        </motion.button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {item.icon} {item.title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{item.description}</p>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="rounded-lg bg-muted p-4"
            >
              <p className="text-xs text-muted-foreground mb-1">
                Step {step + 1} of {item.steps.length}
              </p>
              <p>{item.steps[step]}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={step === 0}
              onClick={() => setStep((s) => s - 1)}
            >
              Previous
            </Button>
            {step < item.steps.length - 1 ? (
              <Button onClick={() => setStep((s) => s + 1)}>Next Step</Button>
            ) : (
              <Button onClick={() => resetAndClose(true)}>Complete +25 XP</Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function WellnessToolkitPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Wellness Toolkit"
        description="Breathing, focus, and recovery tools designed for high-pressure exam preparation"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockToolkitItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <ToolkitCard item={item} />
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Breathing Exercise</CardTitle>
        </CardHeader>
        <CardContent>
          <BreathingVisualizer />
        </CardContent>
      </Card>
    </div>
  )
}

function BreathingVisualizer() {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale')
  const [active, setActive] = useState(false)
  const completeBreathing = useDashboardStore((s) => s.completeBreathing)

  const startBreathing = () => {
    setActive(true)
    setPhase('inhale')
    setTimeout(() => setPhase('hold'), 4000)
    setTimeout(() => setPhase('exhale'), 7000)
    setTimeout(() => {
      setActive(false)
      setPhase('inhale')
      completeBreathing()
    }, 15000)
  }

  const scale = phase === 'inhale' ? 1.3 : phase === 'hold' ? 1.3 : 1
  const label = phase === 'inhale' ? 'Breathe in...' : phase === 'hold' ? 'Hold...' : 'Breathe out...'

  return (
    <div className="flex flex-col items-center py-8">
      <motion.div
        animate={{ scale: active ? scale : 1 }}
        transition={{ duration: phase === 'exhale' ? 4 : 3, ease: 'easeInOut' }}
        className="h-32 w-32 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 opacity-80 mb-6"
        aria-hidden
      />
      <p className="text-lg font-medium mb-4" aria-live="polite">
        {active ? label : 'Ready to begin?'}
      </p>
      <Button onClick={startBreathing} disabled={active}>
        {active ? 'In progress...' : 'Start 4-7-8 Breathing'}
      </Button>
    </div>
  )
}
