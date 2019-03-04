export default {

  allocationAddressAttribute: state => state.allocationAddressAttribute,

  allocationAddressAttributes: state => state.allocationAddressAttributes,

  getBrandByUUID: state => uuid => state.allocationAddressAttributes
    ._embedded.allocationsAttributesResourcesList
    .find(allocationAddressAttribute => allocationAddressAttribute.uuid === uuid)
}
