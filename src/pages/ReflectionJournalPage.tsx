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
import { useJournalStore } from '@/store/journalStore'
import { MOODS } from '@/constants/moods'
import { MOOD_MAP } from '@/constants/moods'
import { formatDate } from '@/utils/formatDate'
import type { MoodType } from '@/types'

const journalSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  content: z.string().min(10, 'Write at least 10 characters').max(2000),
  moodTag: z.enum(['happy', 'calm', 'neutral', 'stressed', 'overwhelmed']).nullable(),
})

type JournalForm = z.infer<typeof journalSchema>

export default function ReflectionJournalPage() {
  const entries = useJournalStore((s) => s.entries)
  const addEntry = useJournalStore((s) => s.addEntry)
  const deleteEntry = useJournalStore((s) => s.deleteEntry)

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

  const onSubmit = (data: JournalForm) => {
    addEntry(data.title, data.content, data.moodTag)
    reset()
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Reflection Journal</h1>
        <p className="text-muted-foreground">Process your thoughts and track your growth</p>
      </div>

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
            <Button type="submit">Save Entry</Button>
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
