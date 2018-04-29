import { ipcRenderer } from 'electron'
import store from '../store'
import Router from '../router'

ipcRenderer.on('logged', (event, profile) => {
  store.dispatch('instagram/profile', profile)
})

ipcRenderer.on('log', (event, log) => {
  store.dispatch('instagram/addLog', log)
})

ipcRenderer.on('profileMedia', (event, media) => {
  store.dispatch('instagram/profileMedia', media)
  Router.push({ name: 'home' })
})

ipcRenderer.on('userFollowers', (event, media) => {
  console.log('media')
  console.log(media.length)
  store.dispatch('instagram/setFollowers', media)
})
