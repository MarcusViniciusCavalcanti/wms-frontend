<template>
  <form-allocations />
</template>

<script>
  import store from '@/store'
  import FormAllocations from '@/components/forms/form-allocations'

  export default {
    name: 'edit',
    components: { FormAllocations },

    beforeRouteLeave (to, from, next) {
      const objectDefault = {
        uuid: '',
        name: '',
        address: '',
        quantityMax: '',
        quantityMin: '',
        quantity: '',
        itemAllocated: {},
        reserves: [],
        _links: '',
      }
      store.commit('allocation/SET_ALLOCATION', objectDefault)
      next(true)
    },

  }
</script>

<style scoped>

</style>
