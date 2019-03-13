export default {

  'SET_REALLOCATION'(state, reallocation) {
    state.reallocation = reallocation;
  },

  'SET_REALLOCATIONS'(state, reallocations) {
    state.reallocations = reallocations;
  },

  'UPDATE_QUANTITY'(state, reallocation) {
    state.reallocations.forEach(item => {
      if (item.uuid === reallocation.uuid) {
        item.quantity = reallocation.quantity
      }
    })
  }
}
