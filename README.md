# MarketAtlas — Frontend

**AI-Powered Geopolitical Trading Intelligence Platform**

MarketAtlas is an interactive command center for traders, analysts, and researchers. It transforms global political, economic, and conflict-related events into actionable trading insights through a 3D globe interface with 9 visualization layers, country-level market dashboards, supply chain network analysis, event evolution tracking, and an integrated AI chatbot.

```
 3D Globe ──click──► Country Map (Leaflet)
     │
     ├── 9 Visualization Modes:
     │     Default · Events · Knowledge Graph · Supply Chain
     │     Risk · Event Similarity · AI Agents · World State · Forecast
     │
     └── Right Sidebar (context-aware)
           ├── Country Markets / Supply Chain Network
           ├── Signal Dashboard / Event Evolution
           ├── Event Timeline / Event Evolution
           └── Market Analytics

 Floating ChatBot (bottom-right)
     └── WebSocket / REST ──► MarketAtlas Backend
```

---

## Quick Start

```bash
npm install
npm run dev
```

Opens at `http://localhost:3000`. Backend at `http://localhost:8000` is optional — the frontend falls back to realistic mock data when offline.

---

## Features

### Interactive 3D Globe (9 Visualization Modes)

The globe supports 9 distinct visualization layers, switchable via the bottom toolbar:

| Mode | Description | Visual |
|------|-------------|--------|
| **Default** | Hexbin population heatmap (60+ cities), trade route arcs, military relation arcs, financial hub rings | Heatmap + animated arcs |
| **Events** | Real-time geopolitical event markers with severity/sentiment color-coding, event evolution arcs connecting related events | Pulsing dots + connected arcs |
| **Knowledge Graph** | Neo4j-inspired causal graph showing country→commodity→sector→asset relationships | Colored arcs with labels |
| **Supply Chain** | Global supply chain paths with animated commodity flows, node markers at key countries, click for details | Animated dashed arcs + golden nodes |
| **Risk Propagation** | Trade route risk visualization simulating crisis propagation | Red dashed arcs |
| **Event Similarity** | Similar historical events connected to selected event via arcs | Purple connecting arcs |
| **AI Agents** | Filtered events by agent type (Conflict/Energy/Supply Chain/Market) | Color-coded dots |
| **World State** | Country-level risk choropleth (GDP, inflation, stability, military spending) | Color-coded points |
| **Forecast** | Predictive risk scores at 7/30/90 day intervals | Gradient points with forecast labels |

Globe interactions:
- **Click country** → zooms in → opens MapView with trade routes, ports, relations
- **Click event** (Events mode) → opens EventDetailPanel with severity, consequences, similar events
- **Click supply chain node** (Supply Chain mode) → opens SupplyChainPanel overlay
- **Auto-rotation** with orbit controls, smooth zoom transitions

### Supply Chain Network
- 5 major supply chain paths covering semiconductors, oil/energy, manufacturing, resources, agriculture
- Animated dashed arcs from source→destination with commodity labels
- Golden node markers at each participating country
- Click any node to open SupplyChainPanel overlay:
  - Path name, risk level, criticality score
  - Risk bars with color coding (green/yellow/orange/red)
  - Individual link rows: from→to country, commodity, volume, criticality badge
- Sidebar shows full network view in Supply Chain mode
- Data driven by `src/data/supplyChains.ts`

### Event Evolution Timeline
- Real-time events and historical precedents displayed chronologically
- Evolution chains connecting similar events via animated arcs on the globe
- Each event shows: type icon, severity score, sentiment indicator, timestamp
- Consequences breakdown: affected sectors and commodities
- Historical context: links current events to analogous historical events (Gulf War, Oil Crisis, 2008 Financial Crisis, etc.)
- Toggle historical events on/off
- Click any event to open detail panel with causal path analysis
- Sidebar automatically switches to Event Evolution view in Events/Similarity modes

### Event Detail Panel
- Floating overlay with event severity gauge, sentiment indicator
- Affected sectors and commodities as tagged badges
- Location coordinates and timestamp
- Similar events section — click to navigate between related events
- "Show causal path" button → opens ExplainabilityPanel with Neo4j reasoning chain

### Explainability Panel (Causal Reasoning)
- Neo4j-inspired causal path visualization
- Shows node chain: Country → Commodity → Sector → Asset
- Each node type color-coded (country/commodity/sector/asset/event)
- Relationship labels between nodes
- Arrow-down connector visualization

