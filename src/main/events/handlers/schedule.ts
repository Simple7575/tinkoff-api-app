import { IpcMainEvent } from 'electron'
import { writeJsonAsync } from '../../utils/files'
import { startSchedule } from '../../tinkoff/schedule'
// types
import { type Data } from '../../../types/submitedData'

export const scheduleHandler = async (event: IpcMainEvent, data: Data) => {
  const { scheduleIntervals, candleIntervals, analyseConfigs, histogramConfigs } = data

  await Promise.all([
    writeJsonAsync('analyseConfigs', analyseConfigs),
    writeJsonAsync('candleIntervals', candleIntervals),
    writeJsonAsync('histogramConfigs', histogramConfigs)
  ])

  startSchedule(scheduleIntervals)
}
