import { IntervalMapTinkoff } from '../main/tinkoff/maps'
import { BUY, SELL } from '../renderer/src/redux/slices/analyseConfigsSlice'

export type IntervalTinkoff = keyof typeof IntervalMapTinkoff
export type TIntervals = [IntervalTinkoff]
// classcode
export type ClassCode = 'TQBR' | 'SPBXM'
//
export type TickerAndClasscode = { ticker: string; classCode: ClassCode }[]
//
export type TDeal = typeof BUY | typeof SELL
export type TAnalyseConfigs = {
  [key in IntervalTinkoff]: TDeal
}
