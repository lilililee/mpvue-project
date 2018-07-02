<template>
    <div class="page-order__index">
        <div class="notice">
            {{homeInfo.notice? homeInfo.notice.title: ''}}
        </div>

        <div class="banner">
            <swiper :indicator-dots="true" :autoplay="true" interval="3000" duration="500">
                <div v-for="item in homeInfo.banner" :key="item.img">
                    <swiper-item>
                        <image :src="item.img" class="slide-image" />
                    </swiper-item>
                </div>
            </swiper>
        </div>

        <div class="user-list-container">
            <!-- <user-list>
        sss
      </user-list> -->
        </div>

        <!-- <tab-bar page="home"></tab-bar> -->
    </div>
</template>

<script>
import utils from '../../utils'
// import TabBar from '../../../components/TabBar'
// import UserList from '../../../components/UserList'
export default {
  data() {
    return {
      homeInfo: {}
    }
  },

  mounted() {
    this.getHomeInfo()
  },

  methods: {
    getHomeInfo() {
      utils.ajax({
        action: 'getHomeInfo',
        success: res => {
          if (res.code == 0) {
            this.homeInfo = res.data
          }
        }
      })
    }
  },
  components: {
    // TabBar
    // UserList
  }
}
</script>
<style lang="less">
.page-order__index {
  @import '../../assets/css/mixin.less';
  //   .slide-image {
  //     width: 100%;
  //     height: 400rpx;
  //   }
}
</style>

