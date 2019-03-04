export default {

  allocation: state => state.allocation,

  allocations: state => state.allocations,

  getAllocationByUUID: state => uuid => state.allocations
  .page.content.flatMap(item => item.items).find(({uuid:UUID}) => UUID === uuid),

  getAllocationByName: state => name => state.allocations
  .page.content.flatMap(item => item.items).filter(({name:NAME}) => NAME.includes(name)),

  getPageBy: state => numberOfPage => state.allocations.page.content[numberOfPage]
}
