import { ipcRenderer } from 'electron'
import store from '../store'
import Router from '../router'

ipcRenderer.on('logged', (event, profile) => {
  store.dispatch('instagram/profile', profile)
  Router.push({ name: 'home' })
})

ipcRenderer.on('log', (event, log) => {
  store.dispatch('instagram/addLog', log)
})
