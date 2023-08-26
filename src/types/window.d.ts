import { TEvents } from './events'
import { ElectronAPI } from '@electron-toolkit/preload'

export type EApi = {
  login: (data: any) => void
  send: (channel: string, data) => void
  on: (channel: string, cb: any) => Electron.IpcRenderer
  removeListener: (eventName: string, listener: (...args: any[]) => void) => void
  removeAllListeners: (channel: string) => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: EApi
  }
}
export {}
