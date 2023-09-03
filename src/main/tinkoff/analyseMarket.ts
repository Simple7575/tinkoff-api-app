import { sendMessage } from '../bot'
import { readInstrumnetConfigs, getCloseValues, getAllValues, getMACD } from './utils'
import { readJsonAsync } from '../utils/files'
import { lookUpInDB } from './lookUpInDB'
import { consoleLog } from '../index'
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
    const lastValues = allValues.slice(allValues.length - quantityOfValues)
    const c1 = lastValues[0]
    const c2 = lastValues[1]
    const c3 = lastValues[2]
    const c4 = lastValues[3]
    const c5 = lastValues[4]
    const c6 = lastValues[5]

    const quantityOfMacd = 5
    const macd = getMACD(close)
    const lastResults = macd.slice(macd.length - quantityOfMacd)
    lastResults.reverse()

    if (lastResults.length < quantityOfMacd) {
      return { [interval]: EMPTY }
    }

    const h1 = lastResults[0].histogram! // 0 newest
    const h2 = lastResults[1].histogram! // 1
    const h3 = lastResults[2].histogram! // 2
    const h4 = lastResults[3].histogram! // 3
    const h5 = lastResults[4].histogram! // 4 oldest

    const histogram = await readJsonAsync('histogramConfigs')

    let toEval = ''
    for (let i = 0; i < histogram[interval].length; i++) {
      if (i + 2 === histogram[interval].length) {
        // prettier-ignore
        toEval += `${histogram[interval][i].index}  ${histogram[interval][i].compare} ${histogram[interval][i + 1].index}`
        break
      } else {
        // prettier-ignore
        toEval += `${histogram[interval][i].index}  ${histogram[interval][i].compare} ${histogram[interval][i + 1].index} &&`
      }
    }
    console.log(interval, toEval)

    if (h1 > h2 && h2 < h3 && h3 < h4) {
      return { [interval]: BUY }
    } else if (h1 < h2 && h2 > h3 && h3 > h4) {
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
        consoleLog(BUY)
        await sendMessage(`${scheduleIntervals} ${ticker.ticker} ${BUY}`)
        // Sell
      } else if (isSell) {
        consoleLog(SELL)
        await sendMessage(`${scheduleIntervals} ${ticker.ticker} ${SELL}`)
      }
    } catch (error) {
      console.error(error)
      continue
    }
  }
}
