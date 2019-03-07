export default {

  'SET_ORDER'(state, order) {
    state.order = order;
  },

  'SET_ORDERS'(state, orders) {
    state.orders = orders;
  },

  'UPDATE_ORDER_ITEM'(state, item) {
    state.order.items.forEach(element => {
      if (element.uuid === item.uuid)  {
        element.prepare = item.prepare
        element.amount = item.amount
        element.locals = item.locals
      }
    })
  }
}
