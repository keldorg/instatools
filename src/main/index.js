'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
import { likeUserListFirstPost, getUserFollowers } from './logic/instagram'
import Instagram from './components/Instagram'

const insta = new Instagram()

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    useContentSize: true,
    width: 1000,
    'min-height': 600,
    'min-width': 800
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('hello', function (event) {
  event.sender.send('say-hi', 'hi')
})

ipcMain.on('login', function (event, data) {
  insta.login(data.username, data.password).then((data) => {
    insta.getProfile()
      .then(profile => {
        event.sender.send('logged', profile)
      })
  }).catch((err) => {
    console.log(err)
  })
})

ipcMain.on('likeUserListFirstPost', function (event, data) {
  if (insta.isLogged()) {
    likeUserListFirstPost(data, insta, mainWindow);
  }
})

ipcMain.on('powerFollowers', function (event, data) {
  if (insta.isLogged()) {
    getUserFollowers(data, insta, mainWindow)
      .then(res => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
