import { motion } from 'framer-motion'
import { MoodSelector } from '@/components/mood/MoodSelector'
import { MoodTimeline } from '@/components/mood/MoodTimeline'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useMoodData } from '@/hooks/useMoodData'
import { useProfileStore } from '@/store/profileStore'

export default function MoodTrackerPage() {
  const {
    entries,
    selectedMood,
    note,
    setSelectedMood,
    setNote,
    addEntry,
    todayEntry,
  } = useMoodData()
  const incrementCheckIn = useProfileStore((s) => s.incrementCheckIn)

  const handleSubmit = () => {
    if (!selectedMood) return
    addEntry()
    incrementCheckIn()
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Mood Tracker</h1>
        <p className="text-muted-foreground">How are you feeling today?</p>
      </div>

      {todayEntry && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-4 text-sm"
          role="status"
        >
          You&apos;ve already checked in today. You can log another entry if your mood changes.
        </motion.div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Select your mood</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <MoodSelector selected={selectedMood} onSelect={setSelectedMood} />
          <div className="space-y-2">
            <Label htmlFor="mood-note">Add a note (optional)</Label>
            <Textarea
              id="mood-note"
              placeholder="What's on your mind?"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={500}
              aria-describedby="mood-note-hint"
            />
            <p id="mood-note-hint" className="text-xs text-muted-foreground">
              {note.length}/500 characters
            </p>
          </div>
          <Button onClick={handleSubmit} disabled={!selectedMood} className="w-full sm:w-auto">
            Log Mood
          </Button>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-4">Mood History</h2>
        <MoodTimeline entries={entries} />
      </div>
    </div>
  )
}
