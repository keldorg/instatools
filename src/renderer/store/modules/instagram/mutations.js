import {
  LOGIN,
  SET_PROFILE,
  ADD_LOG,
  RESET_LOG
} from './mutation-types'

export default {
  [LOGIN] (state) {
    state.authenticated = true
  },

  [SET_PROFILE] (state, data) {
    state.profile.username = data.username
    state.profile.id = data.id
    state.profile.profileUrl = data.profile_pic_url
    state.profile.raw = data
  },

  [ADD_LOG] (state, log) {
    state.logs.push(log)
  },

  [RESET_LOG] (state, log) {
    state.logs = []
  }
}
