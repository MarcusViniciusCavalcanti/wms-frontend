export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'primary',
      },
    },
    {
      title: true,
      name: 'Pedidos',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Entrada de Item',
      url: '/orders/items-in/all',
      icon: 'cui-task'
    },
    {
      name: 'Separação',
      url: '/orders/prepare/all',
      icon: 'cui-cart'
    },
    {
      title: true,
      name: 'Ações Internas',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Alocação',
      url: '/allocations/all',
      icon: 'fa fa-cubes',
      children: [
        {
          name: 'Todos',
          url: '/allocations/all',
          icon: 'icon-layers'
        },
        {
          name: 'Nova',
          url: '/allocations/new',
          icon: 'icon-plus'
        },
        {
          name: 'Attributos',
          url: '/allocations/attributes',
          icon: 'icon-puzzle'
        },
      ]
    },
    {
      name: 'Realocação',
      url: '/reallocations/all',
      icon: 'icon-refresh',
      children: [
        {
          name: 'Todos',
          url: '/reallocations/all',
          icon: 'icon-layers'
        },
      ]
    },
  ]
}
