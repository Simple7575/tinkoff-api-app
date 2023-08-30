import { HistoricCandle } from 'tinkoff-invest-api/cjs/generated/marketdata.js'
import { getFigiFromTicker, getCleanedCandlesTinkoffRest } from './utils'
import { CandlesModel } from '../db/schemas/candlesSchema'
import { IntervalToMsMap } from './maps'
import { consoleLog } from '../index'
// types
import { type IntervalTinkoff, TickerAndClasscode } from '../../types/tinkoff'

export const saveCandles = async (
  ticker: string,
  interval: IntervalTinkoff,
  candles: HistoricCandle[]
) => {
  try {
    const candlesToSave = {
      [interval]: candles
    }

    const newCandles = new CandlesModel({
      ticker,
      candles: candlesToSave
    })

    await newCandles.save()
    consoleLog('Save', ticker, `candles.${interval}`, 'API call')
  } catch (error) {
    console.error(error)
  }
}

const updateCandles = async (
  ticker: TickerAndClasscode[number],
  interval: IntervalTinkoff,
  field: string
): Promise<HistoricCandle[] | void> => {
  try {
    const figi = await getFigiFromTicker(ticker.ticker, ticker.classCode)
    const candles = await getCleanedCandlesTinkoffRest(interval, figi)
    await CandlesModel.findOneAndUpdate({ ticker: ticker.ticker }, { $set: { [field]: candles } })
    consoleLog('Update', ticker.ticker, `candles.${interval}`, 'API call')

    return candles
  } catch (error) {
    console.error(error)
  }
}

export const lookUpInDB = async (
  ticker: TickerAndClasscode[number],
  interval: IntervalTinkoff,
  shceduledInterval: IntervalTinkoff
): Promise<HistoricCandle[] | void> => {
  consoleLog('Lookup Call', ticker.ticker, interval)
  const existingCandles = await CandlesModel.findOne({ ticker: ticker.ticker })

  if (!existingCandles) {
    const figi = await getFigiFromTicker(ticker.ticker, ticker.classCode)
    const candles = await getCleanedCandlesTinkoffRest(interval, figi)
    await saveCandles(ticker.ticker, interval, candles)
    return candles
  } else {
    const field = `candles.${interval}`

    if (existingCandles.candles[interval].length === 0) {
      // if candles of given interval in db are not exist yet, get candles from tinkoff and update candles in db
      const candles = await updateCandles(ticker, interval, field)
      return candles
    } else {
      const time =
        existingCandles.candles[interval][existingCandles.candles[interval].length - 1].time
      if (!time) {
        // if last candle don't have time specified, get candles from tinkoff and compare with last candle
        // if they are same just return candles
        // else push ne candle to db and return candles
        // ----------for now just return candles from tinkoff with warrning
        console.warn('Last candle had no time in it.', ticker.ticker, interval, 'API call')
        const figi = await getFigiFromTicker(ticker.ticker, ticker.classCode)
        const candles = await getCleanedCandlesTinkoffRest(interval, figi)
        return candles
      }

      const timeAndInterval = new Date(time).getTime() + IntervalToMsMap[interval]
      // const now = Date.now();
      const now = new Date('2023-08-03T08:23:27.751Z').getTime()

      consoleLog(interval, new Date(timeAndInterval).toUTCString(), 'Timeandinterval')
      consoleLog(interval, new Date().toUTCString(), 'Now')
      // if now > timeAndInterval means there is new candle in api so get new candles from api
      // update candles in db and return updated candles
      // else return candles from db
      if (now > timeAndInterval) {
        consoleLog('Greater', 'API call')
        const figi = await getFigiFromTicker(ticker.ticker, ticker.classCode)
        const candles = await getCleanedCandlesTinkoffRest(interval, figi)
        const newCandleTime = candles.at(-1)?.time!
        // this part of code needs test coverage
        if (new Date(time).getTime() === new Date(newCandleTime).getTime()) {
          consoleLog('Candles are the same')
          return candles
        }

        // if candles length in db is geater than 300 remove first candle and push new candle to the end
        if (existingCandles.candles[interval].length > 300) {
          const newCandles = existingCandles.candles[interval].slice(1)
          newCandles.push(candles[candles.length - 1])

          const updated = await CandlesModel.findOneAndUpdate(
            { ticker: ticker.ticker },
            { $set: { [field]: newCandles } },
            { returnDocument: 'after' }
          )

          return updated!.candles[interval]
        } else {
          const updated = await CandlesModel.findOneAndUpdate(
            { ticker: ticker.ticker },
            { $push: { [field]: candles[candles.length - 1] } },
            { returnDocument: 'after' }
          )

          return updated!.candles[interval]
        }
      } else {
        consoleLog('DB call')
        return existingCandles.candles[interval]
      }
    }
  }
}
