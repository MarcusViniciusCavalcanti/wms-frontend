export default {

  order: state => state.order,

  orders: state => state.orders,

  getOrdersByUUID: state => uuid => state.orders.find(order => order.uuid === uuid)

  // getAllocationByUUID: state => uuid => state.allocations
  // .page.content.flatMap(item => item.items).find(({uuid:UUID}) => UUID === uuid),
  //
  // getAllocationByName: state => name => state.allocations
  // .page.content.flatMap(item => item.items).filter(({name:NAME}) => NAME.includes(name)),
  //
  // getPageBy: state => numberOfPage => state.allocations.page.content[numberOfPage]
}
