<template>
  <a class="btn btn-default" @click='goBack'>
    Voltar
  </a>
</template>

<script>
  export default {
    name: 'c-button-back',
    methods: {
      goBack () {
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
      }
    }
  }
</script>
