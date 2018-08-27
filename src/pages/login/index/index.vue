<template>
  <div class="page-login__index">
    <div class="top">
      <div class="hello">您好，</div>
      <div class="welcome">
        <span>欢迎使用日日健订餐服务 ,</span>
        <a hover-class="none" href="/pages/login/register/main"> 立即注册</a>
      </div>
    </div>

    <div class="form">
      <div class="input">
        <div class="name">手机号</div>
        <input type="number" class="content phone" v-model="phone" placeholder="请输入手机号">
      </div>
      <div class="input">
        <div class="name">密码</div>
        <input type="password" class="content password" v-model="password" placeholder="请输入密码">
        <div class="assist">
          <a hover-class="none" href="/pages/login/findPassword/main">忘记密码?</a>
        </div>
      </div>
    </div>

    <div class="link btn-group">
      <div class="btn" @click="login">登录</div>
    </div>

    <div class="protocol">
      <span>登录/注册代表您已同意</span>
      <a hover-class="none" href="/pages/login/protocol/main">《日日健用户协议》</a>
    </div>

    <!-- <div class="company">
      <img src="../../../assets/img/logo.png" class="logo">
      <div class="copyright">©copyright 广州市日日健餐饮管理有限公司</div>
    </div> -->
    <company-copyright :useImg="true"></company-copyright>
  </div>
</template>

<script>
import utils from '../../../utils'
import CompanyCopyright from '@/components/CompanyCopyright'
export default {
  data() {
    return {
      phone: '',
      password: ''
    }
  },

  mounted() {
    this.initData()

  },
  methods: {
    initData(){
      this.phone = ''
      this.password = ''
    },
    login() {
      if (utils.validate.isEmpty(this.phone, '手机号')) return
      if (utils.validate.notPhone(this.phone)) return
      if (utils.validate.isEmpty(this.password, '密码')) return
      // if (utils.validate.notPassword(this.password)) return

      wx.login({
        success: res => {
          if (res.code) {
            utils.ajax({
              action: 'login',
              method: 'POST',
              loading: true,
              loadingText: '登陆中',
              data: {
                phone: this.phone,
                password: this.password,
                code: res.code
              },
              success: res2 => {
                if (res2.code == 0) {
                  wx.setStorageSync('token', res2.data.token)
                  wx.reLaunch({
                    url: utils._config.system == 'shop' ? '/pages/shopMain/main' : '/pages/main/main'
                  })
                }
              }
            })
          } else {
            utils.showMsg('登录失败！' + res.errMsg)
          }
        }
      })
    }
  },
  components: { CompanyCopyright }
}
</script>
<style lang="less">
@import '../../../assets/css/mixin.less';
page {
  background: #fff;
}
.page-login__index {
  .full-page();

  .top {
    height: 156px;
    background: url(../../../assets/img/login_bg.png);
    background-size: cover;
    color: #fff;
    padding-left: 20px;
    margin-bottom: 6px;

    .hello {
      font-size: 36px;
      padding-top: 10px;
      line-height: 50px;
    }

    .welcome {
      font-size: 16px;
      line-height: 22px;
      margin-top: 8px;

      span {
        opacity: 0.9;
      }

      a {
        font-weight: bold;
        text-decoration: underline;
      }
    }
  }

  .link {
    margin-top: 72rpx;
  }

  .forget-password {
    margin: 20rpx 0;
  }

  .protocol {
    font-size: 12px;
    line-height: 17px;
    margin-top: 16px;
    text-align: center;
    color: @gray;

    a {
      color: #151515;
    }
  }

  // .company {
  //   position: absolute;
  //   width: 100%;
  //   left: 0;
  //   bottom: 0;
  //   padding-bottom: 24px;

  //   font-size: 12px;
  //   color: #666666;
  //   line-height: 17px;

  //   text-align: center;
  //   .logo {
  //     display: inline-block;
  //     .wh(60px);
  //     margin-bottom: 6px;
  //   }
  // }
}
</style>

