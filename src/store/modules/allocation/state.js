export default {
  allocation:{
    uuid: '',
    name: '',
    address: '',
    quantityMax:'',
    quantityMin: '',
    quantity: '',
    itemAllocated: {},
    reserves: [],
    _links: '',
  },

  allocations: {
    page: {
      content: [{
        numberOfPage: 0,
        items: [],
      }],
      size: 0,
      totalElements: 0,
      totalPages: 0,
      currentPage: 0,
      _links: {
        first: null,
        self: null,
        next: null,
        last: null,
      }
    }
  },

}
