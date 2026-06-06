import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { MoodSelector } from '@/components/mood/MoodSelector'
import { MoodTimeline } from '@/components/mood/MoodTimeline'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/PageHeader'
import { useMoodTracker } from '@/hooks/useMoodTracker'
import { useDashboardStore } from '@/store/slices/dashboardSlice'
import { useJournalStore } from '@/store/slices/journalSlice'
import { useWellnessStore } from '@/store/slices/wellnessSlice'

function syncGamification() {
  const journalCount = useJournalStore.getState().entries.length
  const uniqueTriggers = new Set(
    useWellnessStore.getState().triggers.filter((t) => t.count > 0).map((t) => t.category),
  ).size
  useDashboardStore.getState().syncAchievements(journalCount, uniqueTriggers)
}

export default function MoodTrackerPage() {
  const {
    entries,
    selectedMood,
    note,
    setSelectedMood,
    setNote,
    addEntry,
    todayEntry,
  } = useMoodTracker()
  const recordMoodCheckIn = useDashboardStore((s) => s.recordMoodCheckIn)

  const handleSubmit = () => {
    if (!selectedMood) return
    addEntry()
    recordMoodCheckIn()
    syncGamification()
  }

  useEffect(() => {
    syncGamification()
  }, [])

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <PageHeader
        title="Mood Check-in"
        description="Track how exam preparation affects your emotions — awareness is the first step to managing stress"
      />

      {todayEntry && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-lg bg-primary/10 border border-primary/20 p-4 text-sm"
          role="status"
        >
          Checked in today! Update your mood anytime if things change.
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
            Save Mood Check-in
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
