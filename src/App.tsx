import { useState } from 'react'
import Header from './components/Header'
import GlobeView from './components/GlobeView'
import CountryNav from './components/CountryNav'
import CountryMarkets from './components/CountryMarkets'
import SignalDashboard from './components/SignalDashboard'
import EventTimeline from './components/EventTimeline'
import MarketCharts from './components/MarketCharts'
import type { Country } from './data/countries'

export default function App() {
  return (
    <div className="h-screen w-screen flex flex-col dark:bg-gray-950 bg-gray-50 dark:text-white text-gray-900 overflow-hidden">
      <Header />

      <main className="flex-1 flex overflow-hidden">
        {/* Left Panel - Globe */}
        <section className="flex-1 relative min-w-0">
          <div className="absolute inset-0">
            <GlobeView />
          </div>
          {/* Overlay label */}
          <div className="absolute top-4 left-4 z-10">
            <h2 className="text-sm font-semibold dark:text-white/80 text-gray-900/80 drop-shadow-lg">
              Global Market Heatmap
            </h2>
            <p className="text-[10px] dark:text-white/50 text-gray-600/80 drop-shadow">
              Real-time geopolitical sentiment by region
            </p>
          </div>
        </section>

        {/* Right Panel */}
        <aside className="w-96 border-l dark:border-white/10 border-gray-200 flex flex-col dark:bg-gray-950/80 bg-white/80 backdrop-blur-sm overflow-y-auto">
          {/* Signals */}
          <div className="p-4 border-b dark:border-white/10 border-gray-200">
            <h3 className="text-xs font-semibold dark:text-gray-300 text-gray-700 uppercase tracking-wider mb-3">
              Signal Dashboard
            </h3>
            <SignalDashboard />
          </div>

          {/* Event Timeline */}
          <div className="p-4 border-b dark:border-white/10 border-gray-200">
            <h3 className="text-xs font-semibold dark:text-gray-300 text-gray-700 uppercase tracking-wider mb-3">
              Event Timeline
            </h3>
            <EventTimeline />
          </div>

          {/* Market Charts */}
          <div className="p-4">
            <h3 className="text-xs font-semibold dark:text-gray-300 text-gray-700 uppercase tracking-wider mb-3">
              Market Analytics
            </h3>
            <MarketCharts />
          </div>
        </aside>
      </main>
    </div>
  )
}
