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

### 📊 Signal Dashboard
- Real-time **BUY / HOLD / SELL** recommendation cards with confidence scores
- Market stats: momentum (positive/negative), volatility, volume status (surge/normal/thin)
- Geopolitical risk meter with gradient bar and severity labels

### 📰 Event Timeline
- Curated feed of geopolitical events affecting financial markets
- Type indicators (positive / negative / neutral) with color-coded borders
- Region badges with contextual coloring
- Relative timestamps

### 📈 Market Analytics
- Dual-view chart panel (Recharts):
  - **Price Trends** — area chart for SPY/QQQ with gradient fills
  - **Sector Performance** — horizontal bar chart for Technology, Energy, Finance, and more
- Custom tooltips with formatted price display

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
│   │   └── client.ts          # Axios API client + mock fallback
│   ├── components/
│   │   ├── GlobeView.tsx       # 3D globe with hexbin heatmap + arcs
│   │   ├── Header.tsx          # Top bar with theme toggle
│   │   ├── MarketCharts.tsx    # Recharts price/sector charts
│   │   ├── SignalDashboard.tsx # BUY/HOLD/SELL cards + risk meter
│   │   └── EventTimeline.tsx   # Geopolitical event feed
│   ├── context/
│   │   └── ThemeContext.tsx    # Dark/light theme provider
│   ├── App.tsx                 # Main layout (globe + sidebar)
│   ├── main.tsx                # React entry point
│   └── index.css               # Tailwind CSS v4 imports
├── index.html
├── vite.config.ts              # Vite config with proxy
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
| `/api/analyze` | `POST http://localhost:8000/analyze` |
| `/api/health` | `GET http://localhost:8000/health` |

The API client (`src/api/client.ts`) detects backend availability with a **1-second health probe** and automatically serves realistic mock data when the backend is unreachable. No backend setup required for frontend development.

---

## License

MIT
