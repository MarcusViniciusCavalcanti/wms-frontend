import state from './state'
import mutations from './mutations'
import getters from './getters'

const module = {
  namespaced: true,
  state,
  mutations,
  getters,
}

export default module
