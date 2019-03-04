import IndexApi from './endpoints'
import AllocationAddressAttributes from './allocations/AllocationsAddressAttributesService'
import Allocation from '@/service/allocations/Allocation'

const indexApi = new IndexApi()
const allocationAddressAttributes = new AllocationAddressAttributes()
const allocation = new Allocation()

export  {
  indexApi,
  allocationAddressAttributes,
  allocation,
}
