<template>
    <div class="page-user__wallet">
        <div class="balance">
            <div class="content">
                <div class="num">{{balanceInfo.balance}}</div>
                <div class="text">
                    <div class="left">钱包余额</div>
                    <div class="right">查看明细</div>
                </div>
            </div>
            <div class="btn-group">
                <a href="/pages/user/recharge/main" class="btn btn__small">充值</a>
                <a :href="'/pages/user/returnMoney/main?balance=' + balanceInfo.balance" class="btn btn__small btn__white">提现</a>
            </div>
        </div>
    </div>
</template>

<script>
import utils from '@/utils'

export default {
  data() {
    return {
      balanceInfo: {}
    }
  },

  mounted() {
    },
  onShow(){
    this.getBalance()
  },

  methods: {
    getBalance() {
      utils.ajax({
        action: 'getBalance',
        data: {
          
        },
        success: res => {
          if (res.code == 0) {
            this.balanceInfo = res.data
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
.page-user__wallet {
  .balance {
    .content {
      padding: 0 20px;
      padding-top: 47px;
    }
    .num {
      font-size: 36px;
    }

    .text {
      .flex-between();
      font-size: 14px;
      margin-top: 5px;

      .left {
        color: @gray;
      }

      .right {
        color: @blue;
      }
    }

    .btn-group {
    //   padding: 0;
      margin-top: 36px;
    }
  }
}
</style>

