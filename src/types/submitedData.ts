import { type TIntervals, type TAnalyseConfigs, type HistogramConfigs } from './tinkoff'

export type Data = {
  scheduleIntervals: TIntervals
  candleIntervals: TIntervals
  analyseConfigs: TAnalyseConfigs
  histogramConfigs: HistogramConfigs
}
