const Orders = () =>import('@/views/orders/itemsIn/items-in-all')
// const OrderStart = () => import('@/views/orders/prepare/prepare-start')

export default [
  {
    path: '/orders/in/all',
    name: 'Entrada de Items',
    component:  Orders,
  },
  // {
  //   path: '/orders/prepare/start',
  //   name: 'Executando Separação',
  //   component: OrderStart,
  // }
]
