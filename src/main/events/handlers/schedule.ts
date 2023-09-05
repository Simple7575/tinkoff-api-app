import { IpcMainEvent } from 'electron'
import { writeJsonAsync } from '../../utils/files'
import { startSchedule } from '../../tinkoff/schedule'
// types
import { type Data } from '../../../types/submitedData'
import { consoleError } from '../..'

export const scheduleHandler = async (event: IpcMainEvent, data: Data) => {
  try {
    const { scheduleIntervals, candleIntervals, analyseConfigs, histogramConfigs } = data

    await Promise.all([
      writeJsonAsync('analyseConfigs', analyseConfigs),
      writeJsonAsync('candleIntervals', candleIntervals),
      writeJsonAsync('histogramConfigs', histogramConfigs)
    ])

    startSchedule(scheduleIntervals)
  } catch (error) {
    consoleError(error)
  }
}
