import { useState } from 'react'
import Header from './components/Header'
import GlobeView from './components/GlobeView'
import MapView from './components/MapView'
import CountryNav from './components/CountryNav'
import CountryMarkets from './components/CountryMarkets'
import SignalDashboard from './components/SignalDashboard'
import EventTimeline from './components/EventTimeline'
import MarketCharts from './components/MarketCharts'
import ChatBot from './components/ChatBot'
import GlobeControls from './components/GlobeControls'
import type { GlobeMode, AgentMode } from './components/GlobeControls'
import EventDetailPanel from './components/EventDetailPanel'
import ExplainabilityPanel from './components/ExplainabilityPanel'
import { ErrorBoundary } from './components/ErrorBoundary'
import type { Country } from './data/countries'
import type { GeoEvent } from './data/events'

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [showMapView, setShowMapView] = useState(false)

  const [globeMode, setGlobeMode] = useState<GlobeMode>('default')
  const [agentMode, setAgentMode] = useState<AgentMode>('conflict')
  const [forecastDay, setForecastDay] = useState(0)
  const [selectedEvent, setSelectedEvent] = useState<GeoEvent | null>(null)
  const [showExplainability, setShowExplainability] = useState<string | null>(null)
  const [activeLayers, setActiveLayers] = useState<Record<string, boolean>>({
    ports: true,
    labels: true,
  })

  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country)
  }

  const handleOpenMap = () => {
    setShowMapView(true)
  }

  const handleBackToGlobe = () => {
    setShowMapView(false)
  }

  const handleNavSelect = (country: Country | null) => {
    setSelectedCountry(country)
    if (showMapView) setShowMapView(false)
  }

  const handleEventClick = (event: GeoEvent) => {
    setSelectedEvent(event)
  }

  const handleCloseEvent = () => {
    setSelectedEvent(null)
  }

  const handleShowExplain = (countryCode: string) => {
    setShowExplainability(countryCode)
  }

  const handleCloseExplain = () => {
    setShowExplainability(null)
  }

  const handleLayerToggle = (layer: string) => {
    setActiveLayers(prev => ({ ...prev, [layer]: !prev[layer] }))
  }

  return (
    <div className="h-screen w-screen flex flex-col dark:bg-gray-950 bg-gray-50 dark:text-white text-gray-900 overflow-hidden">
      <Header />

      <CountryNav
        selectedCountry={selectedCountry}
        onSelect={handleNavSelect}
      />

      <main className="flex-1 flex overflow-hidden">
        <section className="flex-1 relative min-w-0">
          <ErrorBoundary>
            {showMapView && selectedCountry ? (
              <MapView country={selectedCountry} onBack={handleBackToGlobe} />
            ) : (
              <div className="absolute inset-0">
                <GlobeView
                  selectedCountry={selectedCountry}
                  onCountryClick={handleCountryClick}
                  onOpenMap={handleOpenMap}
                  mode={globeMode}
                  agentMode={agentMode}
                  forecastDay={forecastDay}
                  selectedEvent={selectedEvent}
                  onEventClick={handleEventClick}
                  activeLayers={activeLayers}
                />

                {!showMapView && (
                  <div className="absolute top-4 left-4 z-10 pointer-events-none">
                    <h2 className="text-sm font-semibold dark:text-white/80 text-gray-900/80 drop-shadow-lg">
                      {selectedCountry
                        ? `${selectedCountry.name} Market Overview`
                        : globeMode === 'events' ? 'Real-Time Events'
                        : globeMode === 'graph' ? 'Neo4j Knowledge Graph'
                        : globeMode === 'supplyChain' ? 'Supply Chain View'
                        : globeMode === 'risk' ? 'Risk Propagation'
                        : globeMode === 'similarity' ? 'Event Similarity'
                        : globeMode === 'agent' ? `Agent Mode: ${agentMode}`
                        : globeMode === 'worldState' ? 'World State'
                        : globeMode === 'forecast' ? `Forecast: +${forecastDay}d`
                        : 'Global Market Heatmap'
                      }
                    </h2>
                    <p className="text-[10px] dark:text-white/50 text-gray-600/80 drop-shadow">
                      {selectedCountry
                        ? `${selectedCountry.stockExchange || 'Stock Market'} - ${selectedCountry.currency} (${selectedCountry.currencySymbol})`
                        : globeMode === 'default' ? 'Click a country on the globe to explore'
                        : 'Interactive 3D globe'
                      }
                    </p>
                  </div>
                )}

                <GlobeControls
                  mode={globeMode}
                  onModeChange={setGlobeMode}
                  agentMode={agentMode}
                  onAgentModeChange={setAgentMode}
                  forecastDay={forecastDay}
                  onForecastDayChange={setForecastDay}
                  selectedEventId={selectedEvent?.id ?? null}
                  layers={activeLayers}
                  onLayerToggle={handleLayerToggle}
                />

                {selectedEvent && (
                  <EventDetailPanel
                    event={selectedEvent}
                    onClose={handleCloseEvent}
                    onEventClick={handleEventClick}
                    onShowExplain={handleShowExplain}
                  />
                )}

                {showExplainability && (
                  <ExplainabilityPanel
                    sourceId={showExplainability}
                    onClose={handleCloseExplain}
                  />
                )}
              </div>
            )}
          </ErrorBoundary>
        </section>

        <aside className="w-96 border-l dark:border-white/10 border-gray-200 flex flex-col dark:bg-gray-950/80 bg-white/80 backdrop-blur-sm overflow-y-auto">
          {selectedCountry && (
            <div className="p-4 border-b dark:border-white/10 border-gray-200">
              <ErrorBoundary>
                <CountryMarkets country={selectedCountry} />
              </ErrorBoundary>
            </div>
          )}

          <div className="p-4 border-b dark:border-white/10 border-gray-200">
            <h3 className="text-xs font-semibold dark:text-gray-300 text-gray-700 uppercase tracking-wider mb-3">
              Signal Dashboard
            </h3>
            <ErrorBoundary>
              <SignalDashboard country={selectedCountry} />
            </ErrorBoundary>
          </div>

          <div className="p-4 border-b dark:border-white/10 border-gray-200">
            <h3 className="text-xs font-semibold dark:text-gray-300 text-gray-700 uppercase tracking-wider mb-3">
              Event Timeline
            </h3>
            <ErrorBoundary>
              <EventTimeline country={selectedCountry} />
            </ErrorBoundary>
          </div>

          <div className="p-4">
            <h3 className="text-xs font-semibold dark:text-gray-300 text-gray-700 uppercase tracking-wider mb-3">
              Market Analytics
            </h3>
            <ErrorBoundary>
              <MarketCharts country={selectedCountry} />
            </ErrorBoundary>
          </div>
        </aside>
      </main>

      <ChatBot />
    </div>
  )
}
