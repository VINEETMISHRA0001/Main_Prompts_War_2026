interface SageFollowUpChipsProps {
  items: string[]
  onSelect: (text: string) => void
  disabled?: boolean
}

export function SageFollowUpChips({ items, onSelect, disabled }: SageFollowUpChipsProps) {
  return (
    <div className="mt-4">
      <p className="text-xs font-medium text-muted-foreground mb-2">Related</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(item)}
            className="rounded-full border border-border px-3 py-1 text-xs hover:bg-primary/10 hover:border-primary/50 transition-colors disabled:opacity-50 text-left"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}
