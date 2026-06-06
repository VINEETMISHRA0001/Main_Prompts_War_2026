import { motion } from 'framer-motion'
import { MOODS } from '@/constants/moods'
import type { MoodType } from '@/types'
import { cn } from '@/utils/cn'

interface MoodSelectorProps {
  selected: MoodType | null
  onSelect: (mood: MoodType) => void
}

export function MoodSelector({ selected, onSelect }: MoodSelectorProps) {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3"
      role="radiogroup"
      aria-label="Select your mood"
    >
      {MOODS.map((mood, index) => {
        const isSelected = selected === mood.type
        return (
          <motion.button
            key={mood.type}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={mood.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(mood.type)}
            className={cn(
              'flex flex-col items-center gap-2 rounded-xl p-4 border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              isSelected
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-transparent glass hover:border-border',
              mood.bgColor,
            )}
          >
            <span className="text-3xl" aria-hidden>
              {mood.emoji}
            </span>
            <span className={cn('text-sm font-medium', mood.color)}>{mood.label}</span>
          </motion.button>
        )
      })}
    </div>
  )
}
