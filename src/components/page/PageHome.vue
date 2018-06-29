<template>
    <div class="page-home__index">
        <div class="notice" @click="toNotice()">
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
            <user-list :userList="userList" @assetsClick="toChooseMonth">
                <div class="c-user-list__assets flex-center">
                    <div class="text">
                        <div>开始</div>
                        <div>订餐</div>
                    </div>
                </div>
            </user-list>
        </div>

    </div>
</template>

<script>
import utils from '../../utils'
// import TabBar from '../../components/TabBar'
import UserList from '../UserList'
export default {
  data() {
    return {
      homeInfo: {},
      userList: []
    }
  },

  mounted() {
    this.getHomeInfo()
    this.getUserList()
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
    },
    getUserList() {
      utils.ajax({
        action: 'getUserList',
        success: res => {
          if (res.code == 0) {
            this.userList = res.data.list
            this.$store.commit('updateNowUser', this.userList[0])
          }
        }
      })
    },
    toChooseMonth(user) {
      // 更新当前用户
      this.$store.commit('updateNowUser', user)

      wx.navigateTo({
        url: '/pages/home/chooseMonth/main'
      })
    },

    toNotice() {
      if (!this.homeInfo.notice) return
      wx.navigateTo({
        url: `/pages/home/notice/main?notice_id=${this.homeInfo.notice.notice_id}`
      })
    }
  },
  components: {
    // TabBar
    UserList
  }
}
</script>
<style lang="less">
@import '../../assets/css/mixin.less';
.page-home__index {
  .slide-image {
    width: 100%;
    height: 400rpx;
  }

  .user-list-container {
    padding: 40rpx 30rpx;

    .c-user-list__assets {
      height: 100%;
      width: 100%;
      background: @blue;
      color: #fff;

      .text {
        div {
          margin: 10rpx 0;
        }
      }
    }
  }
}
</style>

