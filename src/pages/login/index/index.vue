<template>
    <div class="page-login__index">
        <div class="logo">
            logo
        </div>

        <div class="form">
            <div class="input">
                <div class="name">手机号</div>
                <input type="text" class="content phone" v-model="phone" placeholder="请输入手机号">
            </div>
            <div class="input">
                <div class="name">密码</div>
                <input type="password" class="content password" v-model="password" placeholder="请输入密码">
                <div class="assist">
                    <a href="/pages/login/findPassword/main">忘记密码</a>
                </div>
            </div>
        </div>

        <div class="link btn-group">
            <div class="btn" @click="login">登录</div>
            <!-- <a class="btn" href="/pages/login/register/main">注册</a> -->
        </div>

        <div class="link btn-group">
            <a class="btn" href="/pages/login/register/main">注册</a>
        </div>

        <div class="link btn-group">
            <a class="btn" href="/pages/login/protocol/main">协议</a>
        </div>

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
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  },
  methods: {
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
            url: '/pages/main/main'
          })
        }
      })
    }
  }
}
</script>
<style lang="less">
.page-login__index {
  height: 100vh;
  background: #fff;
  .logo {
    padding: 100rpx 0;
  }

  .link {
    margin-top: 72rpx;
  }

  .forget-password {
    margin: 20rpx 0;
  }
}
</style>

