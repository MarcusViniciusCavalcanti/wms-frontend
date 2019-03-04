import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import modules from './modules'

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: 'auth',
  storage: window.localStorage,
  // reducer: state => ({
  //   auth: {
  //     authorization: state.auth.authorization,
  //   },
  // }),
})

export default new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  modules
})