### AI Agent Modes
- **Conflict Agent** — tracks military conflicts and geopolitical tensions
- **Energy Agent** — monitors energy market disruptions (oil, gas, LNG)
- **Supply Chain Agent** — analyzes supply chain vulnerabilities
- **Market Agent** — watches market movements and financial events
- Filter events on the globe by agent type

### Interactive Country Maps (Leaflet)
- Click a country on the globe to open a full-screen Leaflet map
- Port markers color-coded by volume (major/medium/minor) with tooltips
- Trade route arcs with export/import value data
- Trade partner markers at partner country coordinates
- Dark-mode aware tile layers
- Escape to return to globe view

### Country Explorer Nav Bar
- 53 countries grouped by 4 regions: Americas, Europe, Asia Pacific, Middle East & Africa
- Search input to quickly filter by name or code
- Country flags rendered via Unicode regional indicators
- All Markets button to reset selection

### Country Markets Dashboard
- Country header with flag, stock exchange, currency, market cap, trading hours
- Major indices with price and percent change
- Notable ticker badges
- 22 country-specific index datasets (S&P 500, Nikkei 225, FTSE 100, DAX, etc.)

### Signal Dashboard
- Real-time BUY / HOLD / SELL recommendation cards with confidence %
- Market stats: momentum (%), volatility (%), volume status (surge/normal/thin)
- Geopolitical risk meter with gradient bar and severity labels (Very Low through Critical)
- Entity count and local severity metrics
- Live/Polling indicator with WebSocket connection status (green pulsing = live, yellow = polling)
- Refreshes every 10 seconds (via polling or WebSocket signal)
- WebSocket auto-reconnect with 5-second backoff

### Market Analytics
- Dual-view chart panel: Price Trends (area chart) + Sector Performance (bar chart)
- Powered by Recharts with dark/light theme awareness
- Country-aware — chart lines update to the selected country's tickers

### AI ChatBot
- Floating chat button (bottom-right) with pulsing glow rings, sparkle animation, orbiting dots, green status indicator
- Slide-in chat panel (440×620px) with message history
- 6 pre-built suggested queries:
  - "Why is oil rising today?"
  - "What stocks benefit from a Taiwan blockade?"
  - "Simulate Russia reducing gas exports by 30%"
  - "Show latest sanctions"
  - "Should I buy energy stocks?"
  - "Generate an intelligence report"
- Structured responses with intent type, agents used, confidence score
- Enter to send, Escape to close
- Works fully offline with mock fallback (keyword-aware responses with proper intent routing: IMPACT, NEWS, RECOMMENDATION, SIMULATION, REPORT)

### Theme Support
- Dark mode (default) and light mode
- Theme persisted to localStorage
- Toggle via sun/moon button in header
- All components are theme-aware (charts, maps, panels)

---

## Architecture

### Component Tree

```
App
├── Header (theme toggle, title, live indicator)
├── CountryNav (4 region tabs + search + country chips)
├── main
│   ├── section (left panel)
│   │   ├── GlobeView (3D globe — 9 layers)
│   │   │   ├── Default: hexbin heatmap + trade arcs + financial hubs
│   │   │   ├── Events: event dots + evolution arcs + rings
│   │   │   ├── Graph: Neo4j causal graph arcs
│   │   │   ├── SupplyChain: animated supply chain arcs + node markers
│   │   │   ├── Risk: red risk propagation arcs
│   │   │   ├── Similarity: historical event connection arcs
│   │   │   ├── Agent: filtered event dots by agent type
│   │   │   ├── WorldState: risk choropleth points
│   │   │   └── Forecast: predictive risk points
│   │   ├── GlobeControls (9-mode toolbar + agent/forecast sub-toolbar)
│   │   ├── EventDetailPanel (severity, consequences, similar events)
│   │   ├── SupplyChainPanel (path details, risk, links)
│   │   ├── ExplainabilityPanel (Neo4j causal path chain)
│   │   └── MapView / CountryMap (Leaflet map with ports + routes)
│   └── aside (right sidebar)
│       ├── CountryMarkets / SupplyChainPanel (context-aware)
│       ├── SignalDashboard / SupplyChainPanel (context-aware)
│       ├── EventTimeline / EventEvolutionPanel (context-aware)
│       └── MarketCharts (price trends + sector performance)
└── ChatBot (floating AI assistant with glow animations)
```

### Data Flow

```
User clicks country on globe → App.setState({ selectedCountry })
    │
    ├──► CountryMarkets fetches market prices
    ├──► SignalDashboard fetches analysis (WebSocket + polling)
    ├──► EventTimeline/EventEvolution fetches events
    └──► MarketCharts fetches price history
         │
         ▼
    Each component:
        ├── tries backend API (with health check + cache)
        ├── falls back to local mock data
        └── renders result or loading/error state

9-mode toolbar state → GlobeView re-renders:
    ├── hexbin (default/risk)
    ├── points (events/ports/hubs/worldState/forecast/supplyChain)
    ├── arcs (trade/military/graph/supplyChain/risk/eventEvolution)
    └── rings (financial hubs/event rings)
```

