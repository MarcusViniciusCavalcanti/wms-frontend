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
      name: 'Entrada',
      url: '/orders/in/all',
      icon: 'cui-task'
    },
    {
      name: 'Saída',
      url: '/orders/out/all',
      icon: 'icon-share-alt'
    },
    {
      name: 'Transferência',
      url: '/orders/shared/all',
      icon: 'icon-share'
    },
    {
      name: 'Separação',
      url: '/orders/prepare/all',
      icon: 'cui-cart'
    },
    {
      title: true,
      name: 'Configurações',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Alocação',
      url: '/configurations/allocations/all',
      icon: 'icon-map',
      children: [
        {
          name: 'Todos',
          url: '/configurations/allocations/all',
          icon: 'icon-layers'
        },
        {
          name: 'Nova',
          url: '/configurations/allocations/new',
          icon: 'icon-plus'
        },
        {
          name: 'Attributos',
          url: '/configurations/allocations/attributes',
          icon: 'icon-puzzle'
        },
      ]
    }
  ]
}
