<template>
  <div class="page-user__order_detail" v-if="orderInfo" :class="'status_' + queryInfo.status">
    <div class="top-pay">
      <div class="text">
        <span>需支付</span>
        <strong>{{orderInfo.total_price}}</strong>
      </div>

      <div class="pay-btn" @click="toPay">去支付</div>
    </div>

    <div class="order-content">
      <!-- 企业版支付页才能修改 -->
      <div class="user-list-container" v-if="system=='company' && queryInfo.status == '1'">
        <user-list :userData="companyNowUser" @assistClick="changeAddress">
          <div class="c-user-list__assets">修改地址</div>
        </user-list>
      </div>
      <div class="user-list-container" v-else>
        <user-list :userData="orderInfo.user_info">
        </user-list>
      </div>

      <order-list :foodList="orderInfo.list" :type="queryInfo.status!='1'? 'status':''"></order-list>

      <div class="cancel-order-btn" v-if="queryInfo.status=='1'" @click="isShowCancelPopbox = true">取消订单</div>

    </div>
    <popbox v-model="isShowCancelPopbox" :popboxData="popboxData" @comfirm="comfirmCancelOrder"></popbox>
  </div>
</template>

<script>
import utils from '@/utils'
import config from '@/config'
import UserList from '@/components//UserList'
import OrderList from '@/components/OrderList'
import Popbox from '@/components/Popbox'
export default {
  data() {
    return {
      system: config.system,
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
    companyNowUser() {
      return this.$store.state.companyNowUser
    }
  },

  mounted() {
    this.queryInfo = this.$root.$mp.query
    this.getUserOrderInfo()
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
      } else if (this.queryInfo.status == '2') {
        wx.setNavigationBarTitle({
          title: '订单已支付'
        })
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: '#ffffff'
        })
      } else {
        wx.setNavigationBarTitle({
          title: '订单已完成'
        })
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: '#ffffff'
        })
      }
    },
    getUserOrderInfo() {
      utils.ajax({
        action: 'getUserOrderInfo',
        data: {
          user_id: this.queryInfo.user_id,
          role_id: this.queryInfo.role_id,
          order_id: this.queryInfo.order_id
        },
        loading: true,
        success: res => {
          if (res.code == 0) {
            this.orderInfo = res.data

            this.system == 'company' &&
              this.$store.commit('updateCompanyNowUser', {
                ...this.orderInfo.user_info
              })
          }
        }
      })
    },
    toPay() {
      wx.reLaunch({
        url: `/pages/pay/index/main?order_id_list=${JSON.stringify([this.orderInfo.order_id])}&total_money=${this.orderInfo.total_price}`
      })
    },

    changeAddress() {
      wx.navigateTo({
        url: `/pages/home/changeAddress/main?type=order&order_id=${this.orderInfo.order_id}`
      })
    },

    comfirmCancelOrder() {
      this.isShowCancelPopbox = false
      utils.ajax({
        action: 'cancelOrder',
        method: 'POST',
        data: {
          user_id: this.orderInfo.user_info.user_id,
          role_id: this.orderInfo.user_info.role_id,
          order_id: this.orderInfo.order_id
        },
        success: res => {
          if (res.code == 0) {
            utils.showSuccess('取消成功', () => {
              wx.reLaunch({
                url: `/pages/main/main?page=2`
              })
            })
          }
        }
      })
    }
  },
  components: {
    UserList,
    OrderList,
    Popbox
  }
}
</script>
<style lang="less">
@import '../../../assets/css/mixin.less';

.page-user__order_detail {
  .top-pay {
    visibility: hidden;
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

  &.status_1 {
    padding-top: 80px;
    .top-pay {
      visibility: visible;
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

  .cancel-order-btn {
    margin: 0 12px;
    .lh(44px);
    text-align: center;
    background: #fff;
  }
}
</style>

