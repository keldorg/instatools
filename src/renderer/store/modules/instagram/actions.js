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

export default {
  login,
  profile,
  addLog
}
