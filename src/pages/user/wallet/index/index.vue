<template>
    <div class="page-user__wallet__index">
        <ul class="wallet-bar" v-if="system=='company'">
          <li :class="{active:activeIndex==0}" @click="activeIndex=0">余额</li>
          <li :class="{active:activeIndex==1}" @click="activeIndex=1">积分</li>
        </ul>
        <div class="balance" v-if="activeIndex==0">
            <div class="content">
                <div class="num">{{accountInfo.balance}}</div>
                <div class="text">
                    <div class="left">钱包余额</div>
                    <a hover-class="none" class="right" href="/pages/user/wallet/detail/main">查看明细</a>
                </div>
            </div>
            <div class="btn-group">
                <a hover-class="none" href="/pages/user/wallet/recharge/main" class="btn btn__small">充值</a>
                <a hover-class="none" :href="'/pages/user/wallet/returnMoney/main?balance=' + accountInfo.balance" class="btn btn__small btn__white">提现</a>
            </div>
        </div>
        <div class="credit" v-if="activeIndex==1">
            <ul class="content">
              <li>
                <div class="num">{{accountInfo.total_credit}}</div>
                <div class="name">积分总额</div>
              </li>
              <li>
                <div class="num">{{accountInfo.credit}}</div>
                <div class="name">本月可用积分</div>
              </li>
                
            </ul>
           <div class="tip">
             注: 企业发放的福利积分仅可用于订餐或者商城服务,不可进行充值或者提现操作
           </div>
        </div>
    </div>
</template>

<script>
import utils from '@/utils'
import config from '@/config'
export default {
  data() {
    return {
      system: config.system,
      activeIndex: 0,
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

.page-user__wallet__index {
  .wallet-bar {
    .flex-center();
    margin-bottom: 12px;
    background: #fff;
    font-size: 16px;
    

    li {
      width: 44px;
    line-height: 40px;
      border-top: 2px solid transparent;
      border-bottom: 2px solid transparent;
      text-align: center;
      margin: 0 42px;

      &.active {
        color: @theme;
        border-bottom: 2px solid @theme;
      }
    }
  }

  .balance {
    background: #fff;
    padding-bottom: 32px;
    .content {
      padding: 32px 20px 36px 20px;
      padding-top: 32px;
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
      // margin-top: 36px;
    }
  }

  .credit {
    padding: 32px 20px 24px 20px;
    background: #fff;

    .content {
      .flex-center();
      text-align: center;
      li{
        width: 50%;
      }

      .num {
        font-size: 36px;
        
      }

      .name {
        color: @gray;
        line-height: 20px;
        margin-top: 5px;
      }
    }

    .tip {
      font-size: 12px;
      line-height: 18px;
      margin-top: 52px;
    }
  }
}
</style>

