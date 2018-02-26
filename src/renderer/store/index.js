import Vue from 'vue'
import Vuex from 'vuex'

// import modules from './modules'
import instagram from './modules/instagram'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    instagram
  },
  strict: process.env.NODE_ENV !== 'production'
})
