import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { STRESS_TRIGGERS } from '@/constants/stressTriggers'
import { useStressStore } from '@/store/stressStore'
import { stressInsights } from '@/data/mockStress'

export default function StressTriggersPage() {
  const triggers = useStressStore((s) => s.triggers)
  const logTrigger = useStressStore((s) => s.logTrigger)

  const chartData = triggers.map((t) => {
    const config = STRESS_TRIGGERS.find((c) => c.category === t.category)
    return {
      name: config?.label ?? t.category,
      count: t.count,
      icon: config?.icon ?? '',
    }
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Stress Triggers</h1>
        <p className="text-muted-foreground">Identify and track what causes your stress</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {STRESS_TRIGGERS.map((trigger, index) => {
          const data = triggers.find((t) => t.category === trigger.category)
          return (
            <motion.div
              key={trigger.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl" aria-hidden>{trigger.icon}</span>
                    <span className="text-2xl font-bold">{data?.count ?? 0}</span>
                  </div>
                  <h3 className="font-semibold mb-1">{trigger.label}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{trigger.description}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => logTrigger(trigger.category)}
                    aria-label={`Log ${trigger.label} stress trigger`}
                  >
                    Log Trigger
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trigger Frequency</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]" role="img" aria-label="Stress trigger frequency chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-card)',
                  }}
                />
                <Bar dataKey="count" fill="oklch(0.55 0.12 180)" radius={[6, 6, 0, 0]} name="Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-semibold mb-4">Insights</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {stressInsights.map((insight) => (
            <Card key={insight.id}>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{insight.title}</h3>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
