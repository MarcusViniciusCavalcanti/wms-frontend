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
}
