<template>
  <div class="page-login__register">

    <div class="form">
      <div class="input">
        <div class="name">手机号</div>
        <input type="number" class="content phone" v-model="phone" placeholder="请输入手机号">
        <div v-if="count == 60" class="assist " @click="getCode">获取验证码</div>
        <div v-else class="assist ">已发送({{count}}s)</div>
      </div>
      <div class="input">
        <div class="name">验证码</div>
        <input type="number" class="content code" v-model="code" placeholder="请输入验证码">
      </div>
      <div class="input">
        <div class="name">密码</div>
        <input type="password" class="content password" v-model="password" placeholder="请输入密码">
      </div>
      <div class="input">
        <div class="name">确认密码</div>
        <input type="password" class="content password2" v-model="password2" placeholder="请再次输入密码">
      </div>
    </div>

    <div class="link btn-group">
      <div class="btn btn_big" @click="register">注册</div>
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
        method: 'POST',
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
          if (res.code == 0) {
            utils.showSuccess('注册成功', wx.navigateBack)
          }
        }
      })
    }
  }
}
</script>
<style lang="less">
page {
  background: #fff;
}
.page-login__register {
  .link {
    margin-top: 72rpx;
  }
}
</style>

