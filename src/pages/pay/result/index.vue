<template>
  <div class="page-pay__result" v-if="queryInfo">
    <div class="result success" v-if="queryInfo.type == 'success'">
      <img class="img" src="../../../assets/img/pay_success.png" alt="">
      <div class="total-money">{{queryInfo.total_money}}</div>
      <div class="tips">支付成功</div>

      <div class="btn-group">
        <div class="btn btn__small" @click="toOrderPage">查看订单</div>
        <div class="btn btn__small btn__white" @click="toHomePage">返回首页</div>
      </div>
    </div>

    <div class="result fail" v-else>
      <img class="img" src="../../../assets/img/pay_fail.png" alt="">
      <div class="total-money">{{queryInfo.total_money}}</div>
      <div class="tips">支付失败,请重新支付</div>

      <div class="btn-group">
        <div class="btn btn__small" @click="toPayPage">重新支付</div>
        <div class="btn btn__small btn__white" @click="toHomePage">返回首页</div>
      </div>
    </div>

    <div class="copyright">©copyright 广州市日日健餐饮管理有限公司</div>
  </div>
</template>

<script>
import utils from '@/utils'
import config from '@/config'

export default {
  data() {
    return {
      queryInfo: ''
    }
  },

  mounted() {
    this.queryInfo = this.$root.$mp.query
  },

  methods: {
    toOrderPage() {
      wx.reLaunch({
        url: '/pages/main/main'
      })
    },
    toHomePage() {
      wx.reLaunch({
        url: '/pages/main/main'
      })
    },
    toPayPage() {
      wx.redirectTo({
        url: `/pages/pay/index/main?order_id_list=${this.this.queryInfo.order_id_list}&total_money=${this.this.queryInfo.total_money}`
      })
    },

    pay() {
      utils.ajax({
        action: 'pay',
        method: 'POST',
        data: {
          order_id_list: this.this.queryInfo.order_id_list,
          total_money: this.this.queryInfo.total_money,
          pay_balance: this.payBalance || '0',
          pay_credit: this.payCredit || '0',
          pay_wx: this.payWx
        },
        success: res => {
          if (res.code == 0) {
          }
        }
      })
    }
  },
  components: {}
}
</script>
<style lang="less">
@import '../../../assets/css/mixin.less';
page {
  background: #fff;
}
.page-pay__result {
  .full-page();
  text-align: center;

  .img {
    .wh(84px);
    display: block;
    margin: 36px auto 24px auto;
  }

  .total-money {
    font-size: 36px;
    // font-weight: bold;
  }

  .tips {
    font-size: 14px;
    color: #4a4a4a;
    margin-top: 8px;
    margin-bottom: 36px;
  }

  .copyright {
    position: absolute;
    left: 0;
    bottom: 24px;
    width: 100%;
    font-size: 12px;
    color: #666666;
  }
}
</style>

