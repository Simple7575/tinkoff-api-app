import { sendMessage } from '../bot'
import { readInstrumnetConfigs, getCloseValues, getAllValues, getMACD } from './utils'
import { readJsonAsync } from '../utils/files'
import { lookUpInDB } from './lookUpInDB'
// types
import { type TickerAndClasscode, type IntervalTinkoff } from '../../types/tinkoff'

const BUY = 'Buy' as const
const SELL = 'Sell' as const
const EMPTY = 'Empty' as const

type DealType = typeof BUY | typeof SELL | typeof EMPTY
type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T
}
type R = PartialRecord<IntervalTinkoff, DealType>

const analyse = async (
  ticker: TickerAndClasscode[number],
  shceduledInterval: IntervalTinkoff,
  interval: IntervalTinkoff
): Promise<R> => {
  try {
    const candles = await lookUpInDB(ticker, interval, shceduledInterval)
    if (!candles) return { [interval]: EMPTY }
    const close = getCloseValues(candles)
    const allValues = getAllValues(candles)
    const quantityOfValues = 6
    const lastFourValues = allValues.slice(allValues.length - quantityOfValues)
    const c1 = lastFourValues[0].date
    const c2 = lastFourValues[1].date
    const c3 = lastFourValues[2].date
    const c4 = lastFourValues[3].date
    const c5 = lastFourValues[4].date
    const c6 = lastFourValues[5].date
    const macd = getMACD(close)
    const quantityOfMacd = 4

    const lastFourResults = macd.slice(macd.length - quantityOfMacd)
    if (lastFourResults.length < quantityOfMacd) {
      return { [interval]: EMPTY }
    }

    const fourthRes = lastFourResults[0].histogram! // 3
    const thirdRes = lastFourResults[1].histogram! // 2
    const secondToLastRes = lastFourResults[2].histogram! // 1
    const lastRes = lastFourResults[3].histogram! // 0

    //  3>2>1<0 то сигнал к покупке (значение1), а если 3<2<1>0 то сигнал к продаже (значение2)
    if (fourthRes > thirdRes && thirdRes > secondToLastRes && secondToLastRes < lastRes) {
      // console.log(new Date()) // sechas
      // console.log(new Date().getTime()) // sechas v milisekundax
      // console.log(new Date(candleBDate)) // data posledney svechi
      // console.log(new Date(candleBDate).getTime()) // data posledney svechi v milisekundax
      // dlya sravnenia dvux dat nujno perevesti v milisekundi eto unix vremya
      return { [interval]: BUY }
    } else if (fourthRes < thirdRes && thirdRes < secondToLastRes && secondToLastRes > lastRes) {
      return { [interval]: SELL }
    } else {
      return { [interval]: EMPTY }
    }
  } catch (error) {
    console.error(error)
    return { [interval]: EMPTY }
  }
}

export const analyseMarket = async (scheduleIntervals: IntervalTinkoff) => {
  const day = new Date().getDay()
  if (day === 0 || day === 6) return

  const [tickersAndClasscodes, candleIntervals, analyseConfigs] = await Promise.all([
    readJsonAsync('tickersAndClasscodes'),
    readJsonAsync('candleIntervals'),
    readJsonAsync('analyseConfigs')
  ])

  for (const ticker of tickersAndClasscodes) {
    try {
      const instrumentConfigs = await readInstrumnetConfigs(ticker.ticker)
      if (!instrumentConfigs)
        throw new Error(`Please provide config file for this ticker: ${ticker.ticker}`)
      console.log(instrumentConfigs)

      const results = await Promise.all(
        candleIntervals.map((interval) => analyse(ticker, scheduleIntervals, interval))
      )

      const isBuy = results.every((obj) => {
        const key = Object.keys(obj)[0]
        return analyseConfigs.BUY[key] === obj[key]
      })

      const isSell = results.every((obj) => {
        const key = Object.keys(obj)[0]
        return analyseConfigs.SELL[key] === obj[key]
      })

      if (isBuy) {
        console.log(BUY)
        await sendMessage(`${scheduleIntervals} ${ticker.ticker} ${BUY}`)
        // Sell
      } else if (isSell) {
        console.log(SELL)
        await sendMessage(`${scheduleIntervals} ${ticker.ticker} ${SELL}`)
      }
    } catch (error) {
      console.error(error)
      continue
    }
  }
}
