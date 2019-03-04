const Allocations = () => import('@/views/allocation/index')
const Form = () => import('@/views/allocation/form')
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
  {
    path: '/configurations/allocations/attributes/new',
    name: 'Novo Atributos Alocações',
    component: NewAttributes
  }
]
