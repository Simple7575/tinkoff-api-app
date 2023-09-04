import { scheduleJob } from 'node-schedule'
import { analyseMarket } from './analyseMarket'
import { intervalsToSchedulMap } from './maps'
// types
import { TIntervals } from '../../types/tinkoff'

export const startSchedule = (scheduleIntervals: TIntervals) => {
  for (let interval of scheduleIntervals) {
    scheduleJob(interval, intervalsToSchedulMap[interval], () => {
      console.log(
        `Job scheduled. Interval: ${interval} cron scheme ${intervalsToSchedulMap[interval]}`
      )
      analyseMarket(interval)
    })
  }
}
