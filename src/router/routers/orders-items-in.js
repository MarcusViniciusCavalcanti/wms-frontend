const Orders = () =>import('@/views/orders/itemsIn/items-in-all')
// const OrderStart = () => import('@/views/orders/prepare/prepare-start')

export default [
  {
    path: '/orders/items-in/all',
    name: 'Entrada de Items',
    component:  Orders,
  },
]
