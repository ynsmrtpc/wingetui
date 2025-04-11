import { app, BrowserWindow } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { ipcMain } from 'electron'
import {exec} from "child_process";
import os from 'os'
createRequire(import.meta.url);

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 830,
    resizable: true,
    icon: path.join(process.env.VITE_PUBLIC, 'icon.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  // 'getAppList' mesajını dinle
  ipcMain.handle('getAppList', async () => {
    return new Promise((resolve, reject) => {
      exec('winget list --source winget', (error, stdout, stderr) => {
        if (error) {
          console.error('Winget Error:', stderr)
          return reject(stderr)
        }

        const lines = stdout.split('\n').slice(2)
        const apps = lines
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .map(line => {
              const parts = line.split(/\s{2,}/)
              return {
                name: parts[0],
                version: parts[2] || '',
                newVersion: parts[3] || "",
              }
            })
        resolve(apps)
      })
    })
  })

  ipcMain.handle('getSystemInfo', async () => {
    return {
      cpu: os.cpus()[0].model,
      ram: `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
      os: `${os.type()} ${os.arch()}`,
      version: os.release(),
    }
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)
