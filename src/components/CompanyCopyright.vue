<template>
  <div class="c-company-copyright">

    <img src="../assets/img/logo.png" class="logo" v-if="useImg">
    <div class="copyright">©copyright 广州市日日健餐饮管理有限公司</div>

  </div>
</template>

<script>
import utils from '@/utils'
export default {
  props: {
    useImg: {
      type: Boolean,
      default: false
    }
  },
 
}
</script>

<style lang="less">
@import '../assets/css/mixin';
.c-company-copyright {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  padding-bottom: 24px;

  font-size: 12px;
  color: #666666;
  line-height: 17px;

  text-align: center;
  .logo {
    display: inline-block;
    .wh(60px);
    margin-bottom: 6px;
  }
}
</style>
