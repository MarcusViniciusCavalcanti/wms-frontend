export default {
  namespaced: true,

  getters: {
    notifications: state => state.notifications,
  },

  state: {
    current_page: {
      title: 'W.M.S',
    },
    notifications: [],
  },

  mutations: {
    'SET_NOTIFICATIONS'(state, notifications) {
      if (notifications instanceof Array) {
        state.notifications = notifications;
      } else {
        state.notifications = [notifications];
      }

    },
  }
}
