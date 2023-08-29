import { ChangeEvent } from 'react'
import { useTypedSelector, useTypedDispatch } from '@renderer/hooks/useTypedRedux'
import styles from '../assets/main.module.scss'
import { BUY, SELL, update } from '@renderer/redux/slices/analyseConfigsSlice'
// types
import { type IntervalTinkoff, type TDeal } from 'src/types/tinkoff'

export default function AnalysConfigs() {
  const candleIntervals = useTypedSelector((state) => state.candleIntervals)
  const analyseConfigs = useTypedSelector((state) => state.analyseConfigs)
  const dispatch = useTypedDispatch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name.split('-')[1] as IntervalTinkoff
    const deal = e.target.value as TDeal
    dispatch(update({ name, deal }))
  }

  return (
    <div>
      <h3>Analyse Configs</h3>
      <div className={styles.analysConfigs}>
        {candleIntervals['1m'] ? (
          <div className={styles.item}>
            1m
            <label htmlFor="radio-1m-buy">
              BUY
              <input
                type="radio"
                name="radion-1m"
                id="radio-1m-buy"
                value={BUY}
                checked={analyseConfigs['1m'] === BUY}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="radio-1m-sell">
              SELL
              <input
                type="radio"
                name="radion-1m"
                id="radio-1m-sell"
                value={SELL}
                checked={analyseConfigs['1m'] === SELL}
                onChange={handleChange}
              />
            </label>
          </div>
        ) : null}
        {candleIntervals['2m'] ? (
          <div className={styles.item}>
            2m
            <label htmlFor="radio-2m-buy">
              BUY
              <input
                type="radio"
                name="radion-2m"
                id="radio-2m-buy"
                value={BUY}
                checked={analyseConfigs['2m'] === BUY}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="radio-2m-sell">
              SELL
              <input
                type="radio"
                name="radion-2m"
                id="radio-2m-sell"
                value={SELL}
                checked={analyseConfigs['2m'] === SELL}
                onChange={handleChange}
              />
            </label>
          </div>
        ) : null}
        {candleIntervals['3m'] ? (
          <div className={styles.item}>
            3m
            <label htmlFor="radio-3m-buy">
              BUY
              <input
                type="radio"
                name="radion-3m"
                id="radio-3m-buy"
                value={BUY}
                checked={analyseConfigs['3m'] === BUY}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="radio-3m-sell">
              SELL
              <input
                type="radio"
                name="radion-3m"
                id="radio-3m-sell"
                value={SELL}
                checked={analyseConfigs['3m'] === SELL}
                onChange={handleChange}
              />
            </label>
          </div>
        ) : null}
        {candleIntervals['5m'] ? (
          <div className={styles.item}>
            5m
            <label htmlFor="radio-5m-buy">
              BUY
              <input
                type="radio"
                name="radion-5m"
                id="radio-5m-buy"
                value={BUY}
                checked={analyseConfigs['5m'] === BUY}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="radio-5m-sell">
              SELL
              <input
                type="radio"
                name="radion-5m"
                id="radio-5m-sell"
                value={SELL}
                checked={analyseConfigs['5m'] === SELL}
                onChange={handleChange}
              />
            </label>
          </div>
        ) : null}
        {candleIntervals['10m'] ? (
          <div className={styles.item}>
            10m
            <label htmlFor="radio-10m-buy">
              BUY
              <input
                type="radio"
                name="radion-10m"
                id="radio-10m-buy"
                value={BUY}
                checked={analyseConfigs['10m'] === BUY}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="radio-10m-sell">
              SELL
              <input
                type="radio"
                name="radion-10m"
                id="radio-10m-sell"
                value={SELL}
                checked={analyseConfigs['10m'] === SELL}
                onChange={handleChange}
              />
            </label>
          </div>
        ) : null}
        {candleIntervals['15m'] ? (
          <div className={styles.item}>
            15m
            <label htmlFor="radio-15m-buy">
              BUY
              <input
                type="radio"
                name="radion-15m"
                id="radio-15m-buy"
                value={BUY}
                checked={analyseConfigs['15m'] === BUY}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="radio-15m-sell">
              SELL
              <input
                type="radio"
                name="radion-15m"
                id="radio-15m-sell"
                value={SELL}
                checked={analyseConfigs['15m'] === SELL}
                onChange={handleChange}
              />
            </label>
          </div>
        ) : null}
        {candleIntervals['30m'] ? (
          <div className={styles.item}>
            30m
            <label htmlFor="radio-30m-buy">
              BUY
              <input
                type="radio"
                name="radion-30m"
                id="radio-30m-buy"
                value={BUY}
                checked={analyseConfigs['30m'] === BUY}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="radio-30m-sell">
              SELL
              <input
                type="radio"
                name="radion-30m"
                id="radio-30m-sell"
                value={SELL}
                checked={analyseConfigs['30m'] === SELL}
                onChange={handleChange}
              />
            </label>
          </div>
        ) : null}
        {candleIntervals['1h'] ? (
          <div className={styles.item}>
            1h
            <label htmlFor="radio-1h-buy">
              BUY
              <input
                type="radio"
                name="radion-1h"
                id="radio-1h-buy"
                value={BUY}
                checked={analyseConfigs['1h'] === BUY}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="radio-1h-sell">
              SELL
              <input
                type="radio"
                name="radion-1h"
                id="radio-1h-sell"
                value={SELL}
                checked={analyseConfigs['1h'] === SELL}
                onChange={handleChange}
              />
            </label>
          </div>
        ) : null}
        {candleIntervals['2h'] ? (
          <div className={styles.item}>
            2h
            <label htmlFor="radio-2h-buy">
              BUY
              <input
                type="radio"
                name="radion-2h"
                id="radio-2h-buy"
                value={BUY}
                checked={analyseConfigs['2h'] === BUY}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="radio-2h-sell">
              SELL
              <input
                type="radio"
                name="radion-2h"
                id="radio-2h-sell"
                value={SELL}
                checked={analyseConfigs['2h'] === SELL}
                onChange={handleChange}
              />
            </label>
          </div>
        ) : null}
        {candleIntervals['4h'] ? (
          <div className={styles.item}>
            4h
            <label htmlFor="radio-4h-buy">
              BUY
              <input
                type="radio"
                name="radion-4h"
                id="radio-4h-buy"
                value={BUY}
                checked={analyseConfigs['4h'] === BUY}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="radio-4h-sell">
              SELL
              <input
                type="radio"
                name="radion-4h"
                id="radio-4h-sell"
                value={SELL}
                checked={analyseConfigs['4h'] === SELL}
                onChange={handleChange}
              />
            </label>
          </div>
        ) : null}
        {candleIntervals['1d'] ? (
          <div className={styles.item}>
            1d
            <label htmlFor="radio-1d-buy">
              BUY
              <input
                type="radio"
                name="radion-1d"
                id="radio-1d-buy"
                value={BUY}
                checked={analyseConfigs['1d'] === BUY}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="radio-1d-sell">
              SELL
              <input
                type="radio"
                name="radion-1d"
                id="radio-1d-sell"
                value={SELL}
                checked={analyseConfigs['1d'] === SELL}
                onChange={handleChange}
              />
            </label>
          </div>
        ) : null}
        {candleIntervals['7 days'] ? (
          <div className={styles.item}>
            7d
            <label htmlFor="radio-7d-buy">
              BUY
              <input
                type="radio"
                name="radion-7 days"
                id="radio-7d-buy"
                value={BUY}
                checked={analyseConfigs['7 days'] === BUY}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="radio-7d-sell">
              SELL
              <input
                type="radio"
                name="radion-7 days"
                id="radio-7d-sell"
                value={SELL}
                checked={analyseConfigs['7 days'] === SELL}
                onChange={handleChange}
              />
            </label>
          </div>
        ) : null}
        {candleIntervals['30 days'] ? (
          <div className={styles.item}>
            30d
            <label htmlFor="radio-30d-buy">
              BUY
              <input
                type="radio"
                name="radion-30 days"
                id="radio-30d-buy"
                value={BUY}
                checked={analyseConfigs['30 days'] === BUY}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="radio-30d-sell">
              SELL
              <input
                type="radio"
                name="radion-30 days"
                id="radio-30d-sell"
                value={SELL}
                checked={analyseConfigs['30 days'] === SELL}
                onChange={handleChange}
              />
            </label>
          </div>
        ) : null}
      </div>
    </div>
  )
}
