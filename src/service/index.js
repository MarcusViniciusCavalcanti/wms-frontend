import IndexApi from './endpoints'
import AllocationAddressAttributes from './allocations/AllocationsAddressAttributesService'
import Allocation from '@/service/allocations/Allocation'
import Orders from '@/service/orders/Orders'

const indexApi = new IndexApi()
const allocationAddressAttributes = new AllocationAddressAttributes()
const allocation = new Allocation()
const order = new Orders()

export  {
  indexApi,
  allocationAddressAttributes,
  allocation,
  order,
}
