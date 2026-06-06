import { ScaleSlider } from '@/components/mood/ScaleSlider'

interface MoodMetricsFormProps {
  moodScore: number
  sleepQuality: number
  energyLevel: number
  anxietyLevel: number
  confidenceLevel: number
  onMoodScoreChange: (v: number) => void
  onSleepQualityChange: (v: number) => void
  onEnergyLevelChange: (v: number) => void
  onAnxietyLevelChange: (v: number) => void
  onConfidenceLevelChange: (v: number) => void
}

export function MoodMetricsForm({
  moodScore,
  sleepQuality,
  energyLevel,
  anxietyLevel,
  confidenceLevel,
  onMoodScoreChange,
  onSleepQualityChange,
  onEnergyLevelChange,
  onAnxietyLevelChange,
  onConfidenceLevelChange,
}: MoodMetricsFormProps) {
  return (
    <div className="space-y-5 pt-2 border-t border-border">
      <p className="text-sm text-muted-foreground">
        Rate how you feel on a 1–10 scale. These help MindFlow spot burnout early during exam prep.
      </p>
      <ScaleSlider
        id="mood-score"
        label="Overall mood"
        value={moodScore}
        onChange={onMoodScoreChange}
        lowLabel="Very low"
        highLabel="Great"
      />
      <ScaleSlider
        id="sleep-quality"
        label="Sleep quality (last night)"
        value={sleepQuality}
        onChange={onSleepQualityChange}
        lowLabel="Poor"
        highLabel="Rested"
      />
      <ScaleSlider
        id="energy-level"
        label="Energy level"
        value={energyLevel}
        onChange={onEnergyLevelChange}
        lowLabel="Drained"
        highLabel="Energized"
      />
      <ScaleSlider
        id="anxiety-level"
        label="Anxiety level"
        value={anxietyLevel}
        onChange={onAnxietyLevelChange}
        lowLabel="Calm"
        highLabel="Very anxious"
      />
      <ScaleSlider
        id="confidence-level"
        label="Confidence for exams"
        value={confidenceLevel}
        onChange={onConfidenceLevelChange}
        lowLabel="Doubtful"
        highLabel="Confident"
      />
    </div>
  )
}
