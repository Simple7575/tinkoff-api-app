// prettier-ignore
import { type TIntervals, type TickerAndClasscode, type TAnalyseConfigs, type TCredentials, type HistogramConfigs } from './tinkoff'
import { type Preferences } from './preference'

// prettier-ignore
export type TFileName = 'analyseConfigs' | 'credentials' | 'preferences' | 'tickersAndClasscodes' | 'candleIntervals' | 'histogramConfigs'

// prettier-ignore
export type TReadJsonAsync = < T extends TFileName, R = T extends 'analyseConfigs'
    ? TAnalyseConfigs
    : T extends 'credentials'
    ? TCredentials
    : T extends 'preferences'
    ? Preferences
    : T extends 'tickersAndClasscodes'
    ? TickerAndClasscode 
    : T extends 'histogramConfigs'
    ? HistogramConfigs :
    TIntervals
>( fileName: T ) => Promise<R>

// prettier-ignore
export type TReadJsonSync = < T extends TFileName, R = T extends 'analyseConfigs'
    ? TAnalyseConfigs
    : T extends 'credentials'
    ? TCredentials
    : T extends 'preferences'
    ? Preferences
    : T extends 'tickersAndClasscodes'
    ? TickerAndClasscode 
    : T extends 'histogramConfigs'
    ? HistogramConfigs :
    TIntervals
>( fileName: T ) => R
