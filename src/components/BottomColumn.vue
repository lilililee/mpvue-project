<template>
    <div class="c-bottom-column flex-between">
        <div class="c-bottom-column-info">111
            <slot name="left"></slot>
        </div>

        <div class="c-bottom-column-btn">
            <slot name="right"></slot>
        </div>

    </div>
</template>

<script>
import utils from '@/utils'
export default {
  props: {},
  data() {
    return {}
  },
  mounted() {}
}
</script>

<style lang="less">
@import '../assets/css/mixin';
.c-bottom-column {
  height: 120rpx;
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  line-height: 120rpx;

  .info {
    width: 70%;
    padding-left: 30rpx;

    // span {
    //   font-size: 30rpx;
    // }
  }

  .submit-btn {
    width: 180rpx;
    text-align: center;
    background: #ccc;
    color: #fff;

    &.active {
      background: @theme;
    }
  }
}
</style>
