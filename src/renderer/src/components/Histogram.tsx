import { MouseEvent, useEffect } from 'react'
import { useTypedSelector, useTypedDispatch } from '@renderer/hooks/useTypedRedux'
import { add, subtract, updateCompare } from '@renderer/redux/slices/histogramConfigsSlice'
import styles from '../assets/main.module.scss'
// types
import { type IntervalTinkoff } from '../../../types/tinkoff'
import Comparison from './Comparison'

export default function Histograms() {
  const candleIntervals = useTypedSelector((state) => state.candleIntervals)
  const histograms = useTypedSelector((state) => state.histogramConfigs)
  const dispatch = useTypedDispatch()

  return (
    <div className={styles.histogramWrapper}>
      <h3>Histogram</h3>
      {Object.keys(candleIntervals).map((interval) => (
        <Comparison interval={interval as IntervalTinkoff} key={interval} />
      ))}
    </div>
  )
}
