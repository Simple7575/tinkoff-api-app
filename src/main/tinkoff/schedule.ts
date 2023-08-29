import { scheduleJob } from 'node-schedule'
import { analyseMarket } from './analyseMarket'
import { intervalsToSchedulMap } from './maps'
// types
import { TIntervals } from '../../types/tinkoff'

export const startSchedule = (scheduleIntervals: TIntervals, candleIntervals: TIntervals) => {
  for (let interval of scheduleIntervals) {
    scheduleJob(interval, intervalsToSchedulMap[interval], () => {
      analyseMarket(interval, candleIntervals)
    })
  }
}
