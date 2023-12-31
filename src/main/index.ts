import { app, shell, BrowserWindow, ipcMain, globalShortcut } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

import { loginHandler } from './events/handlers/login'
import { startScheduleHandler, stopScheduleHandler } from './events/handlers/schedule'
import { readJsonSync, writeJsonSync } from './utils/files'
import { connectDB } from './db/index'

const isDev = process.env.NODE_ENV === 'development'

/**This function logs as console log and sends logs to renderer*/
export let consoleLog: (...args: any) => void

/**This function logs errors as console error and sends errors to renderer*/
export let consoleError: (...args: any) => void

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    const preferences = readJsonSync('preferences')

    mainWindow.setPosition(preferences['window.position'][0], preferences['window.position'][1])
    mainWindow.show()
  })

  mainWindow.on('moved', () => {
    const preferences = readJsonSync('preferences')

    preferences['window.position'] = mainWindow.getPosition()

    writeJsonSync('preferences', preferences)
    mainWindow.webContents.send('log', __dirname)
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // Open devtools
  // if (isDev) mainWindow.webContents.openDevTools()
  mainWindow.webContents.openDevTools()

  // Loger
  consoleLog = (...args) => {
    console.log(...args)
    mainWindow.webContents.send('log', ...args)
  }

  // Eror loger
  consoleError = (...args) => {
    console.error(...args)
    mainWindow.webContents.send('error', ...args)
  }

  // Shortcuts
  globalShortcut.register('f5', function () {
    console.log('f5 is pressed')
    mainWindow.reload()
  })

  globalShortcut.register('f12', function () {
    console.log('f12 is pressed')
    mainWindow.webContents.openDevTools()
  })

  // Events
  ipcMain.on('login', loginHandler)
  ipcMain.on('start-schedule', startScheduleHandler)
  ipcMain.on('stop-schedule', stopScheduleHandler)

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  connectDB()
    .then(() => {
      console.log('db connected.')
    })
    .catch((error) => consoleError(error))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
