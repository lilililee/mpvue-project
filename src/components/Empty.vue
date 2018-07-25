<template>
  <div class="c-empty">
    <img src="../assets/img/empty.png" class="img"></img>
    <div class="text">{{text}}</div>
 
  </div>
</template>

<script>
import utils from '../utils'
export default {
  props: {
    text: {
      type: String,
      default: '' // booking | order
    }
  }
}
</script>

<style lang="less">
@import '../assets/css/mixin';
.c-empty {
  .img {
    display: block;
    .wh(190px);
    margin: 36px auto 5px auto;
    // background: url(~@/assets/img/empty.png) center center no-repeat;
    // background-size: contain;
  }

  .text {
    font-size: 16px;
    color: @gray;
    text-align: center;
  }
}
</style>
