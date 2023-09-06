import { scheduleJob, gracefulShutdown } from 'node-schedule'
import { analyseMarket } from './analyseMarket'
import { intervalsToSchedulMap } from './maps'
import { consoleLog } from '../index'
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

export const stopSchedule = async () => {
  await gracefulShutdown()
}
