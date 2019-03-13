const Allocations = () => import('@/views/allocation/index')
const CreateAllocations = () => import('@/views/allocation/create')
const EditAllocations = () => import('@/views/allocation/edit')
const Attributes = () => import('@/views/allocation/attributes/list-all')
const Reallocations = () => import('@/views/reallocation')

export default [
  {
    path: '/allocations/all',
    name: 'Alocações',
    component:  Allocations
  },
  {
    path: '/allocations/new',
    name: 'Nova Alocação',
    component:  CreateAllocations
  },
  {
    path: '/allocations/edit',
    name: 'Editar Alocação',
    component:  EditAllocations
  },
  {
    path: '/allocations/attributes',
    name: 'Atributos Alocações',
    component:  Attributes
  },
  {
    path: '/reallocations/all',
    name: 'Realocações',
    component:  Reallocations
  },
]
