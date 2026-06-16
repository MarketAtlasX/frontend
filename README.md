# MarketAtlas - Frontend

**AI-Powered Geopolitical Trading Intelligence Platform**

MarketAtlas is an interactive command center for traders, analysts, and researchers. It transforms global political, economic, and conflict-related events into actionable trading insights through a 3D globe interface, country-level market dashboards, and an integrated AI chatbot.

```
3D Globe ──click──► Country Map
    │                      │
    └── Right Sidebar ─────┘
         ├── Country Markets (indices, tickers, mini chart)
         ├── Signal Dashboard (BUY/HOLD/SELL, momentum, risk)
         ├── Event Timeline (geopolitical events)
         └── Market Analytics (price trends, sector performance)
                           
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

### Interactive 3D Globe
- Powered by Globe.gl (Three.js / WebGL)
- Hexbin population heatmap of 60+ world cities with dynamic color scale
- Animated arc flows between major financial hubs
- Earth-night texture with bump mapping and atmospheric glow
- Auto-rotation with orbit controls
- Click any country to drill into its market data

### Interactive Country Maps (Leaflet)
- Click a country on the globe to open a full-screen Leaflet map
- Port markers color-coded and sized by volume (major/medium/minor)
- Trade route arcs with export/import value tooltips
- Trade partner markers at partner country coordinates
- Dark-mode aware tile layers
- Escape to return to globe view

### Country Explorer Nav Bar
- Horizontal scrollable bar with 50+ countries grouped by region
- Search input to quickly filter by name or code
- Country flags rendered via Unicode regional indicators
- Country-specific market data panels update on selection

### Country Markets Dashboard
- Country header with flag, stock exchange, currency, market cap, trading hours
- Major indices with price and percent change
- 30-day mini price sparkline chart
- Notable ticker badges

### Signal Dashboard
- Real-time BUY / HOLD / SELL recommendation cards with confidence %
- Market stats: momentum (%), volatility (%), volume status (surge/normal/thin)
- Geopolitical risk meter with gradient bar and severity labels (Very Low through Critical)
- Entity count and local severity metrics
- Live/Polling indicator with WebSocket connection status
- Refreshes every 10 seconds (via polling or WebSocket signal)

### Event Timeline
- Curated feed of geopolitical events with type-based color coding
- Region badges with contextual coloring
- Relative timestamps (2m ago, 15m ago, 1h ago, etc.)
- Country-specific filtering — shows related events when a country is selected
- Smooth skeleton loading states and empty state handling

### Market Analytics
- Dual-view chart panel: Price Trends (area chart) + Sector Performance (bar chart)
- Powered by Recharts with dark/light theme awareness
- Country-aware — chart lines update to the selected country's tickers

### AI ChatBot
- Floating chat button (bottom-right) with glow animation
- Slide-in chat panel (440x620px) with message history
- 6 pre-built suggested queries:
  - "Why is oil rising today?"
  - "What stocks benefit from a Taiwan blockade?"
  - "Simulate Russia reducing gas exports by 30%"
  - "Show latest sanctions"
  - "Should I buy energy stocks?"
  - "Generate an intelligence report"
- Structured responses with intent type, agents used, confidence score
- Enter to send, Escape to close
- Works fully offline with mock fallback

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
├── Header (theme toggle, title)
├── CountryNav (country selector with search)
├── main
│   ├── section (left panel)
│   │   ├── GlobeView (3D globe with hexbin + arcs)
│   │   └── MapView / CountryMap (Leaflet map)
│   │       └── (ports, trade routes, military relations)
│   └── aside (right sidebar)
│       ├── CountryMarkets (indices, tickers, mini chart)
│       ├── SignalDashboard (BUY/HOLD/SELL, risk meter)
│       ├── EventTimeline (event feed)
│       └── MarketCharts (price trends + sector performance)
└── ChatBot (floating AI assistant)
```

### Data Flow

```
User clicks country on globe
    │
    ▼
App.setState({ selectedCountry })
    │
    ├──► CountryMarkets fetches market prices
    ├──► SignalDashboard fetches analysis
    ├──► EventTimeline fetches events
    └──► MarketCharts fetches price history
         │
         ▼
    Each component:
        ├── tries backend API
        ├── falls back to local mock data
        └── renders result or loading/error state
```

### API Layer

```
Component
    │
    ▼
API Client (chatApi.ts / countryApi.ts / geopoliticalApi.ts / client.ts)
    │
    ├── checkBackend() → GET /api/health
    │       │
    │       ├── online → real API call
    │       └── offline → mock data
    │
    ├── Vite dev proxy (vite.config.ts)
    │       │
    │       └── rewrite: /api/* → /api/v1/*
    │
    └── Backend (localhost:8000)
```

### Backend Integration

