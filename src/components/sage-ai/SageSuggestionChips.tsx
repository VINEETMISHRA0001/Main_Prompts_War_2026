import { SAGE_SUGGESTION_CHIPS } from '@/constants/sagePrompts'

interface SageSuggestionChipsProps {
  onSelect: (text: string) => void
  disabled?: boolean
}

export function SageSuggestionChips({ onSelect, disabled }: SageSuggestionChipsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto" role="group" aria-label="Suggested wellness prompts">
      {SAGE_SUGGESTION_CHIPS.map((chip) => (
        <button
          key={chip}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(chip)}
          className="rounded-full border border-border px-3 py-1.5 text-sm hover:bg-primary/10 hover:border-primary/50 transition-colors disabled:opacity-50"
        >
          {chip}
        </button>
      ))}
    </div>
  )
}
