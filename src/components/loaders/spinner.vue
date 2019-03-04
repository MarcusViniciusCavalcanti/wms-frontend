<template>
  <div class="loader-box">
    <div class="loader"></div>
  </div>
</template>

<script>
  export default {
    name: 'spinner',
  }
</script>

<style lang="scss" scoped>
  .loader-box {
    align-items: center;
    display: flex;
    justify-content: center;
    height: 100%;

    .loader {
      animation: rotate 1s infinite;
      height: 50px;
      width: 50px;
      &:before,
      &:after {
        border-radius: 50%;
        content: '';
        display: block;
        height: 20px;
        width: 20px;
      }
      &:before {
        animation: ball1 1s infinite;
        background-color: #D5D5D5;
        box-shadow: 30px 0 0 #2E353A;
        margin-bottom: 10px;
      }
      &:after {
        animation: ball2 1s infinite;
        background-color: #0BA2C7;
        box-shadow: 30px 0 0 #9DDEEF;
      }
    }
  }

  .full-page {
    @extend .loader-box;
    .loader {
      position:absolute;
      left:50%;
      top:50%;
      transform: translate(-50%, -50%);
    }
  }


  @keyframes rotate {
    0% {
      -webkit-transform: rotate(0deg) scale(0.8);
      -moz-transform: rotate(0deg) scale(0.8);
    }
    50% {
      -webkit-transform: rotate(360deg) scale(1.2);
      -moz-transform: rotate(360deg) scale(1.2);
    }
    100% {
      -webkit-transform: rotate(720deg) scale(0.8);
      -moz-transform: rotate(720deg) scale(0.8);
    }
  }

  @keyframes ball1 {
    0% {
      box-shadow: 30px 0 0 #2E353A;
    }
    50% {
      box-shadow: 0 0 0 #2E353A;
      margin-bottom: 0;
      -webkit-transform: translate(15px, 15px);
      -moz-transform: translate(15px, 15px);
    }
    100% {
      box-shadow: 30px 0 0 #2E353A;
      margin-bottom: 10px;
    }
  }

  @keyframes ball2 {
    0% {
      box-shadow: 30px 0 0 #9DDEEF;
    }
    50% {
      box-shadow: 0 0 0 #9DDEEF;
      margin-top: -20px;
      -webkit-transform: translate(15px, 15px);
      -moz-transform: translate(15px, 15px);
    }
    100% {
      box-shadow: 30px 0 0 #9DDEEF;
      margin-top: 0;
    }
  }
</style>
