<template>
  <div class="page-user__userFood_hasBind">
    <div class="top">
      <img :src="userInfo.head_img" alt="">
      <div class="name">{{userInfo.name}}</div>
    </div>

    <div class="text">
      <div class="company">{{userInfo.company}}</div>
      <div class="position">{{userInfo.position}}</div>
    </div>

    <div class="bottom">
      <img src="../../../../assets/img/logo.png" class="logo">
      <div class="copyright">©copyright 广州市日日健餐饮管理有限公司</div>
    </div>
  </div>
</template>

<script>
import utils from '@/utils'

export default {
  data() {
    return {
      userInfo: ''
    }
  },

  mounted() {
    this.userInfo = JSON.parse(this.$root.$mp.query.user_info)
  
  },

  methods: {
   
  },
  components: {}
}
</script>
<style lang="less">
@import '../../../../assets/css/mixin.less';
page {
  background: #fff;
}
.page-user__userFood_hasBind {
  .full-page();
  text-align: center;

  .top {
    height: 156px;
    background: url(~@/assets/img/login_bg.png);
    background-size: cover;
    color: #fff;
    padding-top: 23px;

    img {
      .wh(60px);
      border-radius: 50%;
    }

    .name {
      font-size: 16px;
      line-height: 22px;
      margin-top: 12px;
    }
  }

  .text {
    padding-top: 24px;
    line-height: 24px;

    .company {
      margin-bottom: 8px;
    }
  }

  .bottom {
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
}
</style>

