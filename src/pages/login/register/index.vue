<template>
  <div class="page-login__register">

    <div class="form">
      <div class="input">
        <input type="text" class="phone" v-model="phone" placeholder="请输入您的手机号">
        <div class="input-assist input-assist__code" @click="getCode">获取验证码</div>
      </div>
      <div class="input">
        <input type="text" class="code" v-model="code" placeholder="请输入您收到的验证码">
      </div>
      <div class="input">
        <input type="password" class="password" v-model="password" placeholder="请设置密码（6-16位英文数字组合）">
      </div>
    </div>

    <div class="link btn-group">
      <div class="btn btn_big" @click="register">注册并登录</div>
    </div>
  </div>
</template>

<script>
import utils from '../../../utils'
export default {
  data() {
    return {
      phone: '',
      code: '',
      password: ''
    }
  },
  methods: {
    getCode() {
      if (utils.validate.isEmpty(this.phone, '手机号')) return
      if (utils.validate.notPhone(this.phone)) return

      utils.ajax({
        action: 'getCode',
        data: {
          phone: this.phone
        },
        success: res => {}
      })
    },

    register() {
      if (utils.validate.isEmpty(this.phone, '手机号')) return
      if (utils.validate.notPhone(this.phone)) return
      if (utils.validate.isEmpty(this.code, '验证码')) return
      if (utils.validate.isEmpty(this.password, '密码')) return
      if (utils.validate.notPassword(this.password)) return

      utils.ajax({
        action: 'register',
        method: 'POST',
        data: {
          phone: this.phone,
          code: this.code,
          password: this.password
        },
        success: res => {
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
      })
    }
  }
}
</script>
<style lang="less">
.page-login__register {
}
</style>

