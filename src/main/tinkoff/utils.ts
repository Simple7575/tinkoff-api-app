import { TinkoffInvestApi } from 'tinkoff-invest-api'
import { IntervalMapTinkoff } from './maps'
import axios from 'axios'
import { MACD } from 'technicalindicators'
import { readFile } from 'fs/promises'
import { join } from 'path'
// types
import { type HistoricCandle } from 'tinkoff-invest-api/cjs/generated/marketdata'
import { type InstrumentConfigInterface } from '../../types/tinkoff'
import { type ClassCode, type IntervalTinkoff } from '../../types/tinkoff'
import { readJsonAsync } from '../utils/files'

export const getFigiFromTicker = async (ticker: string, classCode: ClassCode) => {
  const { tinkoffApiToken } = await readJsonAsync('credentials')
  const api = new TinkoffInvestApi({ token: tinkoffApiToken })

  const { instrument } = await api.instruments.getInstrumentBy({
    idType: 2,
    classCode,
    id: ticker
  })

  if (!instrument) throw new Error('Ther is no instrument')

  return instrument.figi
}

export const getCleanedCandlesTinkoffRest = async (
  interval: IntervalTinkoff,
  figi: string,
  base = new Date(),
  ticker?: string
) => {
  const { tinkoffApiToken } = await readJsonAsync('credentials')
  const api = new TinkoffInvestApi({ token: tinkoffApiToken })

  const body = {
    figi,
    instrumentId: figi,
    interval: IntervalMapTinkoff[interval].interval,
    ...api.helpers.fromTo(IntervalMapTinkoff[interval].from, base)
  }

  const { data } = await axios.post(
    'https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.MarketDataService/GetCandles',
    JSON.stringify(body),
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${tinkoffApiToken}`,
        'Content-Type': 'application/json'
      }
    }
  )

  // Cleaning weekends from candles
  const cleanedCandles: HistoricCandle[] = data.candles.filter((candle: HistoricCandle) => {
    if (!candle.time) throw new Error('Ther is no time in this candle.')
    const day = new Date(candle.time).getDay()

    if (day === 0 || day === 6) return false

    return true
  })

  return cleanedCandles
}

export const readInstrumnetConfigs = async (
  ticker: string
): Promise<InstrumentConfigInterface | void> => {
  try {
    const buffer = await readFile(join(__dirname, `../../configs/instruments/${ticker}.json`))
    const configs = JSON.parse(buffer.toString()) as InstrumentConfigInterface
    return configs
  } catch (error) {
    console.error(error)
  }
}

export const getCloseValues = (candles: HistoricCandle[]) => {
  const close = candles.map((candle) => {
    if (candle.close?.nano === undefined) return candle.close?.units
    const result = Number(candle.close?.units) + candle.close?.nano / 1e9
    return result
  }) as number[]

  return close
}

export const getAllValues = (candles: HistoricCandle[]) => {
  const values = []

  for (const candle of candles) {
    // nano can be zero and zero is falsy thats why we had bug in folowing logic
    // if (candle.open?.nano && candle.close?.nano && candle.high?.nano && candle.low?.nano) {
    const result = {
      open: Number(candle.open?.units) + candle.open?.nano! / 1e9,
      close: Number(candle.close?.units) + candle.close?.nano! / 1e9,
      high: Number(candle.high?.units) + candle.high?.nano! / 1e9,
      low: Number(candle.low?.units) + candle.low?.nano! / 1e9,
      date: new Date(candle.time!)
    }
    values.push(result)
  }

  return values
}

export const getMACD = (close: number[]) => {
  const macdInput = {
    values: close,
    fastPeriod: 12,
    slowPeriod: 26,
    signalPeriod: 9,
    SimpleMAOscillator: false,
    SimpleMASignal: false
  }

  const macd = MACD.calculate(macdInput)

  return macd
}
