# MarketAtlas — Frontend

**AI-Powered Geopolitical Trading Intelligence Platform**

MarketAtlas is an end-to-end geopolitical intelligence and market analysis platform that transforms global political, economic, and conflict-related events into actionable trading insights. This is the frontend dashboard — an interactive command center for traders, analysts, and researchers.

---

## Features

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
- Click a country on the 3D globe to open a full-screen interactive Leaflet map of that country
- Adaptive zoom levels based on country size (4 for large, 5 for medium, 9 for small countries)
- **Port markers** — color-coded and sized by volume (major/medium/minor) with tooltips
- **Trade route arcs** — dashed directional arcs from the country center toward trade partners with export/import value tooltips
- **Trade partner markers** — cyan markers at partner country coordinates with name tooltips
- Dark-mode aware tile layers (Stadia Maps dark tiles in dark mode, OpenStreetMap in light mode)
- Escape key to return to globe view

### 🏦 Country Markets Dashboard
- Country header with flag, stock exchange name, currency, market cap, and trading hours
- Major indices with live price and percent change indicators (green/red)
- 30-day mini price chart for the primary index (Recharts `LineChart`)
- Notable ticker badges for quick reference

### 📊 Signal Dashboard
- Real-time **BUY / HOLD / SELL** recommendation cards with confidence scores
- Market stats: momentum (positive/negative), volatility, volume status (surge/normal/thin)
- Geopolitical risk meter with gradient bar and severity labels
- **Country-aware** — uses the selected country's primary ticker when a country is chosen

### 📰 Event Timeline
- Curated feed of geopolitical events affecting financial markets
- Type indicators (positive / negative / neutral) with color-coded borders
- Region badges with contextual coloring
- Relative timestamps

### 📈 Market Analytics
- Dual-view chart panel (Recharts):
  - **Price Trends** — area chart showing the selected country's top tickers with gradient fills
  - **Sector Performance** — horizontal bar chart for Technology, Energy, Finance, and more
- Custom tooltips with formatted price display
- **Country-aware** — chart lines dynamically update to the selected country's ticker symbols

### 🎨 Theme Support
- Dark mode (default) and light mode
- Theme persisted to `localStorage`
- Smooth toggle via sun/moon button in header

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| 3D Visualization | Globe.gl (Three.js / WebGL) |
| Maps | Leaflet + React-Leaflet |
| Charts | Recharts |
| Icons | Lucide React |
| HTTP Client | Axios |
| Font | Inter (Google Fonts) |

---

## Project Structure

```
frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── api/
│   │   ├── client.ts           # Axios API client + mock fallback
│   │   └── countryApi.ts       # Country/relations/ports API service
│   ├── components/
│   │   ├── GlobeView.tsx        # 3D globe with hexbin heatmap + arcs + country labels
│   │   ├── MapView.tsx          # Country detail view (map + info panels)
│   │   ├── CountryMap.tsx       # Leaflet interactive map with ports, trade arcs, partners
│   │   ├── Header.tsx           # Top bar with theme toggle
│   │   ├── CountryNav.tsx       # Country selector with region tabs and search
│   │   ├── CountryMarkets.tsx   # Country-specific indices, charts, and tickers
│   │   ├── MarketCharts.tsx     # Recharts price/sector charts (country-aware)
│   │   ├── SignalDashboard.tsx  # BUY/HOLD/SELL cards + risk meter (country-aware)
│   │   └── EventTimeline.tsx    # Geopolitical event feed
│   ├── context/
│   │   └── ThemeContext.tsx     # Dark/light theme provider
│   ├── data/
│   │   ├── countries.ts         # 50+ countries with geo coords, commodities, ports
│   │   └── relations.ts         # Trade routes, military relations, port locations
│   ├── utils/
│   │   └── geo.ts               # Haversine, bearing, destination helpers
│   ├── App.tsx                  # App layout with map/globe view switching
│   ├── main.tsx                 # React entry point
│   └── index.css                # Tailwind CSS v4 imports
├── index.html
├── vite.config.ts               # Vite config with proxy
├── tsconfig.json
├── package.json
└── README.md
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

### Preview Build
```bash
npm run preview
```

---

## Backend Integration

The frontend connects to the MarketAtlas backend microservices via a Vite proxy:

| Frontend Route | Backend Target |
|---------------|---------------|
| `/api/health` | `GET http://localhost:8000/health` |
| `/api/analyze` | `POST http://localhost:8000/analyze` |
| `/api/countries` | `GET http://localhost:8000/countries` |
| `/api/countries/:code` | `GET http://localhost:8000/countries/:code` |
| `/api/countries/:code/relations/trade` | `GET http://localhost:8000/countries/:code/relations/trade` |
| `/api/countries/:code/relations/military` | `GET http://localhost:8000/countries/:code/relations/military` |
| `/api/countries/:code/ports` | `GET http://localhost:8000/countries/:code/ports` |

### API Clients

- **`src/api/client.ts`** — Analysis endpoint (`/api/analyze`) with 1-second health probe and mock fallback. The `analyze()` function accepts an optional `symbol` parameter for country-specific ticker data.
- **`src/api/countryApi.ts`** — Country data service providing `fetchCountries()`, `fetchCountry()`, `fetchTradeRoutes()`, `fetchMilitaryRelations()`, `fetchPorts()`. All functions check backend health and gracefully fall back to local mock data modules (`src/data/countries.ts`, `src/data/relations.ts`) when the backend is unreachable.

No backend setup required for frontend development — all data falls back to realistic local datasets automatically.

---

## License

MIT
