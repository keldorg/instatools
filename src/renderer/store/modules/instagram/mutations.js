import {
  LOGIN,
  SET_PROFILE,
  ADD_LOG,
  RESET_LOG,
  ADD_PROFILE_MEDIA, ADD_FOLLOWERS
} from './mutation-types'

export default {
  [LOGIN] (state) {
    state.authenticated = true
  },

  [SET_PROFILE] (state, data) {
    state.profile.username = data._params.username
    state.profile.id = data._params.id
    state.profile.fullName = data._params.fullName
    state.profile.profileUrl = data._params.profilePicUrl
    state.profile.raw = data._params
  },

  [ADD_LOG] (state, log) {
    state.logs.push(log)
  },

  [ADD_PROFILE_MEDIA] (state, media) {
    state.profileMedia = media
  },

  [ADD_FOLLOWERS] (state, media) {
    console.log(media[0])
    state.followers = media
  },

  [RESET_LOG] (state, log) {
    state.logs = []
  }
}
