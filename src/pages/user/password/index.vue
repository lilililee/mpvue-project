<template>
  <div class="page-user_password">

    <div class="form">
      <div class="input">
        <div class="name">旧密码</div>
        <input type="password" class="content password" v-model="password" placeholder="请输入旧密码">
      </div>
      <div class="input">
        <div class="name">新密码</div>
        <input type="password" class="content new-password" v-model="newPassword" placeholder="请输入新密码">
      </div>
      <div class="input">
        <div class="name">确认密码</div>
        <input type="password" class="content new-password2" v-model="newPassword2" placeholder="请再次输入新密码">
      </div>
    </div>

    <div class="link btn-group">
      <div class="btn btn_big" :class="{disabled:!(password&&newPassword&&newPassword2)}" @click="register">确认</div>
    </div>

    <company-copyright :useImg="true"></company-copyright>
  </div>
</template>

<script>
import utils from '../../../utils'
import CompanyCopyright from '@/components/CompanyCopyright'
export default {
  data() {
    return {
      password: '',
      newPassword: '',
      newPassword2: ''
    }
  },
  methods: {
    register() {
      if (utils.validate.isEmpty(this.password, '旧密码')) return
      if (utils.validate.notPassword(this.password)) return
      if (utils.validate.isEmpty(this.newPassword, '新密码')) return
      if (utils.validate.notPassword(this.newPassword)) return
      if (utils.validate.isEmpty(this.newPassword2, '$请再次输入新密码')) return
      if (utils.validate.notPassword(this.newPassword2)) return
      if (this.newPassword != this.newPassword2) {
        utils.showMsg('两次输入密码不匹配')
        return
      }

      utils.ajax({
        action: 'modifyPassword',
        method: 'POST',
        data: {
          password: this.password,
          new_password: this.newPassword
        },
        success: res => {
          // 清除登录信息
          if (res.code == 0) {
            wx.setStorageSync('token', '')

            utils.showSuccess('修改成功', () => {
              wx.reLaunch({
                url: '/pages/login/index/main'
              })
            })
          }
        }
      })
    }
  },
  components: { CompanyCopyright }
}
</script>
<style lang="less">
@import '~@/assets/css/mixin.less';
page {
  background: #fff;
}
.page-user_password {
  .full-page();
  .link {
    margin-top: 36px;
  }
}
</style>


