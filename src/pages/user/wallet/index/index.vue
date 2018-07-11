<template>
    <div class="page-user__wallet__index">
        <div class="balance">
            <div class="content">
                <div class="num">{{accountInfo.balance}}</div>
                <div class="text">
                    <div class="left">钱包余额</div>
                    <a class="right" href="/pages/user/wallet/detail/main">查看明细</a>
                </div>
            </div>
            <div class="btn-group">
                <a href="/pages/user/wallet/recharge/main" class="btn btn__small">充值</a>
                <a :href="'/pages/user/wallet/returnMoney/main?balance=' + accountInfo.balance" class="btn btn__small btn__white">提现</a>
            </div>
        </div>
    </div>
</template>

<script>
import utils from '@/utils'

export default {
  data() {
    return {
      accountInfo: {}
    }
  },

  mounted() {
    },
  onShow(){
    this.getAccountInfo()
  },

  methods: {
    getAccountInfo() {
      utils.ajax({
        action: 'getAccountInfo',
        data: {
          
        },
        success: res => {
          if (res.code == 0) {
            this.accountInfo = res.data
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
.page-user__wallet__index {
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
        color: @theme;
      }
    }

    .btn-group {
    //   padding: 0;
      margin-top: 36px;
    }
  }
}
</style>

