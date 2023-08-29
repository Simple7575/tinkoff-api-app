import { MouseEvent } from 'react'
import styles from '../assets/main.module.scss'
import ScheduleIntervals from '@renderer/components/ScheduleIntervals'
import CandleIntervals from '@renderer/components/CandleIntervals'
import AnalysConfigs from '@renderer/components/AnalyseConfigs'
import { useTypedSelector } from '@renderer/hooks/useTypedRedux'
// types
import { type TIntervals, TAnalyseConfigs } from '../../../types/tinkoff'

type Data = {
  scheduleIntervals: TIntervals
  candleIntervals: TIntervals
  analyseConfigs: TAnalyseConfigs
}

export default function Main() {
  const scheduleIntervals = useTypedSelector((state) => state.scheduleIntervals)
  const candleIntervals = useTypedSelector((state) => state.candleIntervals)
  const analyseConfigs = useTypedSelector((state) => state.analyseConfigs)

  const handleAnalyse = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    // @ts-expect-error
    const data: Data = { scheduleIntervals: [], candleIntervals: [], analyseConfigs: {} }
    for (const [key, value] of Object.entries(scheduleIntervals)) {
      // change any later
      if (value) data.scheduleIntervals.push(key as any)
    }
    for (const [key, value] of Object.entries(candleIntervals)) {
      // change any later
      if (value) {
        data.candleIntervals.push(key as any)
        data.analyseConfigs[key] = analyseConfigs[key]
      }
    }

    window.api.send('schedule', data)
  }

  return (
    <div>
      <h2>Main</h2>
      <ScheduleIntervals />
      <CandleIntervals />
      <AnalysConfigs />
      <button type="button" className={styles.scheduleButton} onClick={handleAnalyse}>
        Schedule
      </button>
    </div>
  )
}
