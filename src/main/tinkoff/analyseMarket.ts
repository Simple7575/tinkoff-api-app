import { sendMessage } from '../bot'
import { getInstrumnetConfigs } from './utils'
import { join } from 'path'
import * as fs from 'fs/promises'
// types
import { type TickerAndClasscode, type IntervalTinkoff } from '../../types/tinkoff'

const BUY = 'Buy' as const
const SELL = 'Sell' as const
const EMPTY = 'Empty' as const
type DealType = typeof BUY | typeof SELL | typeof EMPTY

const analyse = async (
  ticker: TickerAndClasscode[number],
  interval: IntervalTinkoff,
  shceduledInterval: IntervalTinkoff
): Promise<DealType> => {
  try {
    const candles = await lookUpInDB(ticker, interval, shceduledInterval)
    if (!candles) return EMPTY

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
      return EMPTY
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

      return BUY
    } else if (fourthRes < thirdRes && thirdRes < secondToLastRes && secondToLastRes > lastRes) {
      return SELL
    } else {
      return EMPTY
    }
  } catch (error) {
    console.error(error)
    return EMPTY
  }
}

export const analyseMarket = async (interval: IntervalTinkoff) => {
  const buffer = await fs.readFile(join(__dirname, '../../configs/tickersAndClasscodes.json'))

  const tickersAndClasscodes = JSON.parse(buffer.toString()) as TickerAndClasscode

  for (const ticker of tickersAndClasscodes) {
    try {
      // get instrument config
      const instrumentConfigs = await getInstrumnetConfigs(ticker.ticker)
      if (!instrumentConfigs)
        throw new Error(`Please provide config file for this ticker: ${ticker.ticker}`)

      // mojno kopirovat funkcii s verxu nazvat kak ugodno i vizvat ix sdes i poluchit rezultat kak nije 👇
      // v skobkax pishem jelaemi interval svechei
      // validni interval "1m" | "2m" | "3m" | "5m" | "10m" | "15m" | "30m" | "1h" | "2h" | "4h" | "1d" | "7 days" | "30 days"
      const fiveMinRes = await analyse(ticker, '5m', interval)
      console.log('-------------------------------5M run')
      const hourRes = await analyse(ticker, '1h', interval)
      console.log('-------------------------------1H run')
      // const dayRes = await day(ticker, "1d", interval);
      // console.log("-------------------------------1D run");

      console.log(instrumentConfigs.trade)

      // V bloke if mojete napisat lubuyu logiku
      // Buy
      if (fiveMinRes === BUY && hourRes === BUY) {
        // otpravlyaem soobshenie buy
        await sendMessage(
          `${interval} ${ticker.ticker} ${BUY}  Vashe Soobshenie zdes mojno propisat`
        )
        // Sell
      } else if (fiveMinRes === SELL && hourRes === SELL) {
        // otpravlyaem soobshenie sell
        await sendMessage(
          `${interval} ${ticker.ticker} ${SELL}  Vashe Soobshenie zdes mojno propisat`
        )
      }
    } catch (error) {
      console.error(error)
      continue
    }
  }
}
