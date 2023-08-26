import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { EApi } from '../types/window'

// Custom APIs for renderer
const api = {
  login: (data) => ipcRenderer.send('login', data),
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel: string, cb) => ipcRenderer.on(channel, (event, ...args) => cb(...args)),
  removeListener: (eventName: string, listener: (...args: any[]) => void) =>
    ipcRenderer.removeListener(eventName, listener),
  removeAllListeners: (channel: string) => ipcRenderer.removeAllListeners(channel)
} satisfies EApi

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
