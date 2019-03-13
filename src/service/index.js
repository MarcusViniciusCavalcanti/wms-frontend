import IndexApi from './endpoints'
import AllocationAddressAttributes from './allocations/AllocationsAddressAttributesService'
import Allocation from '@/service/allocations/Allocation'
import Orders from '@/service/orders/Orders'
import Reallocation from '@/service/reallocation/Reallocation'

const indexApi = new IndexApi()
const allocationAddressAttributes = new AllocationAddressAttributes()
const allocation = new Allocation()
const order = new Orders()
const reallocation = new Reallocation()

export  {
  indexApi,
  allocationAddressAttributes,
  allocation,
  order,
  reallocation,
}
