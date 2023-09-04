import { MouseEvent, useEffect } from 'react'
import { useTypedSelector } from '@renderer/hooks/useTypedRedux'
import ScheduleIntervals from '@renderer/components/ScheduleIntervals'
import CandleIntervals from '@renderer/components/CandleIntervals'
import AnalysConfigs from '@renderer/components/AnalyseConfigs'
import Histogram from '@renderer/components/Histogram'
import styles from '../assets/main.module.scss'
// types
import { type Data } from '../../../types/submitedData'

export default function Main() {
  const scheduleIntervals = useTypedSelector((state) => state.scheduleIntervals)
  const candleIntervals = useTypedSelector((state) => state.candleIntervals)
  const analyseConfigs = useTypedSelector((state) => state.analyseConfigs)
  const histogramConfigs = useTypedSelector((state) => state.histogramConfigs)

  const handleAnalyse = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    // prettier-ignore
    // @ts-expect-error
    const data: Data = { scheduleIntervals: [], candleIntervals: [], analyseConfigs: { BUY: {}, SELL: {} } }
    for (const [key, value] of Object.entries(scheduleIntervals)) {
      // change any later
      if (value) data.scheduleIntervals.push(key as any)
    }
    for (const [key, value] of Object.entries(candleIntervals)) {
      // change any later
      if (value) {
        data.candleIntervals.push(key as any)
        data.analyseConfigs.BUY[key] = analyseConfigs.BUY[key]
        data.analyseConfigs.SELL[key] = analyseConfigs.SELL[key]
        data.histogramConfigs = histogramConfigs
      }
    }

    window.api.send('schedule', data)
  }

  useEffect(() => {
    window.api.on('log', (...args: any) => console.log(...args))

    return () => {
      window.api.removeAllListeners('log')
    }
  }, [])

  return (
    <div className={styles.mainContainer}>
      <ScheduleIntervals />
      <CandleIntervals />
      <AnalysConfigs dealType={'BUY'} />
      <AnalysConfigs dealType={'SELL'} />
      <Histogram />
      <button type="button" className={styles.scheduleButton} onClick={handleAnalyse}>
        START SCHEDULE
      </button>
    </div>
  )
}
