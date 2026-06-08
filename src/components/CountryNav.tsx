import { useState } from 'react'
import { countries, flagFromCode, type Country } from '../data/countries'

interface Props {
  selectedCountry: Country | null
  onSelect: (country: Country | null) => void
}

const regions = ['Americas', 'Europe', 'Asia Pacific', 'Middle East & Africa']

export default function CountryNav({ selectedCountry, onSelect }: Props) {
  const [activeRegion, setActiveRegion] = useState<string>('Americas')

  const regionCountries = countries.filter(c => c.region === activeRegion)

  return (
    <div className="border-b dark:border-white/10 border-gray-200 dark:bg-gray-950 bg-white">
      <div className="flex items-center gap-1 px-4 pt-2 pb-1 overflow-x-auto scrollbar-none">
        {regions.map(region => (
          <button
            key={region}
            onClick={() => setActiveRegion(region)}
            className={`text-xs whitespace-nowrap px-3 py-1.5 rounded-t-lg font-medium transition-colors ${
              activeRegion === region
                ? 'dark:text-accent text-accent dark:border-b-2 border-b-2 border-accent dark:bg-white/5 bg-gray-100'
                : 'dark:text-gray-500 text-gray-500 hover:dark:text-gray-300 hover:text-gray-700'
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-1 px-4 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => onSelect(null)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
            !selectedCountry
              ? 'dark:bg-accent/20 bg-accent/10 dark:text-accent text-accent'
              : 'dark:hover:bg-white/5 hover:bg-gray-100 dark:text-gray-400 text-gray-600'
          }`}
        >
          🌍 All Markets
        </button>
        {regionCountries.map(country => (
          <button
            key={country.code}
            onClick={() => onSelect(country)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCountry?.code === country.code
                ? 'dark:bg-accent/20 bg-accent/10 dark:text-accent text-accent dark:border-accent/30 border-accent/20 border'
                : 'dark:hover:bg-white/5 hover:bg-gray-100 dark:text-gray-400 text-gray-600'
            }`}
          >
            <span>{flagFromCode(country.code)}</span>
            <span>{country.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
