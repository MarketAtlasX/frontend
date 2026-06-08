import { useState } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, CartesianGrid, Cell,
} from 'recharts'

const priceData = Array.from({ length: 30 }, (_, i) => ({
  day: `D${i + 1}`,
  SPY: 450 + Math.sin(i * 0.3) * 15 + Math.random() * 8,
  QQQ: 380 + Math.cos(i * 0.25) * 12 + Math.random() * 6,
  VIX: 18 + Math.sin(i * 0.4) * 5 + Math.random() * 3,
}))

const sectorData = [
  { sector: 'Technology', change: 3.2 },
  { sector: 'Energy', change: -1.8 },
  { sector: 'Finance', change: 1.5 },
  { sector: 'Healthcare', change: 0.8 },
  { sector: 'Consumer', change: -0.5 },
  { sector: 'Industrial', change: 2.1 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-black/80 dark:bg-gray-900/90 border border-white/10 rounded-lg px-3 py-2 text-xs text-white">
        <p className="font-medium mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }}>
            {p.name}: ${p.value.toFixed(2)}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function MarketCharts() {
  const [chartView, setChartView] = useState<'prices' | 'sectors'>('prices')

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setChartView('prices')}
          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
            chartView === 'prices'
              ? 'dark:bg-white/10 bg-gray-200 dark:text-white text-gray-900'
              : 'dark:text-gray-400 text-gray-600 hover:dark:bg-white/5 hover:bg-gray-100'
          }`}
        >
          Price Trends
        </button>
        <button
          onClick={() => setChartView('sectors')}
          className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
            chartView === 'sectors'
              ? 'dark:bg-white/10 bg-gray-200 dark:text-white text-gray-900'
              : 'dark:text-gray-400 text-gray-600 hover:dark:bg-white/5 hover:bg-gray-100'
          }`}
        >
          Sector Performance
        </button>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        {chartView === 'prices' ? (
          <AreaChart data={priceData}>
            <defs>
              <linearGradient id="spyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="qqqGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7b2ff7" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7b2ff7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="SPY" stroke="#00d4ff" fill="url(#spyGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="QQQ" stroke="#7b2ff7" fill="url(#qqqGrad)" strokeWidth={2} />
          </AreaChart>
        ) : (
          <BarChart data={sectorData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis type="number" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis dataKey="sector" type="category" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={80} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="change" radius={[0, 4, 4, 0]}>
              {sectorData.map((entry, i) => (
                <Cell key={i} fill={entry.change >= 0 ? '#00ff88' : '#ff4444'} />
              ))}
            </Bar>
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}
