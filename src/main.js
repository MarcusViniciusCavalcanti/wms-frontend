import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
import 'vue-snotify/styles/material.css'
import 'v-slim-dialog/dist/v-slim-dialog.css'

import Vue from 'vue'

import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import Snotify from 'vue-snotify'
import SlimDialog from 'v-slim-dialog'


import Notify from '@/plugins/NotifyPlugin'
import store from '@/store'

// todo
// cssVars()

Vue.use(BootstrapVue)
Vue.use(Snotify)
Vue.use(Notify, { store: store })
Vue.use(SlimDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  },
  store,
})
