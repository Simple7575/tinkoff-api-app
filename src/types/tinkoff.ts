import { IntervalMapTinkoff } from '../main/tinkoff/maps'

export type IntervalTinkoff = keyof typeof IntervalMapTinkoff
export type TIntervals = [IntervalTinkoff]
// classcode
export type ClassCode = 'TQBR' | 'SPBXM'
//
export type TickerAndClasscode = { ticker: string; classCode: ClassCode }[]
