export default {

  'SET_ALLOCATION_ADDRESS_ATTRIBUTE'(state, allocationAddressAttribute) {
    state.allocationAddressAttribute = allocationAddressAttribute;
  },

  'SET_ALLOCATION_ADDRESS_ATTRIBUTES'(state, allocationAddressAttributes) {
    state.allocationAddressAttributes = allocationAddressAttributes;
  },

  'SET_NEW_ALLOCATION_ADDRESS_ATTRIBUTES'(state, allocationAddressAttribute) {
    state.allocationAddressAttributes.
      _embedded.allocationsAttributesResourcesList.unshift(allocationAddressAttribute)
  },

  'REMOVE_ALLOCATION_ATTRIBUTES'(state, allocationAddressAttribute) {
    const index = state.allocationAddressAttributes._embedded.allocationsAttributesResourcesList.indexOf(allocationAddressAttribute)
    state.allocationAddressAttributes._embedded.allocationsAttributesResourcesList.splice(index, 1)
  }
}
