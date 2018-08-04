<template>
  <div class="page-user__wallet__index">
    <ul class="wallet-bar" v-if="system=='company' || system=='shop'">
      <li :class="{active:activeIndex==0}" @click="activeIndex=0">余额</li>
      <li :class="{active:activeIndex==1}" @click="activeIndex=1">积分</li>
    </ul>
    <div class="balance" v-if="activeIndex==0">
      <div class="content">
        <div class="num">{{accountInfo.balance}}</div>
        <div class="text">
          <div class="left">钱包余额</div>
          <a hover-class="none" class="right" href="/pages/user/wallet/detail/main">钱包明细</a>
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
          <div class="title">订餐积分</div>
          <div class="info">
            <div class="num">{{accountInfo.credit_detail.booking}}</div>
            <div class="desc">订餐积分仅用于点餐,订餐积分将在一定时间后后自动升级为通用积分</div>
          </div>
        </li>
        <li>
          <div class="title">通用积分</div>
          <div class="info">
            <div class="num">{{accountInfo.credit_detail.common}}</div>
            <div class="desc">通用积分可在订餐和商城使用</div>
          </div>
        </li>
        <li>
          <div class="title">待发放积分</div>
          <div class="info">
            <div class="num">{{accountInfo.credit_detail.waiting}}</div>
            <div class="desc">积分已分配，等待发放到您的积分账户中</div>
          </div>
        </li>

      </ul>

      <div class="to-credit-detail">
        <a href="/pages/user/wallet/creditDetail/main" hover-class="none">
          积分明细
        </a>
      </div>

      <div class="tips">积分发放及使用规则最终解释权归日日健所有</div>

    </div>

    <company-copyright v-if="activeIndex==0"></company-copyright>
  </div>

</template>

<script>
import utils from '@/utils'
import CompanyCopyright from '@/components/CompanyCopyright'
export default {
  data() {
    return {
      system: utils._config.system,
      activeIndex: 0,
      accountInfo: {}
    }
  },

  mounted() {},
  onShow() {
    this.getAccountInfo()
  },

  methods: {
    getAccountInfo() {
      utils.ajax({
        action: 'getAccountInfo',
        data: {},
        success: res => {
          if (res.code == 0) {
            this.accountInfo = res.data
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
.page-user__wallet__index {
  .full-page();
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
    padding: 0 16px;
    li {
      margin-bottom: 16px;
      background: #fff;
      border-radius: 4px;
      overflow: hidden;

      &:nth-child(1) .title {
        background: @theme;
      }
      &:nth-child(2) .title {
        background: @orange;
      }
      &:nth-child(3) .title {
        background: @gray;
      }
    }

    .title {
      padding: 0 16px;
      .lh(32px);
      color: #fff;
    }

    .info {
      .flex-start();
      height: 88px;
      padding: 0 16px;
      .num {
        .lh(48px);
        font-size: 32px;
        width: 80px;
        .border-right();
      }

      .desc {
        width: 223px;
        margin-left: 14px;
        font-size: 12px;
        color: #999999;
        line-height: 20px;
      }
    }

    .to-credit-detail {
      color: @theme;
      line-height: 20px;
      text-align: center;
    }

    .tips {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
      padding-bottom: 24px;
      
      font-size: 12px;
      line-height: 17px;
      // margin-top: 70px;
      text-align: center;
      color: #666666;
    }
  }
}
</style>

