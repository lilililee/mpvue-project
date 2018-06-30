<template>
  <div class="page-home__index">
    <div class="notice" @click="toNotice()">
      {{homeInfo.notice? homeInfo.notice.desc: ''}}
    </div>
    <div class="banner" @click="isShowUserPicker=true">
      <swiper :indicator-dots="true" :autoplay="true" interval="3000" duration="500">
        <div v-for="item in homeInfo.banner" :key="item.img">
          <swiper-item>
            <image :src="item.img" class="slide-image" />
          </swiper-item>
        </div>
      </swiper>
    </div>

      <!-- 由于不支持slot scoped ,不能使用组件形式 -->
    <div class="user-list-container">
      <div class="c-user-list ">
        <ul>
          <li class="user-item flex-start" v-for="item in userList" :key="item.id">
            <div class="img">
              <img :src="item.head_img" alt="">
            </div>
            <div class="info">
              <div class="top">
                <div class="name">{{item.name}}</div>
                <div class="role">{{item.role_name}}</div>
              </div>
              <div class="bottom">
                <div class="address" v-if="item.address_name">{{item.address_name}}</div>
              </div>

            </div>
            <div class="assist">
              <div class="btn-group flex-end">
                <div class="btn btn__mini btn__gary" v-if="item.add_status=='0'">加餐</div>
                <div class="btn btn__mini btn__purple" v-else @click="toChooseMonth(item, 1)">加餐</div>
                <div class="btn btn__mini btn__gary" v-if="item.booking_status=='0'">订餐</div>
                <div class="btn btn__mini" v-else @click="toChooseMonth(item, 2)">订餐</div>
              </div>
            </div>
          </li>
        </ul>
      </div>

    </div>

   

  </div>
</template>

<script>
import utils from '../../utils'
import UserList from '../UserList'
import UserPicker from '../UserPicker'
export default {
  data() {
    return {
      homeInfo: {},
      userList: [],
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
    toChooseMonth(user, type) {
      // 更新当前用户
      this.$store.commit('updateNowUser', user)

      wx.navigateTo({
        url: `/pages/home/chooseMonth/main?type=${type}`
      })
    },

    toNotice() {
      if (!this.homeInfo.notice) return
      wx.navigateTo({
        url: `/pages/home/notice/main?notice_id=${this.homeInfo.notice.notice_id}`
      })
    },

  
  },
  components: {
    UserList,
    UserPicker
  }
}
</script>
<style lang="less">
@import '../../assets/css/mixin.less';
.page-home__index {
  swiper {
    height: 200px;
  }
  .slide-image {
    width: 100%;
    height: 100%;
  }

  .user-list-container {
    margin-top: 12px;
    

    .assist {
      .btn {
        margin-left: 12px;
      }
    }
  }

  
}
</style>

