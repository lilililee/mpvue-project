<template>
  <div class="page-pay__index">
    <div class="total-price">
      <div class="price">{{queryInfo.total_money}}</div>
      <div class="text">需支付</div>
    </div>
    <ul class="pay-detail">
      <li v-if="useCredit">
        <div class="title">
          <div class="name">积分抵扣</div>
          <div class="num">本月可用积分
            <span>{{accountInfo.credit}}</span>
          </div>
        </div>
        <input type="number" v-model="payCredit" class="input" placeholder="请输入需要使用的积分">
      </li>
      <li>
        <div class="title">
          <div class="name">钱包抵扣</div>
          <div class="num"> 余额
            <span>{{accountInfo.balance}}</span>
          </div>
        </div>
        <input type="digit" v-model="payBalance" class="input" placeholder="请输入需要使用的余额">
      </li>

    </ul>

    <div class="btn-group">
      <div class="btn btn__orange">
        <span v-if="payWx > 0">微信支付 {{payWx}}元</span>
        <span v-else>确认支付</span>
      </div>
    </div>
    <div class="btn-group">
      <div class="btn btn__white">暂不支付</div>
    </div>
  </div>
</template>

<script>
import utils from '@/utils'
import config from '@/config'

export default {
  data() {
    return {
      useCredit: config.system !== 'school',
      queryInfo: {},
      nowUser: {},
      accountInfo: {},
      payCredit: '',
      payBalance: ''
    }
  },
  watch: {
    payCredit(val) {
      let tempCredit = parseFloat(val) || 0
      let tempBalance = parseFloat(this.payBalance) || 0
      let result = val //== 0 && val.indexOf('.') == -1 ? '0' : String(parseFloat(val))
      if (tempCredit > parseFloat(this.accountInfo.credit)) {
        this.payCredit = this.accountInfo.credit
        return
      }

      let tempTotalMoney = parseFloat(this.queryInfo.total_money)

      if (tempCredit + tempBalance > tempTotalMoney) {
        result = Math.ceil(tempTotalMoney - tempBalance)

        if (tempTotalMoney - result <= 0) {
          this.payBalance = '0'
        }
      }  

      if (tempBalance + result > tempTotalMoney){
        this.payBalance = String(tempTotalMoney - result)
      }
      this.payCredit = result
    },
    payBalance(val) {
      let tempCredit = parseFloat(this.payCredit) || 0
      let tempBalance = parseFloat(val) || 0
      let result = val //== 0 && val.indexOf('.') == -1 ? '0' : String(parseFloat(val))
      if (tempBalance > parseFloat(this.accountInfo.balance)) {
        this.payBalance = this.accountInfo.balance
        return
      }

      let tempTotalMoney = parseFloat(this.queryInfo.total_money)

      if (tempCredit + tempBalance > tempTotalMoney) {
        result = (tempTotalMoney - tempCredit).toFixed(2)
      }

      let miniNum = val.split('.')[1]

      if (typeof miniNum != 'undefined' && miniNum.length > 2) {
        result = tempBalance.toFixed(2)
      }

      this.payBalance = parseFloat(result) < 0 ? '0' : result
    }
  },
  computed: {
    payWx() {
      let payWxValue = this.queryInfo.total_money - this.payCredit - this.payBalance
      return payWxValue > 0 ? payWxValue.toFixed(2) : '0'
    }
  },
  mounted() {
    this.queryInfo = this.$root.$mp.query
    this.queryInfo.total_money = parseFloat(this.queryInfo.total_money).toFixed(2)
    this.nowUser = JSON.parse(this.queryInfo.user)
    this.getAccountInfo()
  },

  methods: {
    getAccountInfo() {
      utils.ajax({
        action: 'getAccountInfo',
        data: {
          user_id: this.nowUser.user_id,
          role_id: this.nowUser.role_id
        },
        loading: true,
        success: res => {
          if (res.code == 0) {
            this.accountInfo = res.data
          }
        }
      })
    },
    pay() {
      utils.ajax({
        action: 'pay',
        method: 'POST',
        data: {
          user_id: this.nowUser.user_id,
          role_id: this.nowUser.role_id,
          order_id_list: this.$root.$mp.query.order_id_list,
          total_money: this.$root.$mp.query.total_money
        },
        success: res => {
          if (res.code == 0) {
          }
        }
      })
    },
    recharge() {
      utils.ajax({
        action: 'recharge',
        method: 'POST',
        data: {
          money: this.payWx
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

.page-pay__index {
  .full-page();

  .total-price {
    background: @orange;
    height: 120px;

    text-align: center;
    padding-top: 19px;
    color: #fff;

    .price {
      font-size: 36px;
    }

    .text {
      font-size: 14px;
      margin-top: 8px;
    }
  }

  .pay-detail {
    background: #fff;
    padding: 16px 20px 0;
    box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.05);

    li {
      margin-bottom: 24px;
      &:first-child {
        .input {
          border-bottom: 1rpx solid @borderColor;
        }
      }
    }

    .title {
      font-size: 14px;
      .flex-between();
      line-height: 20px;

      .num {
        color: @gray;
        span {
          color: #151515;
        }
      }
    }

    .input {
      .lh(57px);
      font-size: 18px;
    }
  }
  .btn-group {
    margin-bottom: 16px;
    .btn {
      font-size: 16px;
    }
  }
}
</style>

