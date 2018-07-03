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
                        <div class="icon">icon</div>
                        <div class="title">钱包</div>
                    </div>
                    <div class="right">
                        <div class="arrow">右</div>
                    </div>
                </li>
                <li @click="toSubPage('useFood/index')">
                    <div class="left">
                        <div class="icon">icon</div>
                        <div class="title">用餐人</div>
                    </div>
                    <div class="right">
                        <div class="arrow">右</div>
                    </div>
                </li>
                <li @click="toSubPage('password')">
                    <div class="left">
                        <div class="icon">icon</div>
                        <div class="title">修改密码</div>
                    </div>
                    <div class="right">
                        <div class="arrow">右</div>
                    </div>
                </li>
                <li @click="toSubPage('feedback')">
                    <div class="left">
                        <div class="icon">icon</div>
                        <div class="title">用餐反馈</div>
                    </div>
                    <div class="right">
                        <div class="arrow">右</div>
                    </div>
                </li>

            </ul>

            <div class="login-out">
                <div class="login-out__btn">退出登录</div>
            </div>
        </div>
    </div>
</template>

<script>
import utils from '../../utils'

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
    },
    toSubPage(page) {
      wx.navigateTo({ url: `/pages/user/${page}/main` })
    }
  },
  components: {
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
    background: @blue;
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

