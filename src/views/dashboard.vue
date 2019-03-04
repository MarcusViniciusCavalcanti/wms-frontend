<template>
  <div class="animated fadeIn">
    <h1>dashboard</h1>
  </div>
</template>

<script>

  import { indexApi } from '@/service'

export default {
  name: 'dashboard',


  data() {
    return {
      loading: true,
    }
  },

  mounted : async function () {
    await indexApi.getAllEndPoints()
  }
}
</script>

<style>

</style>
