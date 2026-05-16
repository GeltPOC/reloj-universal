'use client'
import { useState } from 'react'
import { HeroLocalClock } from './HeroLocalClock'
import { SearchBar } from './SearchBar'
import { ClockCard } from './ClockCard'
import type { TimezoneEntry } from '../data/timezones'
import { TIMEZONES } from '../data/timezones'

const DEFAULT_CITIES = ['Madrid', 'Nueva York', 'Tokio', 'Londres', 'Dubái']
const defaultEntries = DEFAULT_CITIES.map(name =>
  TIMEZONES.find(tz => tz.city === name)!
).filter(Boolean)

export function WorldClock() {
  const [clocks, setClocks] = useState<TimezoneEntry[]>(defaultEntries)

  const addClock = (entry: TimezoneEntry) => {
    setClocks(prev => {
      const exists = prev.some(e => e.city === entry.city && e.timezone === entry.timezone)
      if (exists) return prev
      return [...prev, entry]
    })
  }

  const removeClock = (index: number) => {
    setClocks(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-96 h-48 bg-indigo-600/8 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        {/* Hero */}
        <div className="border-b border-white/5 bg-white/[0.02]">
          <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
                🌍 Reloj Universal
              </h1>
              <p className="text-gray-400 text-sm">
                Hora en tiempo real de cualquier ciudad del mundo
              </p>
            </div>

            <HeroLocalClock />
          </div>
        </div>

        {/* Search + Content */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Search */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            <SearchBar onAdd={addClock} existing={clocks} />
            <div className="text-gray-600 text-sm whitespace-nowrap">
              {clocks.length} {clocks.length === 1 ? 'ciudad' : 'ciudades'}
            </div>
          </div>

          {/* Grid */}
          {clocks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {clocks.map((entry, i) => (
                <ClockCard
                  key={`${entry.city}-${entry.timezone}-${i}`}
                  entry={entry}
                  onRemove={() => removeClock(i)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-600">
              <div className="text-5xl mb-4">🕐</div>
              <p className="text-lg font-medium text-gray-500">No hay relojes añadidos</p>
              <p className="text-sm mt-1">Usa el buscador para añadir ciudades</p>
            </div>
          )}

          {/* Quick add chips */}
          <div className="mt-8 border-t border-white/5 pt-6">
            <p className="text-gray-600 text-xs mb-3">Sugerencias rápidas:</p>
            <div className="flex flex-wrap gap-2">
              {['São Paulo', 'Moscú', 'Singapur', 'Sídney', 'Los Ángeles', 'Mumbai', 'Johanesburgo', 'Ciudad de México'].map(name => {
                const entry = TIMEZONES.find(tz => tz.city === name)
                if (!entry) return null
                const added = clocks.some(c => c.city === entry.city && c.timezone === entry.timezone)
                return (
                  <button
                    key={name}
                    onClick={() => !added && addClock(entry)}
                    disabled={added}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all ${
                      added
                        ? 'border-green-500/30 text-green-500/50 cursor-default'
                        : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white cursor-pointer'
                    }`}
                  >
                    <span>{entry.flag}</span>
                    <span>{name}</span>
                    {added && <span>✓</span>}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/5 mt-4">
          <div className="max-w-6xl mx-auto px-4 py-4 text-center text-gray-700 text-xs">
            Reloj Universal · {TIMEZONES.length} zonas horarias disponibles
          </div>
        </div>
      </div>
    </div>
  )
}
