import { IpcMainEvent } from 'electron'
import { startSchedule } from '../../tinkoff/schedule'
// types
import { TIntervals } from '../../../types/tinkoff'

type Data = {
  scheduleIntervals: TIntervals
  candleIntervals: TIntervals
}

export const scheduleHandler = async (event: IpcMainEvent, data: Data) => {
  console.log(data)
  // startSchedule(data.scheduleIntervals, data.scheduleIntervals)
}
