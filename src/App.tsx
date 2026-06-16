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
import { ErrorBoundary } from './components/ErrorBoundary'
import type { Country } from './data/countries'

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [showMapView, setShowMapView] = useState(false)

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

  return (
    <div className="h-screen w-screen flex flex-col dark:bg-gray-950 bg-gray-50 dark:text-white text-gray-900 overflow-hidden">
      <Header />

      <CountryNav
        selectedCountry={selectedCountry}
        onSelect={handleNavSelect}
      />

      <main className="flex-1 flex overflow-hidden">
        {/* Left Panel - Globe or Map View */}
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
                />
              </div>
            )}

            {/* Overlay label (only in globe mode) */}
            {!showMapView && (
              <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <h2 className="text-sm font-semibold dark:text-white/80 text-gray-900/80 drop-shadow-lg">
                  {selectedCountry
                    ? `${selectedCountry.name} Market Overview`
                    : 'Global Market Heatmap'
                  }
                </h2>
                <p className="text-[10px] dark:text-white/50 text-gray-600/80 drop-shadow">
                  {selectedCountry
                    ? `${selectedCountry.stockExchange || 'Stock Market'} - ${selectedCountry.currency} (${selectedCountry.currencySymbol})`
                    : 'Click a country on the globe to explore'
                  }
                </p>
              </div>
            )}
          </ErrorBoundary>
        </section>

        {/* Right Panel */}
        <aside className="w-96 border-l dark:border-white/10 border-gray-200 flex flex-col dark:bg-gray-950/80 bg-white/80 backdrop-blur-sm overflow-y-auto">
          {selectedCountry && (
            <div className="p-4 border-b dark:border-white/10 border-gray-200">
              <ErrorBoundary>
                <CountryMarkets country={selectedCountry} />
              </ErrorBoundary>
            </div>
          )}

          {/* Signals */}
          <div className="p-4 border-b dark:border-white/10 border-gray-200">
            <h3 className="text-xs font-semibold dark:text-gray-300 text-gray-700 uppercase tracking-wider mb-3">
              Signal Dashboard
            </h3>
            <ErrorBoundary>
              <SignalDashboard country={selectedCountry} />
            </ErrorBoundary>
          </div>

          {/* Event Timeline */}
          <div className="p-4 border-b dark:border-white/10 border-gray-200">
            <h3 className="text-xs font-semibold dark:text-gray-300 text-gray-700 uppercase tracking-wider mb-3">
              Event Timeline
            </h3>
            <ErrorBoundary>
              <EventTimeline country={selectedCountry} />
            </ErrorBoundary>
          </div>

          {/* Market Charts */}
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
