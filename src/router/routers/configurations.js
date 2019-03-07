const Allocations = () => import('@/views/allocation/index')
const Form = () => import('@/views/allocation/form')
const Attributes = () => import('@/views/allocation/attributes/list-all')

export default [
  {
    path: '/configurations/allocations/all',
    name: 'Alocações',
    component:  Allocations
  },
  {
    path: '/configurations/allocations/new',
    name: 'Nova Alocação',
    component:  Form
  },
  {
    path: '/configurations/allocations/edit',
    name: 'Editar Alocação',
    component:  Form
  },
  {
    path: '/configurations/allocations/attributes',
    name: 'Atributos Alocações',
    component:  Attributes
  },
]
