import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { ChartContainer } from '@/components/ChartContainer'
import type { MonthlyTrendPoint } from '@/types'

interface MonthlyMoodTrendProps {
  data: MonthlyTrendPoint[]
}

export function MonthlyMoodTrend({ data }: MonthlyMoodTrendProps) {
  const chartData = data.filter((_, i) => i % 3 === 0 || i === data.length - 1)

  return (
    <ChartContainer
      title="30-Day Mood Trend"
      description="How your mood shifted across the last month of exam prep"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <defs>
            <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00FF94" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#00FF94" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#A3A3A3' }} interval="preserveStartEnd" />
          <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#A3A3A3' }} />
          <Tooltip
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: '#151515',
              color: '#fff',
            }}
          />
          <Area
            type="monotone"
            dataKey="mood"
            stroke="#00FF94"
            fill="url(#moodGradient)"
            strokeWidth={2}
            name="Mood"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
