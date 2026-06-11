import { useEffect, useRef, useState } from 'react'
import createGlobe from 'globe.gl'
import { countries, type Country } from '../data/countries'
import { tradeRoutes, militaryRelations, portLocations } from '../data/relations'
import { haversineDistance } from '../utils/geo'

const Globe = createGlobe as unknown as (...args: unknown[]) => any

const cityData = [
  { lat: 31.2304, lng: 121.4737, value: 24.5, country: 'Shanghai' },
  { lat: 23.1291, lng: 113.2644, value: 18.0, country: 'Guangzhou' },
  { lat: 39.9042, lng: 116.4074, value: 21.5, country: 'Beijing' },
  { lat: 22.5431, lng: 114.0579, value: 15.3, country: 'Shenzhen' },
  { lat: 19.076, lng: 72.8777, value: 20.0, country: 'Mumbai' },
  { lat: 28.6139, lng: 77.209, value: 19.5, country: 'Delhi' },
  { lat: 13.0827, lng: 80.2707, value: 11.0, country: 'Chennai' },
  { lat: 22.5726, lng: 88.3639, value: 14.5, country: 'Kolkata' },
  { lat: 12.9716, lng: 77.5946, value: 12.0, country: 'Bangalore' },
  { lat: 40.7128, lng: -74.006, value: 18.8, country: 'New York' },
  { lat: 34.0522, lng: -118.2437, value: 12.5, country: 'Los Angeles' },
  { lat: 41.8781, lng: -87.6298, value: 9.5, country: 'Chicago' },
  { lat: 29.7604, lng: -95.3698, value: 7.0, country: 'Houston' },
  { lat: 33.4484, lng: -112.074, value: 5.0, country: 'Phoenix' },
  { lat: 37.7749, lng: -122.4194, value: 8.5, country: 'San Francisco' },
  { lat: 35.6762, lng: 139.6503, value: 13.9, country: 'Tokyo' },
  { lat: 34.6937, lng: 135.5023, value: 19.0, country: 'Osaka' },
  { lat: 35.1796, lng: 136.9067, value: 8.0, country: 'Nagoya' },
  { lat: 37.5665, lng: 126.978, value: 9.5, country: 'Seoul' },
  { lat: 22.3193, lng: 114.1694, value: 7.5, country: 'Hong Kong' },
  { lat: 1.3521, lng: 103.8198, value: 5.5, country: 'Singapore' },
  { lat: 3.139, lng: 101.6869, value: 7.0, country: 'Kuala Lumpur' },
  { lat: -6.2088, lng: 106.8456, value: 10.5, country: 'Jakarta' },
  { lat: 14.5995, lng: 120.9842, value: 13.0, country: 'Manila' },
  { lat: 13.7563, lng: 100.5018, value: 10.0, country: 'Bangkok' },
  { lat: 21.0278, lng: 105.8342, value: 8.0, country: 'Hanoi' },
  { lat: 10.8231, lng: 106.6297, value: 9.0, country: 'Ho Chi Minh' },
  { lat: 48.8566, lng: 2.3522, value: 11.0, country: 'Paris' },
  { lat: 51.5074, lng: -0.1278, value: 14.0, country: 'London' },
  { lat: 52.52, lng: 13.405, value: 6.0, country: 'Berlin' },
  { lat: 41.9028, lng: 12.4964, value: 4.3, country: 'Rome' },
  { lat: 40.4168, lng: -3.7038, value: 6.5, country: 'Madrid' },
  { lat: 55.7558, lng: 37.6173, value: 12.5, country: 'Moscow' },
  { lat: 59.9343, lng: 30.3351, value: 5.4, country: 'St Petersburg' },
  { lat: 52.2298, lng: 21.0122, value: 1.8, country: 'Warsaw' },
  { lat: -33.8688, lng: 151.2093, value: 5.2, country: 'Sydney' },
  { lat: -37.8136, lng: 144.9631, value: 5.0, country: 'Melbourne' },
  { lat: -23.5505, lng: -46.6333, value: 12.2, country: 'Sao Paulo' },
  { lat: -22.9068, lng: -43.1729, value: 6.5, country: 'Rio de Janeiro' },
  { lat: -15.8267, lng: -47.9218, value: 4.5, country: 'Brasilia' },
  { lat: -34.6037, lng: -58.3816, value: 15.0, country: 'Buenos Aires' },
  { lat: -33.4691, lng: -70.642, value: 7.0, country: 'Santiago' },
  { lat: 19.4326, lng: -99.1332, value: 21.5, country: 'Mexico City' },
  { lat: 10.4806, lng: -66.9036, value: 3.0, country: 'Caracas' },
  { lat: 6.5244, lng: 3.3792, value: 14.0, country: 'Lagos' },
  { lat: 30.0444, lng: 31.2357, value: 9.0, country: 'Cairo' },
  { lat: -25.7461, lng: 28.1881, value: 4.5, country: 'Pretoria' },
  { lat: -33.9249, lng: 18.4241, value: 4.0, country: 'Cape Town' },
  { lat: -1.2864, lng: 36.8172, value: 5.0, country: 'Nairobi' },
  { lat: 9.032, lng: 38.7469, value: 5.0, country: 'Addis Ababa' },
  { lat: 34.0076, lng: 71.5781, value: 4.0, country: 'Islamabad' },
  { lat: 25.2048, lng: 55.2708, value: 3.0, country: 'Dubai' },
  { lat: 24.7136, lng: 46.6753, value: 7.5, country: 'Riyadh' },
  { lat: 35.6892, lng: 51.389, value: 9.0, country: 'Tehran' },
  { lat: 41.0082, lng: 28.9784, value: 15.5, country: 'Istanbul' },
  { lat: -7.2575, lng: 112.7521, value: 5.0, country: 'Surabaya' },
  { lat: 23.0225, lng: 72.5714, value: 8.0, country: 'Ahmedabad' },
  { lat: 17.385, lng: 78.4867, value: 8.5, country: 'Hyderabad' },
  { lat: -8.3405, lng: 115.092, value: 1.5, country: 'Denpasar' },
  { lat: 38.9072, lng: -77.0369, value: 6.0, country: 'Washington DC' },
]

