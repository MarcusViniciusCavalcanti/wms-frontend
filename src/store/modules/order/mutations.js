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
  },

  'START_PREPARE_ORDER'(state, task) {
    state.order.tasks.push(task)
  },

  'STOP_PREPARE_ORDER'(state, task) {
    state.order.tasks.forEach(element => {
      if (element.uuid === task.uuid) {
        element.end = task.end
      }
    })
  },
}
