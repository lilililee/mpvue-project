<template>
  <div class="page-user__index">
    <div class="page-user__index__container">

      <div class="user-info">
        <div class="headimg">
          <open-data type="userAvatarUrl"></open-data>
        </div>
        <div class="username">
          <open-data type="userNickName"></open-data>
        </div>
      </div>

      <ul class="menu-list">
        <li @click="toSubPage('wallet/index')">
          <div class="left">
            <i class="icon-menu-wallet"></i>
            <div class="title">钱包</div>
          </div>
          <div class="right">
            <i class="icon-arrow-right"></i>
          </div>
        </li>
        <li @click="toSubPage('wallet/index')" v-if="system=='company'">
          <div class="left">
            <i class="icon-menu-shopping"></i>
            <div class="title">积分商城</div>
          </div>
          <div class="right">
            <i class="icon-arrow-right"></i>
          </div>
        </li>
        <li @click="toUseFoodPage()">
          <div class="left">
            <i class="icon-menu-user"></i>
            <div class="title">用餐人</div>
          </div>
          <div class="right">
            <i class="icon-arrow-right"></i>
          </div>
        </li>
        <li @click="toSubPage('password')">
          <div class="left">
            <i class="icon-menu-password"></i>
            <div class="title">修改密码</div>
          </div>
          <div class="right">
            <i class="icon-arrow-right"></i>
          </div>
        </li>
        <li @click="toSubPage('feedback/index')">
          <div class="left">
            <i class="icon-menu-feedback"></i>
            <div class="title">意见反馈</div>
          </div>
          <div class="right">
            <i class="icon-arrow-right"></i>
          </div>
        </li>

      </ul>

      <div class="login-out">
        <div class="login-out__btn" @click="isShowDelatePopbox=true">退出登录</div>
      </div>
    </div>

    <popbox v-model="isShowDelatePopbox" :popboxData="popboxData" @comfirm="comfirmLoginout"></popbox>
  </div>
</template>

<script>
import utils from '@/utils'
import config from '@/config'
import Popbox from '@/components/Popbox'

export default {
  data() {
    return {
      //   homeInfo: {},
      system: config.system,

      isShowDelatePopbox: false,
      popboxData: {
        title: '确认退出',
        content: '您确定要退出登录吗？'
      }
    }
  },

  mounted() {
  },

  methods: {
 
    toSubPage(page) {
      wx.navigateTo({ url: `/pages/user/${page}/main` })
    },
    toUseFoodPage() {
      if (this.system == 'company') {
        utils.ajax({
          action: 'getUserBindStatus',
          success: res => {
            if (res.code == 0) {
              let page = ''
              switch (res.data.status) {
              // switch ('1') {
                case '2': // 已绑定
                  page = 'hasBind'
                  break
                case '3': // 后台号码不一致
                  page = 'checkPhone'
                  break
                default:
                  page = 'addUser'
              }

              wx.navigateTo({ url: `/pages/user/useFood/${page}/main?user_info=${JSON.stringify(res.data.user_info)}` })
            }
          }
        })
      } else {
        wx.navigateTo({ url: `/pages/user/useFood/index/main` })
      }
    },
    comfirmLoginout() {
      this.isShowDelatePopbox = false
      // 清除登录信息
      this.$store.commit('updateToken', '')

      wx.reLaunch({
        url: '/pages/login/index/main'
      })
    }
  },
  components: {
    Popbox
    // TabBar
    // UserList
  }
}
</script>
<style lang="less">
@import '../../assets/css/mixin.less';
.page-user__index {
  .page-user__index__container {
    .full-page();
  }
  .user-info {
    height: 128px;
    text-align: center;
    padding-top: 18px;
    background: url(~@/assets/img/img_user.png) center center no-repeat;
    background-size: contain;

    .headimg {
      margin: auto;
      .wh(60px);
      border-radius: 50%;
      overflow: hidden;
    }

    .username {
      margin-top: 8px;
      font-size: 14px;
      color: #fff;
    }
  }

  .menu-list {
    background: #fff;
    margin-top: 12px;

    padding: 0 16px;
    li {
      .flex-between();
      height: 56px;

      .left {
        width: 60%;
        .flex-start();

        .title {
          font-size: 14px;
          color: #000;
          margin-left: 8px;
        }
      }

      & + li {
        border-top: 1rpx solid @borderColor;
      }
    }
  }

  .login-out {
    margin-top: 16px;
    padding: 0 12px;
    .login-out__btn {
      background: #fff;
      .lh(44px);
      text-align: center;
      color: #ff0707;
    }
  }
}
</style>

