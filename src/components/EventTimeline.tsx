import { Clock, AlertTriangle, TrendingUp, Globe } from 'lucide-react'

type EventType = 'positive' | 'negative' | 'neutral'

interface EventItem {
  time: string
  title: string
  desc: string
  type: EventType
  region: string
}

const events: EventItem[] = [
  { time: '2m ago', title: 'US Fed Signals Rate Cut', desc: 'Federal Reserve hints at dovish stance amid slowing inflation.', type: 'positive', region: 'US' },
  { time: '15m ago', title: 'Russia Energy Sanctions Escalate', desc: 'New EU sanctions target Russian oil exports, supply concerns rise.', type: 'negative', region: 'EU' },
  { time: '1h ago', title: 'China Tech Sector Rally', desc: 'Hang Seng Tech index surges 4% on regulatory easing expectations.', type: 'positive', region: 'CN' },
  { time: '2h ago', title: 'Middle East Tensions Rise', desc: 'Geopolitical risks spike after military escalation in the region.', type: 'negative', region: 'ME' },
  { time: '3h ago', title: 'India GDP Growth Beats Estimates', desc: 'Q3 GDP expands 7.2%, driven by manufacturing and services.', type: 'positive', region: 'IN' },
  { time: '5h ago', title: 'Oil Prices Volatile', desc: 'Brent crude swings 3% amid conflicting supply signals from OPEC+.', type: 'neutral', region: 'Global' },
  { time: '6h ago', title: 'European Markets Mixed', desc: 'Stoxx 600 fluctuates as investors weigh earnings against ECB outlook.', type: 'neutral', region: 'EU' },
  { time: '8h ago', title: 'Japan Nikkei Hits 5-Year High', desc: 'BoJ maintains accommodative stance, weakening yen boosts exports.', type: 'positive', region: 'JP' },
]

const typeStyles: Record<EventType, string> = {
  positive: 'border-l-green-500 bg-green-500/5',
  negative: 'border-l-red-500 bg-red-500/5',
  neutral: 'border-l-yellow-500 bg-yellow-500/5',
}

const typeIcons: Record<EventType, typeof TrendingUp> = {
  positive: TrendingUp,
  negative: AlertTriangle,
  neutral: Globe,
}

const regionColors: Record<string, string> = {
  US: 'bg-blue-500/20 text-blue-400',
  EU: 'bg-purple-500/20 text-purple-400',
  CN: 'bg-red-500/20 text-red-400',
  ME: 'bg-orange-500/20 text-orange-400',
  IN: 'bg-orange-500/20 text-orange-400',
  Global: 'bg-cyan-500/20 text-cyan-400',
  JP: 'bg-pink-500/20 text-pink-400',
}

export default function EventTimeline() {
  return (
    <div className="space-y-2">
      {events.map((event, i) => {
        const Icon = typeIcons[event.type]
        return (
          <div
            key={i}
            className={`border-l-2 pl-3 py-2 rounded-r-lg ${typeStyles[event.type]} transition-colors`}
          >
            <div className="flex items-start gap-2">
              <Icon className="w-4 h-4 mt-0.5 shrink-0 dark:text-gray-400 text-gray-600" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium dark:text-white text-gray-900">{event.title}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${regionColors[event.region] || 'bg-gray-500/20 text-gray-400'}`}>
                    {event.region}
                  </span>
                </div>
                <p className="text-xs dark:text-gray-400 text-gray-600 mt-0.5">{event.desc}</p>
              </div>
              <div className="flex items-center gap-1 text-[10px] dark:text-gray-500 text-gray-400 shrink-0">
                <Clock className="w-3 h-3" />
                {event.time}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