### API Layer

```
Component → API Client (chatApi.ts / countryApi.ts / geopoliticalApi.ts / client.ts)
    │
    ├── checkBackend() → GET /api/health
    │       ├── online → real API call
    │       └── offline → mock data (cached availability)
    │
    └── Vite dev proxy (vite.config.ts)
            └── rewrite: /api/* → /api/v1/*
```

---

## Data Layer

### `src/data/countries.ts`
53 countries with: `code`, `name`, `region`, `stockExchange`, `currency`, `currencySymbol`, `marketCap`, `tradingHours`, `tickers`, `lat`, `lng`, `commodities`, `ports`. Covers: Americas, Europe, Asia Pacific, Middle East & Africa.

### `src/data/relations.ts`
- `TradeRoute[]` — 40 routes with `from`, `to`, `value`, coordinates, `color`
- `MilitaryRelation[]` — 23 relations with `type` (alliance/rivalry/conflict/neutral), `label`, coordinates
- `PortData[]` — 69 port locations with `countryCode`, `lat`, `lng`, `volume` (major/medium/minor)

### `src/data/events.ts`
- `GeoEvent` interface with: id, title, description, type, severity, sentiment, coordinates, countryCode, timestamp, affectedSectors, affectedCommodities, relatedEvents, isHistorical
- 12 real-time events covering: Iran naval exercise, Taiwan semiconductor disruption, Fed rate decision, gas pipeline maintenance, China rare earth restrictions, Saudi oil cuts, India monsoon floods, NATO deployment, Japan tech summit, Brazil exports, Chile copper supply, African trade agreement
- 7 historical events: Gulf War, Hormuz Crisis, 1973 Oil Crisis, Yom Kippur War, 2008 Financial Crisis, Fukushima, Russia-Ukraine 2014
- Similarity matching by sector/commodity overlap — `getSimilarEvents()`

### `src/data/supplyChains.ts`
- `SupplyChainPath[]` — 5 major chains with animated link configurations:
  - Taiwan Semiconductor → US Tech (semiconductors, $47B/month)
  - Gulf Oil → Europe → Global (crude oil, $18B/month)
  - China Manufacturing → Global (electronics, $23B/month)
  - Australia Resources → Asia (iron ore, coal, $18B/month)
  - Latin America Agriculture → World (soybeans, automotive, $9B/month)
- Per-link properties: commodity, volume, criticality, dash animation timing, color

### `src/data/graphData.ts`
- Neo4j-style `GraphData` with 27 nodes and 30 edges
- Node types: country, commodity, sector, asset, event
- Edge types: produces, affects, depends_on, invests, impacts
- Causal path finding with BFS — `getCausalPath(source, target)`

### `src/data/worldState.ts`
- 50 countries with: GDP, GDP growth, inflation, risk score, military spending, trade volume, stability index, population
- Risk color gradient: green (<20) → yellow → orange → red (≥80)
- Helper functions: `getWorldState(code)`, `getRiskColor(score)`

### `src/data/forecasts.ts`
- 18 countries with forecast scenarios at 0/7/30/90 day intervals
- Each scenario: risk score, GDP impact, conflict probability, market impact, affected sectors

---

## WebSocket Protocol

The `useWebSocket` hook connects to `ws://localhost:8000/ws` and auto-subscribes:

```javascript
// Automatic on connect:
ws.send({ type: 'subscribe', channel: 'signals' })
ws.send({ type: 'subscribe', channel: 'events' })

// Receiving messages:
{ type: 'connected', client_id: 'uuid' }
{ type: 'subscribed', channel: 'signals' }

// SignalDashboard receives periodic analysis:
{
  type: 'signal',
  channel: 'signals',
  data: {
    snapshot: { symbol, momentum, volatility, volume_status },
    impact: { composite_risk, local_severity, entity_count, relations },
    recommendation: { action, reason, confidence }
  },
  timestamp: '2026-06-16T...'
}
```

Auto-reconnect with 5-second backoff. Falls back to 10-second polling when WebSocket is disconnected.

---

## Offline Fallback System

Every API module auto-detects backend availability:

```
checkBackend() → GET /api/health (2s timeout)
    ├── 200 OK  → cache as available
    └── error   → cache as unavailable, return mock data
```

