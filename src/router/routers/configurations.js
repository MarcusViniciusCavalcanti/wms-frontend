const Allocations = () => import('@/views/allocation/index')
const NewAllocations = () => import('@/views/allocation/new-allocation')
const Attributes = () => import('@/views/allocation/attributes/list-all')
const NewAttributes = () => import('@/views/allocation/attributes/add-attributes')


export default [
  {
    path: '/configurations/allocations/all',
    name: 'Alocações',
    component:  Allocations
  },
  {
    path: '/configurations/allocations/new',
    name: 'Nova Alocação',
    component:  NewAllocations
  },
  {
    path: '/configurations/allocations/attributes',
    name: 'Atributos Alocações',
    component:  Attributes
  },
  {
    path: '/configurations/allocations/attributes/new',
    name: 'Novo Atributos Alocações',
    component: NewAttributes
  }
]
