<template>
  <div class="page-login__find_password">

    <div class="form">
      <div class="input">
        <input type="text" class="phone" v-model="phone" placeholder="请输入您的手机号">
        <div v-if="count == 60" class="input-assist input-assist__code" @click="getCode">获取验证码</div>
        <div v-else class="input-assist input-assist__code">已发送({{count}}s)</div>
      </div>
      <div class="input">
        <input type="text" class="code" v-model="code" placeholder="请输入您收到的验证码">
      </div>
      <div class="input">
        <input type="password" class="password" v-model="password" placeholder="请设置密码（6-16位英文数字组合）">
      </div>
      <div class="input">
        <input type="password" class="password2" v-model="password2" placeholder="请再次设置密码（6-16位英文数字组合）">
      </div>
    </div>

    <div class="link btn-group">
      <div class="btn btn_big" @click="register">确认</div>
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
      password: '',
      password2: '',

      isGetCode: false,
      count: 60,
      countInterval: ''
    }
  },
  methods: {
    getCode() {
      // 重复点击拦截
      if (this.isGetCode) return

      if (utils.validate.isEmpty(this.phone, '手机号')) return
      if (utils.validate.notPhone(this.phone)) return

      this.isGetCode = true

      utils.ajax({
        action: 'getCode',
        data: {
          phone: this.phone
        },
        success: res => {
          if (res.code == 0) {
            // 开始倒计时
            this.count--
            this.countInterval = setInterval(() => {
              if (this.count == 0) {
                clearInterval(this.countInterval)
                this.count = 60
                return
              }
              this.count--
            }, 1000)
          }
          this.isGetCode = false
        }
      })
    },

    register() {
      if (utils.validate.isEmpty(this.phone, '手机号')) return
      if (utils.validate.notPhone(this.phone)) return
      if (utils.validate.isEmpty(this.code, '验证码')) return
      if (utils.validate.isEmpty(this.password, '密码')) return
      if (utils.validate.notPassword(this.password)) return
      if (utils.validate.isEmpty(this.password2, '密码')) return
      if (utils.validate.notPassword(this.password2)) return
      if (this.password != this.password2) {
        utils.showMsg('两次输入密码不匹配')
        return
      }

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
.page-login__find_password {
}
</style>


