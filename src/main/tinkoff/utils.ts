import { TinkoffInvestApi } from 'tinkoff-invest-api'
import { IntervalMapTinkoff } from './maps'
import axios from 'axios'
import { promises as fs } from 'fs'
// types
import { type HistoricCandle } from 'tinkoff-invest-api/cjs/generated/marketdata'
import { type InstrumentConfigInterface } from '../../types/instrumentConfig'
import { type ClassCode, type IntervalTinkoff } from '../../types/tinkoff'

export const getFigiFromTicker = async (token: string, ticker: string, classCode: ClassCode) => {
  const api = new TinkoffInvestApi({ token })

  const { instrument } = await api.instruments.getInstrumentBy({
    idType: 2,
    classCode,
    id: ticker
  })

  if (!instrument) throw new Error('Ther is no instrument')

  return instrument.figi
}

export const getCleanedCandlesTinkoffRest = async (
  token: string,
  interval: IntervalTinkoff,
  figi: string,
  base = new Date(),
  ticker?: string
) => {
  const api = new TinkoffInvestApi({ token })

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
        Authorization: `Bearer ${token}`,
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

export const getInstrumnetConfigs = async (
  ticker: string
): Promise<InstrumentConfigInterface | void> => {
  try {
    const buffer = await fs.readFile(`./configs/${ticker}.json`)
    const configs = JSON.parse(buffer.toString()) as InstrumentConfigInterface
    return configs
  } catch (error) {
    console.error(error)
  }
}
