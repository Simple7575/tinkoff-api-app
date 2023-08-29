import { ChangeEvent } from 'react'
import { useTypedSelector, useTypedDispatch } from '@renderer/hooks/useTypedRedux'
import { update } from '../redux/slices/scheduleIntervalsSlice'
import styles from '../assets/main.module.scss'
// types
import { IntervalTinkoff } from 'src/types/tinkoff'

export default function ScheduleIntervals() {
  const intervals = useTypedSelector((state) => state.scheduleIntervals)
  const dispatch = useTypedDispatch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const interval = e.target.name.split('-')[2] as IntervalTinkoff
    dispatch(update(interval))
  }

  return (
    <div>
      <h3>Schedule</h3>
      <div className={styles.scheduleIntervals}>
        <label htmlFor="schedule-interval-1m">
          <input
            type="checkbox"
            name="schedule-interval-1m"
            id="schedule-interval-1m"
            checked={intervals['1m']}
            onChange={handleChange}
          />
          1m Interval
        </label>
        <label htmlFor="schedule-interval-2m">
          <input
            type="checkbox"
            name="schedule-interval-2m"
            id="schedule-interval-2m"
            checked={intervals['2m']}
            onChange={handleChange}
          />
          2m Interval
        </label>
        <label htmlFor="schedule-interval-3m">
          <input
            type="checkbox"
            name="schedule-interval-3m"
            id="schedule-interval-3m"
            checked={intervals['3m']}
            onChange={handleChange}
          />
          3m Interval
        </label>
        <label htmlFor="schedule-interval-5m">
          <input
            type="checkbox"
            name="schedule-interval-5m"
            id="schedule-interval-5m"
            checked={intervals['5m']}
            onChange={handleChange}
          />
          5m Interval
        </label>
        <label htmlFor="schedule-interval-10m">
          <input
            type="checkbox"
            name="schedule-interval-10m"
            id="schedule-interval-10m"
            checked={intervals['10m']}
            onChange={handleChange}
          />
          10m Interval
        </label>
        <label htmlFor="schedule-interval-15m">
          <input
            type="checkbox"
            name="schedule-interval-15m"
            id="schedule-interval-15m"
            checked={intervals['15m']}
            onChange={handleChange}
          />
          15m Interval
        </label>
        <label htmlFor="schedule-interval-30m">
          <input
            type="checkbox"
            name="schedule-interval-30m"
            id="schedule-interval-30m"
            checked={intervals['30m']}
            onChange={handleChange}
          />
          30m Interval
        </label>
        <label htmlFor="schedule-interval-1h">
          <input
            type="checkbox"
            name="schedule-interval-1h"
            id="schedule-interval-1h"
            checked={intervals['1h']}
            onChange={handleChange}
          />
          1h Interval
        </label>
        <label htmlFor="schedule-interval-2h">
          <input
            type="checkbox"
            name="schedule-interval-2h"
            id="schedule-interval-2h"
            checked={intervals['2h']}
            onChange={handleChange}
          />
          2h Interval
        </label>
        <label htmlFor="schedule-interval-4h">
          <input
            type="checkbox"
            name="schedule-interval-4h"
            id="schedule-interval-4h"
            checked={intervals['4h']}
            onChange={handleChange}
          />
          4h Interval
        </label>
        <label htmlFor="schedule-interval-1d">
          <input
            type="checkbox"
            name="schedule-interval-1d"
            id="schedule-interval-1d"
            checked={intervals['1d']}
            onChange={handleChange}
          />
          1d Interval
        </label>
        <label htmlFor="schedule-interval-7d">
          <input
            type="checkbox"
            name="schedule-interval-7 days"
            id="schedule-interval-7d"
            checked={intervals['7 days']}
            onChange={handleChange}
          />
          7d Interval
        </label>
        <label htmlFor="schedule-interval-30d">
          <input
            type="checkbox"
            name="schedule-interval-30 days"
            id="schedule-interval-30d"
            checked={intervals['30 days']}
            onChange={handleChange}
          />
          30d Interval
        </label>
      </div>
    </div>
  )
}
