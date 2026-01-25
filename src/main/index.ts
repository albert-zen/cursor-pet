import { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage } from 'electron'
import path from 'path'
import { AgentDetector } from './detector'

let mainWindow: BrowserWindow | null = null
let tray: Tray | null = null
const detector = new AgentDetector()
let currentScheme: 'A' | 'B' = 'A'

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 120,
    height: 120,
    x: 100,
    y: 100,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
    },
  })

  const url = process.env.ELECTRON_RENDERER_URL
  if (url) {
    mainWindow.loadURL(url)
    mainWindow.webContents.openDevTools({ mode: 'detach' })
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}

function createTray() {
  const icon = nativeImage.createEmpty()
  tray = new Tray(icon)
  tray.setToolTip('Cursor Status Pet')

  const updateMenu = () => {
    const menu = Menu.buildFromTemplate([
      {
        label: '方案 A (悬浮窗)',
        type: 'radio',
        checked: currentScheme === 'A',
        click: () => setScheme('A'),
      },
      {
        label: '方案 B (桌面宠物)',
        type: 'radio',
        checked: currentScheme === 'B',
        click: () => setScheme('B'),
      },
      { type: 'separator' },
      { label: '退出', click: () => app.quit() },
    ])
    tray?.setContextMenu(menu)
  }

  updateMenu()
}

function setScheme(scheme: 'A' | 'B') {
  currentScheme = scheme
  mainWindow?.webContents.send('scheme-change', scheme)
}

app.whenReady().then(() => {
  createWindow()
  createTray()

  detector.on('statusChange', (status) => {
    mainWindow?.webContents.send('agent-status', status)
  })
  detector.start()

  ipcMain.handle('get-agent-status', () => detector.getStatus())
})

app.on('window-all-closed', () => {
  detector.stop()
  app.quit()
})
