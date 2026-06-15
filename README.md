# MarketAtlas — Frontend

**AI-Powered Geopolitical Trading Intelligence Platform** — an interactive command center for traders, analysts, and researchers.

MarketAtlas transforms global political, economic, and conflict-related events into actionable trading insights. This frontend provides a 3D globe interface, country-level market dashboards, and an integrated AI chatbot powered by the MarketAtlas Chat backend.

---

## Features

### 🤖 AI Chatbot (New)
- Floating chat button in the bottom-right corner
- Full chat panel with message history, loading states, and suggested queries
- **6 pre-built suggested queries** for quick testing:
  - "Why is oil rising today?"
  - "What stocks benefit from a Taiwan blockade?"
  - "Simulate Russia reducing gas exports by 30%"
  - "Show latest sanctions"
  - "Should I buy energy stocks?"
  - "Generate an intelligence report"
- **Intelligent routing** — queries are classified and sent to the right backend agents
- **Structured responses** with intent type, agent list, and confidence score
- **Mock fallback** — works fully offline with realistic responses when backend is unavailable
- **WebSocket support** — ready for streaming responses when backend is connected
- **Typed API contracts** — full TypeScript interfaces for all backend endpoint responses
- Escape key to close chat, Enter to send

### 🏛️ Full API Contract Layer
- `src/api/chatApi.ts` — typed `ChatResponse`, `IntelligenceReport`, `SimulationResult` interfaces
- `src/api/endpoints.ts` — centralized endpoint definitions and `WebSocketMessage` types
- Auto-detects backend availability with health checks
- Graceful degradation to mock data when offline

