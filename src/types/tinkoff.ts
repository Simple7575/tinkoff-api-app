import { IntervalMapTinkoff } from '../main/tinkoff/maps'
import { BUY, SELL } from '../renderer/src/redux/slices/analyseConfigsSlice'

export type IntervalTinkoff = keyof typeof IntervalMapTinkoff
export type TIntervals = [IntervalTinkoff]

export type ClassCode = 'TQBR' | 'SPBXM'

export type TickerAndClasscode = { ticker: string; classCode: ClassCode }[]

export type TDeal = typeof BUY | typeof SELL

export type TAnalyseConfigs = {
  BUY: {
    [key in IntervalTinkoff]: TDeal
  }
  SELL: {
    [key in IntervalTinkoff]: TDeal
  }
}

export type TCredentials = {
  tinkoffApiToken: string
  botToken: string
  dbUri: string
  chatID: number
}

export type InstrumentConfigInterface = {
  trade: boolean
  tradeBuy: boolean
  tradeSell: boolean
  orders: boolean
  min: number
  vol: number
  max: number
}

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T
}

export type HistogramConfigs = PartialRecord<IntervalTinkoff, { index: string; compare: string }[]>
