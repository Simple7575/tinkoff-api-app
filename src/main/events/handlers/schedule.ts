import { IpcMainEvent } from 'electron'
import { writeJsonAsync } from '../../utils/files'
import { startSchedule } from '../../tinkoff/schedule'
// types
import { type TIntervals, type TAnalyseConfigs } from '../../../types/tinkoff'

type Data = {
  scheduleIntervals: TIntervals
  candleIntervals: TIntervals
  analyseConfigs: TAnalyseConfigs
}

export const scheduleHandler = async (event: IpcMainEvent, data: Data) => {
  const { scheduleIntervals, candleIntervals, analyseConfigs } = data

  await writeJsonAsync('analyseConfigs', analyseConfigs)
  await writeJsonAsync('candleIntervals', candleIntervals)

  startSchedule(scheduleIntervals)
}
