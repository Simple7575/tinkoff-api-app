import { ChangeEvent } from 'react'
import { useTypedSelector, useTypedDispatch } from '@renderer/hooks/useTypedRedux'
import { update } from '../redux/slices/candleIntervalsSclice'
import styles from '../assets/main.module.scss'
// types
import { IntervalTinkoff } from 'src/types/tinkoff'

export default function CandleIntervals() {
  const intervals = useTypedSelector((state) => state.candleIntervals)
  const dispatch = useTypedDispatch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const interval = e.target.name.split('-')[2] as IntervalTinkoff
    dispatch(update(interval))
  }

  return (
    <div>
      <h3>Candle</h3>
      <div className={styles.scheduleIntervals}>
        <label htmlFor="candle-interval-1m">
          <input
            type="checkbox"
            name="candle-interval-1m"
            id="candle-interval-1m"
            checked={intervals['1m']}
            onChange={handleChange}
          />
          1m Interval
        </label>
        <label htmlFor="candle-interval-2m">
          <input
            type="checkbox"
            name="candle-interval-2m"
            id="candle-interval-2m"
            checked={intervals['2m']}
            onChange={handleChange}
          />
          2m Interval
        </label>
        <label htmlFor="candle-interval-3m">
          <input
            type="checkbox"
            name="candle-interval-3m"
            id="candle-interval-3m"
            checked={intervals['3m']}
            onChange={handleChange}
          />
          3m Interval
        </label>
        <label htmlFor="candle-interval-5m">
          <input
            type="checkbox"
            name="candle-interval-5m"
            id="candle-interval-5m"
            checked={intervals['5m']}
            onChange={handleChange}
          />
          5m Interval
        </label>
        <label htmlFor="candle-interval-10m">
          <input
            type="checkbox"
            name="candle-interval-10m"
            id="candle-interval-10m"
            checked={intervals['10m']}
            onChange={handleChange}
          />
          10m Interval
        </label>
        <label htmlFor="candle-interval-15m">
          <input
            type="checkbox"
            name="candle-interval-15m"
            id="candle-interval-15m"
            checked={intervals['15m']}
            onChange={handleChange}
          />
          15m Interval
        </label>
        <label htmlFor="candle-interval-30m">
          <input
            type="checkbox"
            name="candle-interval-30m"
            id="candle-interval-30m"
            checked={intervals['30m']}
            onChange={handleChange}
          />
          30m Interval
        </label>
        <label htmlFor="candle-interval-1h">
          <input
            type="checkbox"
            name="candle-interval-1h"
            id="candle-interval-1h"
            checked={intervals['1h']}
            onChange={handleChange}
          />
          1h Interval
        </label>
        <label htmlFor="candle-interval-2h">
          <input
            type="checkbox"
            name="candle-interval-2h"
            id="candle-interval-2h"
            checked={intervals['2h']}
            onChange={handleChange}
          />
          2h Interval
        </label>
        <label htmlFor="candle-interval-4h">
          <input
            type="checkbox"
            name="candle-interval-4h"
            id="candle-interval-4h"
            checked={intervals['4h']}
            onChange={handleChange}
          />
          4h Interval
        </label>
        <label htmlFor="candle-interval-1d">
          <input
            type="checkbox"
            name="candle-interval-1d"
            id="candle-interval-1d"
            checked={intervals['1d']}
            onChange={handleChange}
          />
          1d Interval
        </label>
        <label htmlFor="candle-interval-7d">
          <input
            type="checkbox"
            name="candle-interval-7 days"
            id="candle-interval-7d"
            checked={intervals['7 days']}
            onChange={handleChange}
          />
          7d Interval
        </label>
        <label htmlFor="candle-interval-30d">
          <input
            type="checkbox"
            name="candle-interval-30 days"
            id="candle-interval-30d"
            checked={intervals['30 days']}
            onChange={handleChange}
          />
          30d Interval
        </label>
      </div>
    </div>
  )
}
