<template>
  <b-table
    :id="id"
    hover
    small
    striped
    responsive
    borderless
    :items="items"
    :fields="fields"
  >
  </b-table>
</template>

<script>
  export default {
    name: 'items-in-table',
    props: {
      id: {
        type: String,
        require
      },
      fields: {
        type: [Array, Object],
        default: () => [],
      },
      items: {
        type: Array,
        default: []
      },
      resourceName: {
        type: String,
      },
    },
  }
</script>

<style scoped>

</style>