Mock data quality:
- **Chat API** — keyword-aware responses with proper intent routing (IMPACT, NEWS, RECOMMENDATION, SIMULATION, REPORT)
- **Market analysis** — realistic snapshots with random momentum/volatility/volume
- **Countries** — 53 real countries with actual coordinates, exchanges, currencies
- **Trade routes** — 40 major global trade corridors with real values
- **Military relations** — 23 geopolitical relationships
- **Ports** — 69 major global ports with coordinates
- **Events** — 12 real-time + 7 historical geopolitical events
- **Supply chains** — 5 major global supply chain paths
- **World state** — 50 countries with economic/military/risk data
- **Forecasts** — 18 countries with 4-tier forecast scenarios

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Language | TypeScript 6 |
| Styling | Tailwind CSS v4 |
| 3D Visualization | Globe.gl (Three.js / WebGL) |
| Maps | Leaflet + React-Leaflet |
| Charts | Recharts |
| Icons | Lucide React |
| HTTP | Fetch API (native) |

---

## Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   ├── chatApi.ts           # Chat query client + mock fallback
│   │   ├── client.ts             # Market analysis API + mock fallback
│   │   ├── countryApi.ts         # Country/relations/ports API + mock fallback
│   │   ├── endpoints.ts          # API endpoint constants + WebSocket types
│   │   └── geopoliticalApi.ts    # Events + market prices API
│   ├── components/
│   │   ├── ChatBot.tsx           # Floating AI chatbot (glow animations, 6 suggestions)
│   │   ├── CountryMap.tsx        # Leaflet map with ports, routes, partners
│   │   ├── CountryMarkets.tsx    # Country indices, tickers, mini chart
│   │   ├── CountryNav.tsx        # Region tabs + country selector + search
│   │   ├── EmptyState.tsx        # Reusable empty/error state
│   │   ├── ErrorBoundary.tsx     # React error boundary
│   │   ├── EventDetailPanel.tsx  # Event severity, consequences, similar events
│   │   ├── EventEvolutionPanel.tsx # Event timeline + evolution chains + consequences
│   │   ├── EventTimeline.tsx     # Geopolitical event feed (sidebar)
│   │   ├── ExplainabilityPanel.tsx # Neo4j causal path reasoning chain
│   │   ├── GlobeControls.tsx     # 9-mode toolbar + agent/forecast sub-menus
│   │   ├── GlobeView.tsx         # 3D globe — 9 visualization layers
│   │   ├── Header.tsx            # Title, live indicator, theme toggle
│   │   ├── MapView.tsx           # Country detail container with info panels
│   │   ├── MarketCharts.tsx      # Recharts price trends + sector performance
│   │   ├── SignalDashboard.tsx   # Real-time BUY/HOLD/SELL + risk meter
│   │   ├── Skeleton.tsx          # Loading skeleton variants
│   │   └── SupplyChainPanel.tsx  # Supply chain paths, risk, links, criticality
│   ├── hooks/
│   │   └── useWebSocket.ts      # WebSocket with auto-reconnect
│   ├── context/
│   │   └── ThemeContext.tsx      # Dark/light theme provider + localStorage
│   ├── data/
│   │   ├── countries.ts          # 53-country dataset
│   │   ├── events.ts             # 12 real-time + 7 historical events
│   │   ├── forecasts.ts          # 18-country forecast scenarios
│   │   ├── graphData.ts          # Neo4j knowledge graph (27 nodes, 30 edges)
│   │   ├── relations.ts          # Trade routes, military, ports
│   │   ├── supplyChains.ts       # 5 supply chain paths with animated links
│   │   └── worldState.ts         # 50-country economic/military/risk data
│   ├── utils/
│   │   └── geo.ts                # Haversine, bearing, destination helpers
│   ├── App.tsx                   # Root layout, state, view switching
│   ├── main.tsx                  # React entry with ThemeProvider
│   └── index.css                 # Tailwind + custom styles + animations
├── vite.config.ts                # Vite dev proxy (/api → /api/v1)
├── package.json
├── tsconfig.json
└── .env.example
```

---

## Reusable Components

| Component | Props | Purpose |
|-----------|-------|---------|
| `EmptyState` | `title`, `description`, `icon?`, `action?` | Consistent empty/error display |
| `ErrorBoundary` | `children` | Catches React errors, shows fallback |
| `Skeleton` | `variant` (timeline/dashboard) | Loading skeleton for async data |

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `http://localhost:8000` | Backend API base URL |

---

## Scripts

```bash
npm run dev         # Development server (port 3000)
npm run build       # TypeScript check + Vite production build
npm run preview     # Preview production build
```