interface GlobeViewProps {
  selectedCountry: Country | null
  onCountryClick: (country: Country) => void
  onOpenMap: () => void
}

function findNearestCountry(lat: number, lng: number): Country | null {
  let nearest: Country | null = null
  let minDist = Infinity
  for (const c of countries) {
    const dist = haversineDistance(lat, lng, c.lat, c.lng)
    if (dist < minDist && dist < 2000) {
      minDist = dist
      nearest = c
    }
  }
  return nearest
}

export default function GlobeView({ selectedCountry, onCountryClick, onOpenMap }: GlobeViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const globeRef = useRef<any>(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })
  const mapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const clickLockRef = useRef(false)

  const countryLabels = countries.map(c => ({
    lat: c.lat,
    lng: c.lng,
    label: c.code,
    size: 0.5,
    color: 'rgba(255,255,255,0.85)',
    country: c,
  }))

  const portPoints = portLocations.map(p => ({
    lat: p.lat,
    lng: p.lng,
    name: p.name,
    radius: p.volume === 'major' ? 0.4 : 0.25,
    color: '#00d4ff',
  }))

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current
        setDimensions({ width: clientWidth, height: clientHeight })
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    const globe = Globe()
      .globeImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg')
      .bumpImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png')
      .backgroundImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png')
      .width(dimensions.width)
      .height(dimensions.height)
      .hexBinPointsData(cityData)
      .hexBinPointWeight('value')
      .hexBinResolution(4)
      .hexAltitude((d: any) => d.sumWeight * 4e-3)
      .hexTopColor((d: any) => {
        const t = Math.min(d.sumWeight / 22, 1)
        if (t < 0.2) return '#440088'
        if (t < 0.4) return '#224488'
        if (t < 0.6) return '#228844'
        if (t < 0.8) return '#88aa22'
        return '#ffaa00'
      })
      .hexSideColor((d: any) => {
        const t = Math.min(d.sumWeight / 22, 1)
        if (t < 0.2) return '#330066'
        if (t < 0.4) return '#113366'
        if (t < 0.6) return '#116633'
        if (t < 0.8) return '#668822'
        return '#cc8800'
      })
      .hexBinMerge(true)
      .hexLabel((d: any) => {
        const pts = d.points as Array<{ country: string; lat: number; lng: number }>
        const topCities = pts
          .sort((a, b) => (b as any).value - (a as any).value)
          .slice(0, 3)
          .map(p => `${p.country}: ${(p as any).value}M`)
          .join('<br/>')
        return `<div style="background:rgba(0,0,0,0.85);color:white;padding:8px 12px;border-radius:8px;font-size:12px;line-height:1.4">
          <b>Population Cluster</b><br/>${topCities}
        </div>`
      })
      // Country labels
      .labelsData(countryLabels)
      .labelLat('lat')
      .labelLng('lng')
      .labelText('label')
      .labelSize('size')
      .labelColor('color')
      .labelDotRadius(0.2)
      .labelDotOrientation('bottom')
      // Port points
      .pointsData(portPoints)
      .pointLat('lat')
      .pointLng('lng')
      .pointColor('color')
      .pointAltitude(0.05)
      .pointRadius('radius')
      .pointsMerge(true)
      // Trade route arcs
      .arcsData(tradeRoutes.map(r => ({
        startLat: r.fromLat, startLng: r.fromLng,
        endLat: r.toLat, endLng: r.toLng,
        color: r.color, type: 'trade',
      })).concat(militaryRelations.map(r => ({
        startLat: r.fromLat, startLng: r.fromLng,
        endLat: r.toLat, endLng: r.toLng,
        color: r.type === 'alliance' ? '#44ff88' : r.type === 'rivalry' ? '#ff4444' : '#ffaa00',
        type: r.type,
      }))))
      .arcColor('color')
      .arcDashLength(0.3)
      .arcDashGap(0.15)
      .arcDashAnimateTime(2500)
      .arcStroke(0.5)
      // Atmosphere
      .atmosphereColor('#7b2ff7')
      .atmosphereAltitude(0.25)

    globe(containerRef.current)
    globeRef.current = globe

    globe.controls().autoRotate = true
    globe.controls().autoRotateSpeed = 0.6
    globe.controls().enableZoom = true

    globe.onGlobeClick(({ lat: clickLat, lng: clickLng }: { lat: number; lng: number }) => {
      if (clickLockRef.current) return
      clickLockRef.current = true

      const country = findNearestCountry(clickLat, clickLng)
      if (!country) {
        clickLockRef.current = false
        return
      }

      onCountryClick(country)

      globe.controls().autoRotate = false
      globe.controls().autoRotateSpeed = 0

      globe.pointOfView({ lat: country.lat, lng: country.lng, altitude: 1.5 }, 1000)

      if (mapTimerRef.current) clearTimeout(mapTimerRef.current)
      mapTimerRef.current = setTimeout(() => {
        onOpenMap()
        clickLockRef.current = false
      }, 800)
    })

    return () => {
      if (mapTimerRef.current) clearTimeout(mapTimerRef.current)
      if (globeRef.current) {
        globeRef.current._destructor?.()
      }
    }
  }, [dimensions])

  // Update data layers when selectedCountry changes
  useEffect(() => {
    const globe = globeRef.current
    if (!globe) return

    if (selectedCountry) {
      const relatedTrade = tradeRoutes.filter(
        r => r.from === selectedCountry.code || r.to === selectedCountry.code
      )
      const relatedMilitary = militaryRelations.filter(
        r => r.countryA === selectedCountry.code || r.countryB === selectedCountry.code
      )
      const relPorts = portLocations.filter(p => p.countryCode === selectedCountry.code)

      const allArcs = [
        ...relatedTrade.map(r => ({
          startLat: r.fromLat, startLng: r.fromLng,
          endLat: r.toLat, endLng: r.toLng,
          color: r.color, type: 'trade',
        })),
        ...relatedMilitary.map(r => ({
          startLat: r.fromLat, startLng: r.fromLng,
          endLat: r.toLat, endLng: r.toLng,
          color: r.type === 'alliance' ? '#44ff88' : r.type === 'rivalry' ? '#ff4444' : '#ffaa00',
          type: r.type,
        })),
      ]

      globe.arcsData(allArcs)
      globe.arcColor('color')
      globe.arcDashLength(0.3)
      globe.arcDashGap(0.15)
      globe.arcDashAnimateTime(2000)
      globe.arcStroke(0.8)

      globe.pointsData(relPorts.length > 0
        ? relPorts.map(p => ({ lat: p.lat, lng: p.lng, name: p.name, radius: 0.5, color: '#00ff88' }))
        : portPoints
      )

      globe.labelsData(countryLabels.map(l => ({
        ...l,
        color: l.country.code === selectedCountry.code ? '#ffaa00' : 'rgba(255,255,255,0.6)',
        size: l.country.code === selectedCountry.code ? 0.8 : 0.4,
      })))

      globe.controls().autoRotate = false
      globe.pointOfView({ lat: selectedCountry.lat, lng: selectedCountry.lng, altitude: 1.5 }, 1000)
    } else {
      // Reset to global view with default data
      const allTradeArcs = tradeRoutes.map(r => ({
        startLat: r.fromLat, startLng: r.fromLng,
        endLat: r.toLat, endLng: r.toLng,
        color: r.color, type: 'trade',
      }))
      const allMilitaryArcs = militaryRelations.map(r => ({
        startLat: r.fromLat, startLng: r.fromLng,
        endLat: r.toLat, endLng: r.toLng,
        color: r.type === 'alliance' ? '#44ff88' : r.type === 'rivalry' ? '#ff4444' : '#ffaa00',
        type: r.type,
      }))

      globe.arcsData([...allTradeArcs, ...allMilitaryArcs])
      globe.arcColor('color')
      globe.arcDashLength(0.3)
      globe.arcDashGap(0.15)
      globe.arcDashAnimateTime(2500)
      globe.arcStroke(0.5)

      globe.pointsData(portPoints)

      globe.labelsData(countryLabels)

      globe.controls().autoRotate = true
      globe.controls().autoRotateSpeed = 0.6
    }
  }, [selectedCountry])

  return (
    <div ref={containerRef} className="globe-container w-full h-full relative" />
  )
}
