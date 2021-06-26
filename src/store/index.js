import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'prodution'

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  strict: debug, // 开启严格模式,比如修改state必须通过mutations
  plugins: debug ? [createLogger()] : []
})

export default store