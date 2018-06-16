<template>
  <div class="page-login__index">
    <div class="logo">
      logo
    </div>

    <div class="form">
      <div class="input">
        <input type="text" class="phone" v-model="phone" placeholder="请输入您注册时绑定的手机号">
      </div>
      <div class="input">
        <input type="password" class="password" v-model="password" placeholder="请输入密码">
      </div>
    </div>

    <div class="forget-password flex-end">
      <a href="/pages/login/findPassword/main">忘记密码</a>
    </div>

    <div class="link btn-group">
      <div class="btn" @click="login">登录</div>
      <a class="btn" href="/pages/login/register/main">注册</a>
    </div>
    <!-- <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>

    <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>
    <a href="/pages/counter/main" class="counter">去往Vuex示例页面111</a> -->
  </div>
</template>

<script>
import utils from '../../../utils'
export default {
  data() {
    return {
      phone: '',
      password: ''
    }
  },
  mounted() {
    
  },
  methods: {
    bindViewTap() {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo() {
      // 调用登录接口1
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: res => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },

    login() {
      if (utils.validate.isEmpty(this.phone, '手机号')) return
      if (utils.validate.notPhone(this.phone)) return
      if (utils.validate.isEmpty(this.password, '密码')) return
      if (utils.validate.notPassword(this.password)) return

      utils.ajax({
        action: 'login',
        method: 'POST',
        data: {
          phone: this.phone,
          password: this.password
        },
        success: res => {
          this.$store.commit('updateToken', res.data.token)
          wx.navigateTo({
            url: '/pages/home/index/main'
          })
        }
      })
    }
  },

  created() {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>
<style lang="less">
.page-login__index {
  .logo {
    margin: 100rpx 0;
  }

  .forget-password {
    margin: 20rpx 0;
  }
}
</style>

