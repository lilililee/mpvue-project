<template>
    <div class="page-home__index" v-if="homeInfo.notice">
        <div class="banner">
            <!-- <swiper :indicator-dots="true" :autoplay="true" interval="3000" duration="500">
                <div v-for="(item,index) in homeInfo.banner" :key="item.img">
                    <swiper-item v-if="index==0">
                        <image :src="item.img" class="slide-image" />
                    </swiper-item>
                </div>
            </swiper> -->
            <image :src="homeInfo.banner[0].img" @error="onImageError" class="slide-image" />
        </div>

        <i-notice-bar :loop="homeInfo.notice.desc.length>20" @click="toNoticePage">
            {{homeInfo.notice.desc}}
        </i-notice-bar>

        <!-- 由于不支持slot scoped ,不能使用组件形式 -->
        <div class="user-list-container">

            <div class="c-user-list" v-if="userList.length">
                <ul>
                    <li class="user-item flex-start" v-for="item in userList" :key="item.id">
                        <div class="img">
                            <img :src="item.head_img" alt="">
                        </div>
                        <div class="info">
                            <div class="top">
                                <div class="name">{{item.name}}</div>
                                <div class="c-role" :class="'role_' + item.role_id">{{item.role_name}}</div>
                            </div>

                        </div>
                        <div class="assist">
                            <div class="btn-group" v-if="system=='company'">
                                <div class="btn btn__mini" @click="toChooseFood">订餐</div>
                            </div>
                            <div class="btn-group" v-else>
                                <div class="btn btn__mini btn__gary" v-if="item.add_status=='0'">加餐</div>
                                <div class="btn btn__mini btn__purple" v-else @click="toChooseMonth(item, 1)">加餐</div>
                                <div class="btn btn__mini btn__gary" v-if="item.booking_status=='0'">订餐</div>
                                <div class="btn btn__mini" v-else @click="toChooseMonth(item, 2)">订餐</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="add-user-area" v-else>
                <div class="add-user" @click="toAddUserPage">+ 添加用餐人</div>
                <div class="tips">初次使用,请先添加用餐人</div>
            </div>

        </div>

    </div>
</template>

<script>
import utils from '@/utils'
import UserList from '@/components//UserList'

export default {
 props: {
     showTimes: Number
 },
  
  data() {
    return {
      system: utils._config.system,
      homeInfo: {},
      userList: []
    }
  },
  watch:{
    showTimes(val) {
      if(val > 0) {
        this.getUserList()
      }
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
        loading: true,
        success: res => {
          if (res.code == 0) {
            this.userList = res.data.list || []
            this.$store.commit('updateNowUser', this.userList[0] || {})
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
    // 企业版直接跳到选餐页面
    toChooseFood() {
      wx.navigateTo({
        url: `/pages/home/chooseFood/main`
      })
    },

    toNoticePage() {
      if (!this.homeInfo.notice) return
      wx.navigateTo({
        url: `/pages/home/notice/main?notice_id=${this.homeInfo.notice.notice_id}`
      })
    },
    toAddUserPage() {
      wx.navigateTo({
        url: `/pages/user/useFood/addUser/main`
      })
    },
    onImageError() {
      this.homeInfo.banner[0].img = require('../../assets/img/banner_default.png')
    }
  },
  components: {
    UserList
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
    display: block;
    width: 100%;
    height: 200px;
  }
  .user-list-container {
    margin-top: 12px;
    .add-user-area {
      text-align: center;
      .add-user {
        display: block;
        .lh(66px);
        background: #fff;
      }
      .tips {
        font-size: 12px;
        color: @gray;
        margin-top: 12px;
      }
    }
    .assist {
      .btn-group {
        .flex-end(); // padding: 0;
      }
      .btn {
        margin-left: 12px;
      }
    }
  }
}
</style>