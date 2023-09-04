import { MouseEvent } from 'react'
import { useTypedSelector, useTypedDispatch } from '@renderer/hooks/useTypedRedux'
import { add, subtract, updateCompare } from '@renderer/redux/slices/histogramConfigsSlice'
import styles from '../assets/main.module.scss'
// types
import { type IntervalTinkoff } from '../../../types/tinkoff'

type Props = {
  interval: IntervalTinkoff
}

export default function Comparison({ interval }: Props) {
  const candleIntervals = useTypedSelector((state) => state.candleIntervals)
  const histograms = useTypedSelector((state) => state.histogramConfigs)
  const dispatch = useTypedDispatch()

  const handleAdd = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    const interval = e.currentTarget.getAttribute('data-interval') as IntervalTinkoff
    const length = histograms[interval].length
    if (length === 4) return
    dispatch(add({ interval, length }))
  }

  const handleSubtract = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    const interval = e.currentTarget.getAttribute('data-interval') as IntervalTinkoff
    const length = histograms[interval].length
    if (length === 2) return

    dispatch(subtract({ interval, length }))
  }

  const changeCompare = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    const interval = e.currentTarget.getAttribute('data-interval') as IntervalTinkoff
    const index = e.currentTarget.getAttribute('data-index')

    dispatch(updateCompare({ interval, index }))
  }

  return (
    <div>
      {candleIntervals[interval] ? (
        <div className={styles.comparisonWrapper}>
          <div className={styles.buttons}>
            {interval}
            <button type="button" onClick={handleAdd} data-interval={interval}>
              +
            </button>
            <button type="button" onClick={handleSubtract} data-interval={interval}>
              -
            </button>
          </div>
          <div className={styles.comparison}>
            {histograms[interval].map((histogram, i) => (
              <div key={histogram.index}>
                <span>{histogram.index}</span>
                {i < histograms[interval].length - 1 ? (
                  <button
                    type="button"
                    onClick={changeCompare}
                    data-interval={interval}
                    data-index={`${histogram.index}`}
                  >
                    {histogram.compare}
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
