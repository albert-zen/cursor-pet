import { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage } from 'electron'
import path from 'path'
import { AgentDetector } from './detector'

// Windows 透明窗口需要禁用硬件加速
if (process.platform === 'win32') {
  app.disableHardwareAcceleration()
}

let mainWindow: BrowserWindow | null = null
let tray: Tray | null = null
const detector = new AgentDetector()
let currentScheme: 'A' | 'B' = 'A'
let isQuitting = false

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
    show: false,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
    },
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show()
    // 使用最高级别置顶
    mainWindow?.setAlwaysOnTop(true, 'screen-saver')
  })

  // 失焦后重新置顶确保可见
  mainWindow.on('blur', () => {
    mainWindow?.setAlwaysOnTop(true, 'screen-saver')
  })

  // 防止窗口被意外关闭，只能通过托盘退出
  mainWindow.on('close', (e) => {
    if (!isQuitting) {
      e.preventDefault()
      mainWindow?.hide()
    }
  })

  const url = process.env.ELECTRON_RENDERER_URL
  if (url) {
    mainWindow.loadURL(url)
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}

async function createTray() {
  let icon: Electron.NativeImage
  try {
    icon = await app.getFileIcon(process.execPath, { size: 'small' })
  } catch {
    icon = nativeImage.createEmpty()
  }
  tray = new Tray(icon)
  tray.setToolTip('Cursor Status Pet')

  tray.on('click', () => {
    if (mainWindow && !mainWindow.isVisible()) {
      mainWindow.show()
    }
  })

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
      { label: '退出', click: () => { isQuitting = true; app.quit() } },
    ])
    tray?.setContextMenu(menu)
  }

  updateMenu()
}

function setScheme(scheme: 'A' | 'B') {
  currentScheme = scheme
  mainWindow?.webContents.send('scheme-change', scheme)
}

app.whenReady().then(async () => {
  createWindow()
  await createTray()

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
