export default {

  reallocation: state => state.reallocation,

  reallocations: state => state.reallocations,

  getAllocationByUUID: state => uuid => state.reallocations.find(reallocation => reallocation.uuid === uuid)
}
