import { IpcMainEvent } from 'electron'
import { writeJsonAsync } from '../../utils/files'
import { startSchedule, stopSchedule } from '../../tinkoff/schedule'
import { consoleError, consoleLog } from '../../index'
// types
import { type Data } from '../../../types/submitedData'

export const startScheduleHandler = async (event: IpcMainEvent, data: Data) => {
  try {
    const { scheduleIntervals, candleIntervals, analyseConfigs, histogramConfigs } = data

    await Promise.all([
      writeJsonAsync('analyseConfigs', analyseConfigs),
      writeJsonAsync('candleIntervals', candleIntervals),
      writeJsonAsync('histogramConfigs', histogramConfigs)
    ])

    await stopSchedule()
    startSchedule(scheduleIntervals)
    consoleLog('Jobs scheduled.')
  } catch (error) {
    consoleError(error)
  }
}

export const stopScheduleHandler = async (event: IpcMainEvent, data: Data) => {
  try {
    await stopSchedule()
    consoleLog('Schedules are shuted down.')
  } catch (error) {
    consoleError(error)
  }
}
