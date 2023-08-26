import { MouseEvent, ChangeEvent, useReducer } from 'react'
import styles from '../assets/main.module.scss'
// types
import { IntervalTinkoff } from 'src/types/tinkoff'

const initialState = {
  '1m': false,
  '2m': false,
  '3m': false,
  '5m': false,
  '10m': false,
  '15m': false,
  '30m': false,
  '1h': false,
  '2h': false,
  '4h': false,
  '1d': false,
  '7 days': false,
  '30 days': false
}

const reducer = (state: typeof initialState, action: IntervalTinkoff) => {
  return { ...state, [action]: !state[action] }
}

export default function Main() {
  const [intervals, dispatch] = useReducer(reducer, initialState)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const interval = e.target.name.split('-')[1] as IntervalTinkoff
    dispatch(interval)
  }

  const handleAnalyse = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    const data: string[] = []
    for (const [key, value] of Object.entries(intervals)) {
      if (value) data.push(key)
    }

    window.api.send('schedule', data)
  }

  return (
    <div>
      <h2>Main</h2>
      <div className={styles.intervals}>
        <label htmlFor="interval-1m">
          <input
            type="checkbox"
            name="interval-1m"
            id="interval-1m"
            checked={intervals['1m']}
            onChange={handleChange}
          />
          1m Interval
        </label>
        <label htmlFor="interval-2m">
          <input
            type="checkbox"
            name="interval-2m"
            id="interval-2m"
            checked={intervals['2m']}
            onChange={handleChange}
          />
          2m Interval
        </label>
        <label htmlFor="interval-3m">
          <input
            type="checkbox"
            name="interval-3m"
            id="interval-3m"
            checked={intervals['3m']}
            onChange={handleChange}
          />
          3m Interval
        </label>
        <label htmlFor="interval-5m">
          <input
            type="checkbox"
            name="interval-5m"
            id="interval-5m"
            checked={intervals['5m']}
            onChange={handleChange}
          />
          5m Interval
        </label>
        <label htmlFor="interval-10m">
          <input
            type="checkbox"
            name="interval-10m"
            id="interval-10m"
            checked={intervals['10m']}
            onChange={handleChange}
          />
          10m Interval
        </label>
        <label htmlFor="interval-15m">
          <input
            type="checkbox"
            name="interval-15m"
            id="interval-15m"
            checked={intervals['15m']}
            onChange={handleChange}
          />
          15m Interval
        </label>
        <label htmlFor="interval-30m">
          <input
            type="checkbox"
            name="interval-30m"
            id="interval-30m"
            checked={intervals['30m']}
            onChange={handleChange}
          />
          30m Interval
        </label>
        <label htmlFor="interval-1h">
          <input
            type="checkbox"
            name="interval-1h"
            id="interval-1h"
            checked={intervals['1h']}
            onChange={handleChange}
          />
          1h Interval
        </label>
        <label htmlFor="interval-2h">
          <input
            type="checkbox"
            name="interval-2h"
            id="interval-2h"
            checked={intervals['2h']}
            onChange={handleChange}
          />
          2h Interval
        </label>
        <label htmlFor="interval-4h">
          <input
            type="checkbox"
            name="interval-4h"
            id="interval-4h"
            checked={intervals['4h']}
            onChange={handleChange}
          />
          4h Interval
        </label>
        <label htmlFor="interval-1d">
          <input
            type="checkbox"
            name="interval-1d"
            id="interval-1d"
            checked={intervals['1d']}
            onChange={handleChange}
          />
          1d Interval
        </label>
        <label htmlFor="interval-7d">
          <input
            type="checkbox"
            name="interval-7 days"
            id="interval-7d"
            checked={intervals['7d days']}
            onChange={handleChange}
          />
          7d Interval
        </label>
        <label htmlFor="interval-30d">
          <input
            type="checkbox"
            name="interval-30 days"
            id="interval-30d"
            checked={intervals['30 days']}
            onChange={handleChange}
          />
          30d Interval
        </label>
      </div>

      <button type="button" className={styles.schedule_button} onClick={handleAnalyse}>
        Schedule
      </button>
    </div>
  )
}
