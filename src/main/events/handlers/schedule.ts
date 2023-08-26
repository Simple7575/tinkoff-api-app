import { IpcMainEvent } from 'electron'
import { startSchedule } from '../../tinkoff/schedule'
// types
import { TIntervals } from '../../../types/tinkoff'

export const scheduleHandler = async (event: IpcMainEvent, data: TIntervals) => {
  startSchedule(data)
}
