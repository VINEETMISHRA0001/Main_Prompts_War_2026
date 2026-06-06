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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { WeeklyTrendPoint } from '@/types'

interface WeeklyTrendChartProps {
  data: WeeklyTrendPoint[]
}

export function WeeklyTrendChart({ data }: WeeklyTrendChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full" role="img" aria-label="Weekly mood, stress, and focus trend chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-card)',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="oklch(0.55 0.12 180)"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Mood"
              />
              <Line
                type="monotone"
                dataKey="stress"
                stroke="oklch(0.65 0.15 50)"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Stress"
              />
              <Line
                type="monotone"
                dataKey="focus"
                stroke="oklch(0.55 0.12 250)"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Focus"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
