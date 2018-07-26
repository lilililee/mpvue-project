<template>
  <div class="page-user__order_detail" v-if="orderInfo" :class="[{'x-margin': isIphoneX},'status_' + queryInfo.status]">
    <div class="top-pay" v-if="queryInfo.status == '1'">
      <div class="text">
        <span>需支付</span>
        <strong>{{totalMoney}}</strong>
      </div>

      <div class="pay-btn" @click="toPay">去支付</div>
    </div>
    <div class="order-content">
      <!-- 企业版支付页才能修改 -->
      <div class="user-list-container" v-if="queryInfo.status == '1'">
        <user-list :userData="nowUser" @assistClick="changeAddress">
          <div class="c-user-list__assets">修改地址</div>
        </user-list>
      </div>
      <div class="user-list-container" v-else>
        <user-list :userData="nowUser">

        </user-list>
      </div>

      <div class="goods-panel-container">
        <goods-panel :goodsList="orderInfo.list" :useChangeNum="queryInfo.status == '1'" @changeNum="changeOrderGoods"></goods-panel>
      </div>

      <order-brief :orderInfo="orderInfo"></order-brief>

      <div class="cancel-order-btn" v-if="queryInfo.status=='1'" @click="isShowCancelPopbox = true">取消订单</div>
      <div class="call-service-btn" v-if="queryInfo.status=='2'" @click="callService">售后电话 {{orderInfo.service_phone}}</div>

    </div>

    <popbox v-model="isShowCancelPopbox" :popboxData="popboxData" @comfirm="comfirmCancelOrder"></popbox>
  </div>
</template>

<script>
import utils from '@/utils'
import UserList from '@/components//UserList'
import GoodsPanel from '@/components/GoodsPanel'
import Popbox from '@/components/Popbox'
import OrderBrief from '@/components/OrderBrief'
export default {
  data() {
    return {
      isIphoneX: utils.isIphoneX,
      system: utils._config.system,
      queryInfo: {},
      orderInfo: null,

      isShowCancelPopbox: false,

      popboxData: {
        title: '取消订单',
        content: '确认取消当前订单？'
      }
    }
  },
  computed: {
    nowUser() {
      return this.$store.state.nowUser
    },

    totalMoney() {
      if (!this.orderInfo) return '0.00'
      return this.orderInfo.list
        .reduce((prev, item) => {
          return prev + (item.price * 1 + item.carriage * 1) * item.num
        }, 0)
        .toFixed(2)
    }
  },
  watch: {
    nowUser(val) {
      if (this.orderInfo) {
        this.orderInfo.expect_time = this.nowUser.expect_time
      }
    }
  },

  mounted() {
    this.queryInfo = this.$root.$mp.query
    this.getOrderInfo()
    this.setTitle()
  },

  methods: {
    setTitle() {
      if (this.queryInfo.status == '1') {
        wx.setNavigationBarTitle({
          title: '订单待支付'
        })
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#FF7C00'
        })
      } else {
        wx.setNavigationBarTitle({
          title: '订单已支付'
        })
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: '#ffffff'
        })
      }
    },
    getOrderInfo() {
      utils.ajax({
        action: 'getOrderInfo',
        data: {
          order_id: this.queryInfo.order_id
        },
        loading: true,
        success: res => {
          if (res.code == 0) {
            this.orderInfo = res.data

            this.$store.commit('updateState', {
              field: 'nowUser',
              value: {
                ...res.data.user_info,
                expect_time: res.data.expect_time
              }
            })
          }
        }
      })
    },
    changeOrderGoods({ item, num }) {
      utils.ajax({
        action: 'changeOrderGoods',
        method: 'POST',
        data: {
          order_id: this.queryInfo.order_id,
          goods_id: item.goods_id,
          num
        },
        success: res => {
          if (res.code == 0) {
          }
        }
      })
    },

    toPay() {
      wx.reLaunch({
        url: `/pages/pay/index/main?order_id_list=${JSON.stringify([this.orderInfo.order_id])}&total_money=${this.totalMoney}`
      })
    },

    changeAddress() {
      wx.navigateTo({
        url: `/pages/shopHome/changeAddress/main?order_id=${this.orderInfo.order_id}`
      })
    },

    comfirmCancelOrder() {
      this.isShowCancelPopbox = false
      utils.ajax({
        action: 'cancelOrder',
        method: 'POST',
        data: {
          order_id: this.orderInfo.order_id
        },
        success: res => {
          if (res.code == 0) {
            utils.showSuccess('取消成功', () => {
              wx.reLaunch({
                url: `/pages/shopMain/main?page=2`
              })
            })
          }
        }
      })
    },
    callService() {
      wx.makePhoneCall({
        phoneNumber: this.orderInfo.service_phone
      })
    }
  },
  components: {
    UserList,
    GoodsPanel,
    Popbox,
    OrderBrief
  }
}
</script>
<style lang="less">
@import '../../../assets/css/mixin.less';
.page-user__order_detail {
  &.status_1 {
    padding-top: 80px;
  }
  .top-pay {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    width: 100%;
    height: 80px;
    .flex-between();
    padding: 0 16px;
    background: @orange;
    .text {
      .flex-center();
      color: #fff;
      strong {
        font-size: 24px;
        margin-left: 12px;
      }
    }
    .pay-btn {
      width: 96px;
      .lh(36px);
      text-align: center;
      color: @orange;
      background: #fff;
      border-radius: 4px;
    }
  }
  .order-content {
    padding: 12px 0;
  }
  .user-list-container {
    padding: 0 12px;
    margin-bottom: 12px;
    .c-user-list__assets {
      color: @theme;
    }
  }

  .goods-panel-container {
    padding: 0 12px;
  }

  .c-order-brief {
    .panel {
      margin-bottom: 0;
    }
  }
  .cancel-order-btn,
  .call-service-btn {
    margin: 12px 12px 0;
    .lh(44px);
    text-align: center;
    background: #fff;
  }

  .bottom-column {
    .right {
      background: #ff5050;
      color: #fff;
      font-size: 16px;
    }
  }
}
</style>