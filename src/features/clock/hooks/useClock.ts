'use client'
import { useState, useEffect } from 'react'
import type { TimezoneEntry } from '../data/timezones'

export interface ClockInfo {
  entry: TimezoneEntry
  time: string
  date: string
  utcOffset: string
  hours: number
  minutes: number
  seconds: number
  isDay: boolean
}

function getClockInfo(entry: TimezoneEntry): ClockInfo {
  const now = new Date()

  const timeStr = now.toLocaleTimeString('es-ES', {
    timeZone: entry.timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  const dateStr = now.toLocaleDateString('es-ES', {
    timeZone: entry.timezone,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const parts = timeStr.split(':')
  const hours = parseInt(parts[0] ?? '0', 10)
  const minutes = parseInt(parts[1] ?? '0', 10)
  const seconds = parseInt(parts[2] ?? '0', 10)

  const utcOffsetStr = now.toLocaleString('en-US', {
    timeZone: entry.timezone,
    timeZoneName: 'short',
  })
  const tzMatch = utcOffsetStr.match(/GMT[+-]\d+(?::\d+)?/)
  const utcOffset = tzMatch ? tzMatch[0] : 'UTC'

  const isDay = hours >= 6 && hours < 20

  return { entry, time: timeStr, date: dateStr, utcOffset, hours, minutes, seconds, isDay }
}

export function useClock(entry: TimezoneEntry): ClockInfo {
  const [info, setInfo] = useState<ClockInfo>(() => getClockInfo(entry))

  useEffect(() => {
    const tick = () => setInfo(getClockInfo(entry))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [entry])

  return info
}

export function useLocalClock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}
