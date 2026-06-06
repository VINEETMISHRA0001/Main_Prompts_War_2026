import { Label } from '@/components/ui/label'
import { cn } from '@/utils/cn'

interface ScaleSliderProps {
  id: string
  label: string
  value: number
  onChange: (value: number) => void
  lowLabel?: string
  highLabel?: string
  invert?: boolean
}

export function ScaleSlider({
  id,
  label,
  value,
  onChange,
  lowLabel = 'Low',
  highLabel = 'High',
  invert = false,
}: ScaleSliderProps) {
  const displayValue = invert ? 11 - value : value

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id}>{label}</Label>
        <span className="text-sm font-medium text-primary tabular-nums">{displayValue}/10</span>
      </div>
      <input
        id={id}
        type="range"
        min={1}
        max={10}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn(
          'w-full h-2 rounded-full appearance-none cursor-pointer',
          'bg-muted accent-primary',
          '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4',
          '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary',
        )}
        aria-valuemin={1}
        aria-valuemax={10}
        aria-valuenow={displayValue}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{invert ? highLabel : lowLabel}</span>
        <span>{invert ? lowLabel : highLabel}</span>
      </div>
    </div>
  )
}
