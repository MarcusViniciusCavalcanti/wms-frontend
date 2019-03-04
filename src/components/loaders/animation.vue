<template>
  <div class="loader-box" v-bind:class="float">
    <div class="loader">
      <div class="bar1"></div>
      <div class="bar2"></div>
      <div class="bar3"></div>
      <div class="bar4"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'animation',
    props: ['float'],
  }
</script>

<style lang="scss" scoped>
  .loader-box {
    align-items: center;
    display: flex;
    justify-content: center;
    height:64px;

    .loader {
      margin: 0 auto;
      width: 60px;
      height: 50px;
      text-align: center;
      font-size: 10px;
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translateY(-50%) translateX(-50%);

      > div {
        height: 100%;
        width: 8px;
        display: inline-block;
        float: left;
        margin-left: 2px;
        -webkit-animation: delay 0.8s infinite ease-in-out;
        animation: delay 0.8s infinite ease-in-out;
      }

      .bar1{
        background-color: #2E353A;
      }
      .bar2{
        background-color: #D5D5D5;
        -webkit-animation-delay: -0.7s;
        animation-delay: -0.7s;
      }
      .bar3{
        background-color: #0BA2C7;
        -webkit-animation-delay: -0.6s;
        animation-delay: -0.6s;
      }
      .bar4{
        background-color: #9DDEEF;
        -webkit-animation-delay: -0.5s;
        animation-delay: -0.5s;
      }
    }
  }

  .right {
    @extend .loader-box;
    .loader {
      right: 0;
    }
  }

  @-webkit-keyframes delay {
    0%, 40%, 100% { -webkit-transform: scaleY(0.05) }
    20% { -webkit-transform: scaleY(1.0) }
  }

  @keyframes delay {
    0%, 40%, 100% {
      transform: scaleY(0.05);
      -webkit-transform: scaleY(0.05);
    }  20% {
         transform: scaleY(1.0);
         -webkit-transform: scaleY(1.0);
       }
  }
</style>
