'use strict'

import path from 'path'
import mkdirp from 'mkdirp'
import fs from 'fs'
import Datastore from 'nedb'
import { app, BrowserWindow, ipcMain } from 'electron'
import { likeUserListFirstPost, getUserFollowers } from './logic/instagram'
import Instagram from './components/Instagram'
// Type 3: Persistent datastore with automatic loading
const db = new Datastore({ filename: 'path/to/instatools.db', autoload: true })

/* db.remove({ }, { multi: true }, (err, numRemoved) => {
  console.log(err)
  console.log(numRemoved)
  db.loadDatabase((err) => {
    // done
    console.log(err)
  })
}) */

var deleteFolderRecursive = function (path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(function (file, index) {
      var curPath = path + '/' + file
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath)
      } else { // delete file
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}

deleteFolderRecursive(path.resolve() + '/cookies')
deleteFolderRecursive(path.resolve() + '/tmp')

mkdirp.sync(path.resolve() + '/cookies')
mkdirp.sync(path.resolve() + '/tmp')

const insta = new Instagram(db)

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

ipcMain.on('checkSession', function (event) {
  insta.checkSession().then((data) => {
    if (data) {
      insta.getProfile()
        .then(profile => {
          event.sender.send('logged', profile)
          insta.getUserMediaById(profile.id)
            .then(media => {
              event.sender.send('profileMedia', media)
            })
        })
    }
  }).catch((err) => {
    console.log(err)
  })
})

ipcMain.on('login', function (event, data) {
  insta.login(data.username, data.password).then((data) => {
    insta.getProfile()
      .then(profile => {
        console.log('perfil')
        console.log(profile.id)
        event.sender.send('logged', profile)
        insta.getUserProfileMedia(profile.id)
          .then(media => {
            console.log('media')
            event.sender.send('profileMedia', media)
          })
      })
  }).catch((err) => {
    console.log(err)
  })
})

ipcMain.on('likeUserListFirstPost', function (event, data) {
  if (insta.isLogged()) {
    likeUserListFirstPost(data, insta, mainWindow)
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

ipcMain.on('getFollowers', function (event, id) {
  console.log('followers')
  console.log(id)
  insta.getFollowers(id)
    .then(followers => {
      console.log(followers.length)
      event.sender.send('userFollowers', followers)
    })
    .catch((err) => {
      console.log(err)
    })
})

ipcMain.on('getLikers', function (event, id) {
  console.log('likers')
  console.log(id)
  insta.getMediaLikers(id)
    .then(res => {
      console.log(res.length)
    })
    .catch((err) => {
      console.log(err)
    })
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