### 🌍 Interactive 3D Globe
- Powered by [Globe.gl](https://globe.gl) with Three.js/WebGL rendering
- Hexbin population heatmap aggregating 60+ world cities with dynamic color scale (purple → amber by density)
- Animated arc flows representing capital movements between major financial hubs
- Earth-night texture with bump mapping and atmospheric glow
- Auto-rotation with orbit controls
- Dynamic overlay shows selected country info when a market is chosen

### 🏳️ Country Explorer
- Horizontal scrollable nav bar with 50+ countries grouped by region (Americas, Europe, Asia Pacific, Middle East & Africa)
- Search input to quickly filter countries by name or code
- Country flags rendered via Unicode regional indicators
- Click any country to drill into its market data
- "All Markets" quick-reset button

### 🗺️ Interactive Country Maps
- Click a country on the 3D globe to open a full-screen interactive Leaflet map
- Adaptive zoom levels based on country size
- Port markers color-coded and sized by volume (major/medium/minor)
- Trade route arcs with export/import value tooltips
- Trade partner markers at partner country coordinates
- Dark-mode aware tile layers
- Escape key to return to globe view

### 🏦 Country Markets Dashboard
- Country header with flag, stock exchange name, currency, market cap, and trading hours
- Major indices with live price and percent change indicators
- 30-day mini price chart for the primary index
- Notable ticker badges for quick reference

### 📊 Signal Dashboard
- Real-time BUY / HOLD / SELL recommendation cards with confidence scores
- Market stats: momentum, volatility, volume status
- Geopolitical risk meter with gradient bar and severity labels
- Country-aware — uses the selected country's primary ticker

### 📰 Event Timeline
- Curated feed of geopolitical events affecting financial markets
- Type indicators with color-coded borders
- Region badges with contextual coloring
- Relative timestamps

### 📈 Market Analytics
- Dual-view chart panel: Price Trends (area chart) + Sector Performance (bar chart)
- Country-aware — chart lines dynamically update to the selected country's tickers

### 🎨 Theme Support
- Dark mode (default) and light mode
- Theme persisted to localStorage
- Smooth toggle via sun/moon button in header

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
| HTTP Client | Fetch API (built-in) |
| Font | Inter (Google Fonts) |

---

## Project Structure

```
frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── api/
│   │   ├── client.ts           # Analysis API client (legacy)
│   │   ├── countryApi.ts       # Country/relations/ports API
│   │   ├── chatApi.ts          # Chat API client + mock fallback
│   │   └── endpoints.ts        # Centralized endpoint contracts
│   ├── components/
│   │   ├── ChatBot.tsx          # AI chatbot floating panel
│   │   ├── GlobeView.tsx        # 3D globe with hexbin heatmap + arcs
│   │   ├── MapView.tsx          # Country detail view
│   │   ├── CountryMap.tsx       # Leaflet interactive map
│   │   ├── Header.tsx           # Top bar with theme toggle
│   │   ├── CountryNav.tsx       # Country selector with search
│   │   ├── CountryMarkets.tsx   # Country indices and charts
│   │   ├── MarketCharts.tsx     # Recharts price/sector charts
│   │   ├── SignalDashboard.tsx  # BUY/HOLD/SELL recommendations
│   │   └── EventTimeline.tsx    # Geopolitical event feed
│   ├── context/
│   │   └── ThemeContext.tsx     # Dark/light theme provider
│   ├── data/
│   │   ├── countries.ts         # 50+ countries dataset
│   │   └── relations.ts         # Trade routes, military, ports
│   ├── utils/
│   │   └── geo.ts               # Haversine, bearing, destination
│   ├── App.tsx                  # Main app layout
│   ├── main.tsx                 # React entry point
│   └── index.css                # Tailwind + custom styles
├── index.html
├── vite.config.ts               # Vite dev proxy config
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js >= 20

### Install
```bash
npm install
```

### Development
```bash
npm run dev
```
Opens on `http://localhost:3000`. The backend is optional — the frontend automatically falls back to realistic mock data when the backend is offline.

### Production Build
```bash
npm run build
```
Output in `dist/`.

---

## Backend Integration

The frontend connects to the MarketAtlas Chat backend (`github.com/MarketAtlasX/chat-bot`) via a Vite dev proxy.

### Proxy Configuration

The Vite config (`vite.config.ts`) rewrites API routes:
```
Frontend /api/*  ──►  Backend http://localhost:8000/api/v1/*
```

### API Endpoints

| Frontend Call | Backend Route | Description |
|---------------|---------------|-------------|
| `POST /api/chat` | `POST /api/v1/chat` | Send query, receive structured response |
| `POST /api/chat/stream` | `POST /api/v1/chat/stream` | NDJSON-streamed response chunks |
| `GET /api/health` | `GET /api/v1/health` | Backend availability check |
| `GET /api/history` | `GET /api/v1/history` | Past conversation history |
| `GET /api/memory/{id}` | `GET /api/v1/memory/{id}` | Conversation memory |
| `GET /api/knowledge/search?q=` | `GET /api/v1/knowledge/search` | RAG vector search |
| `GET /api/graph/{entity}` | `GET /api/v1/graph/{entity}` | Knowledge graph query |
| `ws://localhost:3000/ws` | `ws://localhost:8000/ws` | WebSocket streaming chat |

### API Clients

#### `src/api/chatApi.ts` — Chat Client
- `sendChat(query)` → `Promise<ChatResponse>`
- `ChatResponse` includes: `conversation_id`, `query`, `response`, `intent`, `agents_used`, `confidence`, `sources`
- Also exports: `IntelligenceReport`, `SimulationResult` interfaces

#### `src/api/endpoints.ts` — Contract Definitions
- `ENDPOINTS` constant with all route definitions
- `WebSocketMessage` typed union for WebSocket protocol
- `API_BASE` constant for route construction

#### `src/api/client.ts` — Legacy Analysis Client
- `analyze(text, symbol?)` for market analysis
- Falls back to `generateMockData()` when backend offline

#### `src/api/countryApi.ts` — Country Data Client
- `fetchCountries()`, `fetchCountry(code)`, `fetchTradeRoutes(code)`, etc.
- All functions fall back to local mock data modules

### WebSocket Protocol

```javascript
const ws = new WebSocket('ws://localhost:3000/ws')

// Send a query
ws.send(JSON.stringify({
  query: 'Why is oil rising today?',
  conversation_id: 'optional-uuid',
  stream: true  // or false for full response
}))

// Receive messages
ws.onmessage = (e) => {
  const msg = JSON.parse(e.data)
  switch (msg.type) {
    case 'connected':    console.log('Client ID:', msg.client_id); break
    case 'metadata':     console.log('Intent:', msg.intent); break
    case 'chunk':        console.log('Stream chunk:', msg.text); break
    case 'stream_end':   console.log('Stream complete'); break
    case 'response':     console.log('Full response:', msg.response); break
    case 'error':        console.error('Error:', msg.message); break
  }
}
```

---

## Mock Data System

The frontend is fully functional without a backend. Every API client has a mock fallback:

| Client | Mock Source | Data Quality |
|--------|-------------|--------------|
| `chatApi.ts` | `mockChatResponse()` | Keyword-aware responses with proper intent routing |
| `client.ts` | `generateMockData()` | Realistic market snapshots with random variance |
| `countryApi.ts` | `src/data/countries.ts` + `relations.ts` | 50+ countries with real geo data |

---

## Recent Changes

- **ChatBot integration** — Floating AI assistant with 6 suggested queries, message history, and loading states
- **API contracts** — Typed `endpoints.ts` with all route definitions and `WebSocketMessage` type
- **Chat API client** — `chatApi.ts` with backend detection, mock fallback, and `IntelligenceReport`/`SimulationResult` types
- **Vite proxy** — Rewrites `/api/*` → `/api/v1/*` for backend route prefix alignment
- **Chat animations** — Slide-in-from-bottom panel animation with Tailwind CSS

---

## License

MIT
