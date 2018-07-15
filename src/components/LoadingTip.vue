<template>
  <div class="c-loading-tip">
    <div v-if="isOver">没有更多了</div>
    <div v-else><img src="../assets/img/loading.svg" alt=""><span>加载中</span></div>
  </div>
</template>

<script>
import utils from '../utils'
export default {
  props: {
    isOver: Boolean
  }
}
</script>

<style lang="less">
@import '../assets/css/mixin';
.c-loading-tip {
  padding: 12px 0;
  font-size: 12px;
  color: @gray;
  text-align: center;

  > div {

    .flex-center();
  }

  img {
    width: 20px;
    height: 20px;
    margin-right: 3px;
    vertical-align: middle;
  }

  // span {
  //   line-height: 20px;
  // }
}
</style>
