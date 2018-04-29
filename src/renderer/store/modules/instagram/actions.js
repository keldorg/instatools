import * as types from './mutation-types'

export const login = ({ commit }, data) => {
  commit(types.LOGIN, data)
}

export const profile = ({ commit }, data) => {
  commit(types.SET_PROFILE, data)
}

export const addLog = ({ commit }, data) => {
  commit(types.ADD_LOG, data)
}

export const profileMedia = ({ commit }, data) => {
  commit(types.ADD_PROFILE_MEDIA, data)
}

export const setFollowers = ({ commit }, data) => {
  commit(types.ADD_FOLLOWERS, data)
}

export default {
  login,
  profile,
  addLog,
  profileMedia,
  setFollowers
}
