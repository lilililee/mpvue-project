<template>
  <div class="page-user__wallet__recharge">
    <div class="recharge-content">

      <div class="tip">
        选择充值面额或者输入其他金额:
      </div>

      <ul class="money-options">
        <li v-for="(item, index) in options" :key="index" @click="chooseMoney(item, index)" :class="{active: nowChooseMoneyIndex==index}">{{item}}</li>
      </ul>

      <div class="input-money">
        <input v-model="inputMoney" type="digit" placeholder="其他金额">
      </div>
    </div>

    <div class="btn-group">
      <div class="btn btn__orange" @click="recharge">确定充值</div>
    </div>

    <company-copyright></company-copyright>
  </div>
</template>

<script>
import utils from '@/utils'
import CompanyCopyright from '@/components/CompanyCopyright'

export default {
  data() {
    return {
      options: ['20.00', '50.00', '100.00', '200.00'],
      nowChooseMoneyIndex: 0,
      inputMoney: ''
    }
  },

  watch: {
    inputMoney(val) {
      if (val !== '') {
        this.nowChooseMoneyIndex = -1
      }
    }
  },

  mounted() {
    // 去除小程序已销毁页面input数据缓存
    this.nowChooseMoneyIndex = 0
    this.inputMoney = ''
  },

  methods: {
    chooseMoney(item, index) {
      this.nowChooseMoneyIndex = index
      this.inputMoney = ''
    },
    recharge() {
      let money = this.nowChooseMoneyIndex != -1 ? this.options[this.nowChooseMoneyIndex] : this.inputMoney

      if (money == '' || parseFloat(money) == 0) {
        utils.showMsg('请输入充值金额')
        return
      }
      utils.ajax({
        action: 'recharge',
        method: 'POST',
        data: {
          money
        },
        success: res => {
          if (res.code == 0) {
            wx.requestPayment({
              ...res.data,
              success: resWx => {
                utils.log('success', resWx)
                utils.showSuccess('充值成功', wx.navigateBack)
              },
              fail: resWx => {
                utils.log('fail', resWx)
              }
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
@import '../../../../assets/css/mixin.less';

page {
  background: #fff;
}
.page-user__wallet__recharge {
  .full-page();
  padding-top: 24px;

  .recharge-content {
    padding: 0 20px;
  }
  .tip {
  }

  .money-options {
    margin-top: 16px;
    .flex-between();

    li {
      width: 72px;
      .lh(40px);
      font-size: 16px;
      border: 1rpx dashed @borderColor;
      text-align: center;

      &.active {
        background: @orange;
        border: 1rpx solid @orange;
        color: #fff;
      }
    }
  }

  .input-money {
    margin-top: 16px;

    text-align: center;
    border: 1rpx dashed @borderColor;
    .lh(40px);
    .flex-center();
    .input {
    }
  }

  .btn-group {
    margin-top: 36px;

    .btn {
      font-size: 16px;
    }
  }
}
</style>

