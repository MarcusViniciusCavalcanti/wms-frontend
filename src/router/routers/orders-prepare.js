const Orders = () =>import('@/views/orders/prepare/prepare-all')
const OrderStart = () => import('@/views/orders/prepare/prepare-start')

export default [
  {
    path: '/orders/prepare/all',
    name: 'Separação',
    component:  Orders,
  },
  {
    path: '/orders/prepare/start',
    name: 'Executando Separação',
    component: OrderStart,
  }
]
