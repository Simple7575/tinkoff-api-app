import { IpcMainEvent } from 'electron'
import { analyseMarket } from '../../tinkoff/analyseMarket'
// types

export const analyseHandler = async (event: IpcMainEvent) => {
  await analyseMarket('1m')
}
