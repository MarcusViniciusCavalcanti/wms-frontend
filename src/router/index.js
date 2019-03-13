import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/dashboard')

// Routes
import configurations from './routers/actionsIntern'
import ordersPrepare from './routers/orders-prepare'
import ordersItemsIn from './routers/orders-items-in'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'actions',
          redirect: '/allocations/all',
          name: 'Ações internas',
          component: {
            render (component) { return component('router-view') },
          },
          children: [ ...configurations ]
        },
        {
          path: 'orders',
          redirect: '/orders/prepare/all',
          name: 'Pedidos',
          component: {
            render (component) { return component('router-view') },
          },
          children: [ ...ordersPrepare, ...ordersItemsIn ]
        },
      ]
    },
  ]
})
