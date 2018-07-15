<template>
  <div class="page-user__userFood_checkPhone">
    <div class="tip">由于您当前注册的手机号 {{encryptPhone}} 与后台录入的手机号不一致,我们需要验证您是否为员工本人</div>

    <div class="form">
      <div class="input">
        <div class="name">手机号</div>
        <input type="number" class="content phone" v-model="encryptPhone" disabled placeholder="请输入手机号">
        <div v-if="count == 60" class="assist " @click="getCode">获取验证码</div>
        <div v-else class="assist ">已发送({{count}}s)</div>
      </div>
      <div class="input">
        <div class="name">验证码</div>
        <input type="number" class="content code" v-model="code" placeholder="请输入验证码">
      </div>
    </div>

    <div class="link btn-group">
      <div class="btn btn_big" @click="checkBindUser">验证并更新后台资料</div>
    </div>

    <div class="bottom">
      <div class="copyright">©copyright 广州市日日健餐饮管理有限公司</div>
    </div>
  </div>
</template>

<script>
import utils from '@/utils'

export default {
  data() {
    return {
      userInfo: {},

      code: '',

      isGetCode: false,
      count: 60,
      countInterval: ''
    }
  },
  computed: {
    encryptPhone() {
      if (this.userInfo.phone) {
        return this.userInfo.phone.slice(0, 3) + '****' + this.userInfo.phone.slice(-4)
      }
    }
  },

  mounted() {
    this.userInfo = JSON.parse(this.$root.$mp.query.user_info)
  },

  methods: {
    getCode() {
      // 重复点击拦截
      if (this.isGetCode) return

      if (utils.validate.isEmpty(this.userInfo.phone, '手机号')) return
      if (utils.validate.notPhone(this.userInfo.phone)) return

      this.isGetCode = true

      utils.ajax({
        action: 'getCode',
        data: {
          phone: this.userInfo.phone
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

    checkBindUser() {
      if (utils.validate.isEmpty(this.code, '验证码')) return
      utils.ajax({
        action: 'checkBindUser',
        method: 'POST',
        data: {
          phone: this.userInfo.phone,
          code: this.code
        },
        success: res => {
          if (res.code == 0) {
              utils.showSuccess('验证成功', () => {

                wx.redirectTo({ url: `/pages/user/useFood/hasBind/main?user_info=${this.$root.$mp.query.user_info}` })
              })
          }
        }
      })
    }
  },
  components: {}
}
</script>
<style lang="less">
@import '../../../../assets/css/mixin.less';
page {
  background: #fff;
}
.page-user__userFood_checkPhone {
  .full-page();
  .tip {
    padding: 20px;
    padding-top: 24px;
    line-height: 24px;
  }

  .btn-group {
    margin-top: 36px;
    .btn {
      font-size: 16px;
    }
  }

  .bottom {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    padding-bottom: 24px;

    font-size: 12px;
    color: #666666;
    line-height: 17px;

    text-align: center;
  }
}
</style>

