<template>
  <div class="page-user__wallent__returnMoney">

    <div class="return-content">
      <div class="tip">
        请输入提现金额
      </div>

      <input type="digit" class="money" v-model="inputMoney">

      <div class="text">
        <div class="left">钱包余额:
          <strong>{{balance}}</strong>
        </div>
        <div class="right" @click="inputMoney=balance">全部提现</div>
      </div>
    </div>

    <div class="btn-group">
      <div class="btn btn__orange" @click="returnMoney">确定提现</div>
    </div>

    <div class="tips">提现款将返还到您的微信钱包</div>

    <company-copyright></company-copyright>
  </div>
</template>

<script>
import utils from '@/utils'
import CompanyCopyright from '@/components/CompanyCopyright'

export default {
  data() {
    return {
      balance: '',
      inputMoney: ''
    }
  },

  mounted() {
    this.inputMoney = ''
    
    this.balance = this.$root.$mp.query.balance
  },

  methods: {
    returnMoney() {
      if (utils.validate.isEmpty(this.inputMoney, '提现金额')) return

      if (this.inputMoney * 1 > this.balance * 1) {
        utils.showMsg('提现金额不能超过余额')
        return
      }
      utils.ajax({
        action: 'returnMoney',
        method: 'POST',
        data: {
          money: this.inputMoney
        },
        loading: true,
        success: res => {
          if (res.code == 0) {
            utils.showSuccess('提现成功', wx.navigateBack)
          }
        }
      })
    }
  },
  components: { CompanyCopyright }
}
</script>
<style lang="less">
@import '../../../../assets/css/mixin.less';
page {
  background: #fff;
}
.page-user__wallent__returnMoney {
  .full-page();
  .return-content {
    padding: 0 20px;
    padding-top: 24px;
  }

  .money {
    font-size: 24px;
    .lh(48px);
    color: #000;
    margin-top: 12px;
    border-bottom: 1rpx solid @borderColor;
  }
  .num {
    font-size: 36px;
  }

  .text {
    .flex-between();
    font-size: 14px;
    margin-top: 12px;

    .left {
      width: 50%;
      color: @gray;

      strong {
        display: inline-block;
        color: #151515;
      }
    }

    .right {
      color: @theme;
    }
  }

  .btn-group {
    margin-top: 36px;
    .btn {
      font-size: 16px;
     
    }
  }

  .tips {
    margin-top: 12px;
    font-size: 12px;
    color: #999999;

    text-align: center;
  }
}
</style>

