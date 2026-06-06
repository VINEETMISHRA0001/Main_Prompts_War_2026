import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/PageHeader'
import { useJournalStore } from '@/store/slices/journalSlice'
import { useDashboardStore } from '@/store/slices/dashboardSlice'
import { useWellnessStore } from '@/store/slices/wellnessSlice'
import { MOODS } from '@/constants/moods'
import { MOOD_MAP } from '@/constants/moods'
import { CBT_JOURNAL_PROMPTS } from '@/data/cbtPrompts'
import { formatDate } from '@/utils/formatDate'
import type { MoodType } from '@/types'

const journalSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  content: z.string().min(10, 'Write at least 10 characters').max(2000),
  moodTag: z.enum(['happy', 'calm', 'neutral', 'stressed', 'overwhelmed']).nullable(),
})

type JournalForm = z.infer<typeof journalSchema>

function syncGamification() {
  const journalCount = useJournalStore.getState().entries.length
  const uniqueTriggers = new Set(
    useWellnessStore.getState().triggers.filter((t) => t.count > 0).map((t) => t.category),
  ).size
  useDashboardStore.getState().syncAchievements(journalCount, uniqueTriggers)
}

import type { EmbeddedPageProps } from '@/constants/desktopApps'

export default function ReflectionJournalPage({ embedded }: EmbeddedPageProps = {}) {
  const entries = useJournalStore((s) => s.entries)
  const addEntry = useJournalStore((s) => s.addEntry)
  const deleteEntry = useJournalStore((s) => s.deleteEntry)
  const completeJournalQuest = useDashboardStore((s) => s.completeJournalQuest)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<JournalForm>({
    resolver: zodResolver(journalSchema),
    defaultValues: { title: '', content: '', moodTag: null },
  })

  const selectedMoodTag = watch('moodTag')

  const applyPrompt = (title: string, hint: string) => {
    setValue('title', title)
    setValue('content', hint)
  }

  const onSubmit = (data: JournalForm) => {
    addEntry(data.title, data.content, data.moodTag)
    completeJournalQuest()
    syncGamification()
    reset()
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {!embedded && (
        <PageHeader
          title="Reflection Journal"
          description="What went well today? Process emotions during board exams, entrance tests, and result seasons"
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle>Quick Prompts</CardTitle>
          <p className="text-sm text-muted-foreground">CBT-style starters — no blank page anxiety</p>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {CBT_JOURNAL_PROMPTS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => applyPrompt(p.title, p.hint)}
              className="rounded-full border border-border px-3 py-1.5 text-sm hover:bg-primary/10 hover:border-primary transition-colors"
            >
              {p.title}
            </button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daily Reflection</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="journal-title">Title</Label>
              <Input id="journal-title" {...register('title')} aria-invalid={!!errors.title} />
              {errors.title && (
                <p className="text-sm text-destructive" role="alert">{errors.title.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="journal-content">Your reflection</Label>
              <Textarea
                id="journal-content"
                rows={6}
                {...register('content')}
                aria-invalid={!!errors.content}
              />
              {errors.content && (
                <p className="text-sm text-destructive" role="alert">{errors.content.message}</p>
              )}
            </div>
            <fieldset>
              <legend className="text-sm font-medium mb-2">Associate a mood (optional)</legend>
              <div className="flex flex-wrap gap-2">
                {MOODS.map((m) => (
                  <button
                    key={m.type}
                    type="button"
                    onClick={() =>
                      setValue('moodTag', selectedMoodTag === m.type ? null : m.type)
                    }
                    className={`rounded-full px-3 py-1 text-sm border transition-colors ${
                      selectedMoodTag === m.type
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:bg-accent'
                    }`}
                    aria-pressed={selectedMoodTag === m.type}
                  >
                    {m.emoji} {m.label}
                  </button>
                ))}
              </div>
            </fieldset>
            <Button type="submit">Save Entry +25 XP</Button>
          </form>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-4">Previous Entries</h2>
        {entries.length === 0 ? (
          <p className="text-muted-foreground text-center py-8" role="status">
            No journal entries yet.
          </p>
        ) : (
          <div className="space-y-4">
            {entries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{entry.title}</h3>
                        <time className="text-xs text-muted-foreground" dateTime={entry.date}>
                          {formatDate(entry.date)}
                        </time>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteEntry(entry.id)}
                        aria-label={`Delete entry: ${entry.title}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{entry.content}</p>
                    {entry.moodTag && (
                      <Badge variant="secondary">
                        {MOOD_MAP[entry.moodTag as MoodType].emoji}{' '}
                        {MOOD_MAP[entry.moodTag as MoodType].label}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
