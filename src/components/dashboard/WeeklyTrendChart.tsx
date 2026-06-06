import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { ChartContainer } from '@/components/ChartContainer'
import type { WeeklyTrendPoint } from '@/types'

interface WeeklyTrendChartProps {
  data: WeeklyTrendPoint[]
}

export function WeeklyTrendChart({ data }: WeeklyTrendChartProps) {
  return (
    <ChartContainer
      title="Weekly Wellness Trend"
      description="How your mood and stress shifted during exam prep this week"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#A3A3A3' }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#A3A3A3' }} />
          <Tooltip
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: '#151515',
              color: '#fff',
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="mood" stroke="#00FF94" strokeWidth={2} dot={{ r: 4 }} name="Mood" />
          <Line type="monotone" dataKey="stress" stroke="#F59E0B" strokeWidth={2} dot={{ r: 4 }} name="Stress" />
          <Line type="monotone" dataKey="focus" stroke="#34D399" strokeWidth={2} dot={{ r: 4 }} name="Focus" />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