| Frontend Call | Backend Route | Purpose |
|---------------|---------------|---------|
| `POST /api/chat` | `POST /api/v1/chat` | Chat query → structured response |
| `GET /api/health` | `GET /api/v1/health` | Backend availability check |
| `GET /api/events?limit=` | `GET /api/v1/events` | Event timeline data |
| `POST /api/analyze` | `POST /api/v1/analyze` | Market analysis for SignalDashboard |
| `GET /api/countries` | `GET /api/v1/countries` | All country data |
| `GET /api/countries/{code}` | `GET /api/v1/countries/{code}` | Single country |
| `GET /api/countries/{code}/relations/trade` | `/api/v1/countries/{code}/relations/trade` | Trade routes |
| `GET /api/countries/{code}/relations/military` | `/api/v1/countries/{code}/relations/military` | Military relations |
| `GET /api/countries/{code}/ports` | `/api/v1/countries/{code}/ports` | Ports |
| `GET /api/relations/trade` | `/api/v1/relations/trade` | All trade routes |
| `GET /api/relations/military` | `/api/v1/relations/military` | All military relations |
| `GET /api/ports` | `/api/v1/ports` | All port locations |
| `GET /api/market-prices/entity/{id}/recent` | `/api/v1/market-prices/entity/{id}/recent` | Price history |
| `GET /api/market-prices/entity/{id}/latest` | `/api/v1/market-prices/entity/{id}/latest` | Latest price |
| `ws://localhost:3000/ws` | `ws://localhost:8000/ws` | Real-time WebSocket |

---

## WebSocket Protocol

The frontend's `useWebSocket` hook connects to the backend and subscribes to channels:

```javascript
// Automatic on connect:
ws.send({ type: 'subscribe', channel: 'signals' })
ws.send({ type: 'subscribe', channel: 'events' })

// Receiving messages:
{ type: 'connected', client_id: 'uuid' }
{ type: 'subscribed', channel: 'signals' }

// SignalDashboard receives periodic analysis data:
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

The `SignalDashboard` component uses `useWebSocket` for real-time updates and falls back to 10-second polling when WebSocket is disconnected.

---

## Data Files

### `src/data/countries.ts`
53 countries with: `code`, `name`, `region`, `stockExchange`, `currency`, `currencySymbol`, `marketCap`, `tradingHours`, `tickers`, `lat`, `lng`, `commodities`, `ports`. Covers: Americas, Europe, Asia Pacific, Middle East & Africa.

### `src/data/relations.ts`
- `TradeRoute[]` — 40 routes with `from`, `to`, `value`, coordinates, `color`
- `MilitaryRelation[]` — 23 relations with `type` (alliance/rivalry/conflict/neutral), `label`, coordinates
- `PortData[]` — 69 port locations with `countryCode`, `lat`, `lng`, `volume` (major/medium/minor)

---

## Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   ├── chatApi.ts          # Chat query client + mock fallback
│   │   ├── client.ts            # Market analysis API + mock fallback
│   │   ├── countryApi.ts        # Country/relations/ports API + mock fallback
│   │   └── geopoliticalApi.ts   # Events + market prices API
│   ├── components/
│   │   ├── ChatBot.tsx          # Floating AI chatbot panel
│   │   ├── GlobeView.tsx        # 3D globe with hexbin heatmap + arcs
│   │   ├── MapView.tsx          # Country detail container
│   │   ├── CountryMap.tsx       # Leaflet map with ports + routes
│   │   ├── Header.tsx           # Top bar with theme toggle
│   │   ├── CountryNav.tsx       # Country selector bar with search
│   │   ├── CountryMarkets.tsx   # Country indices and mini chart
│   │   ├── MarketCharts.tsx     # Recharts price/sector charts
│   │   ├── SignalDashboard.tsx  # Real-time BUY/HOLD/SELL + risk
│   │   ├── EventTimeline.tsx    # Geopolitical event feed
│   │   ├── EmptyState.tsx       # Reusable empty/error state
│   │   ├── ErrorBoundary.tsx    # React error boundary
│   │   └── Skeleton.tsx         # Loading skeleton components
│   ├── hooks/
│   │   └── useWebSocket.ts     # WebSocket with auto-reconnect
│   ├── context/
│   │   └── ThemeContext.tsx     # Dark/light theme provider
│   ├── data/
│   │   ├── countries.ts         # 53 countries dataset
│   │   └── relations.ts         # Trade routes, military, ports
│   ├── utils/
│   │   └── geo.ts               # Haversine, bearing, destination
│   ├── App.tsx                  # Main app layout and state
│   ├── main.tsx                 # React entry with ThemeProvider
│   └── index.css                # Tailwind + custom styles + animations
├── vite.config.ts               # Vite dev proxy (/api → /api/v1)
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

## Offline Fallback System

Every API module auto-detects backend availability:

```
checkBackend() → GET /api/health (1-2s timeout)
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

## Development

```bash
# Install
npm install

# Development (port 3000)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

Set `VITE_API_BASE_URL` in `.env` to point to a different backend:

```
VITE_API_BASE_URL=http://localhost:8000
```
