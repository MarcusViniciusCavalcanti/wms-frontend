const Orders = () =>import('@/views/orders/itemsIn/items-in-all')
const OrderStart = () => import('@/views/orders/itemsIn/items-in-start')

export default [
  {
    path: '/orders/items-in/all',
    name: 'Entrada de Items',
    component:  Orders,
  },
  {
    path: '/orders/items-in/start',
    name: 'Executando Entrada de Items',
    component: OrderStart,
  }
]
