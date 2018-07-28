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

    <company-copyright :useImg="true"></company-copyright>
  </div>
</template>

<script>
import utils from '@/utils'
import CompanyCopyright from '@/components/CompanyCopyright'

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
  components: {CompanyCopyright}
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

}
</style>

