import { cn } from '@/utils/cn'

interface SpotlightProps {
  className?: string
  fill?: string
}

export function Spotlight({ className, fill = 'rgba(20, 184, 166, 0.15)' }: SpotlightProps) {
  return (
    <svg
      className={cn(
        'pointer-events-none absolute z-0 h-[169%] w-[138%] lg:w-[84%] opacity-40 animate-pulse',
        className,
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
      aria-hidden="true"
    >
      <g filter="url(#filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill}
        />
      </g>
      <defs>
        <filter
          id="filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur" />
        </filter>
      </defs>
    </svg>
  )
}

interface BackgroundGradientProps {
  className?: string
  children?: React.ReactNode
}

export function BackgroundGradient({ className, children }: BackgroundGradientProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl bg-gradient-to-br from-teal-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-teal-950',
        className,
      )}
    >
      <Spotlight />
      {children}
    </div>
  )
}
