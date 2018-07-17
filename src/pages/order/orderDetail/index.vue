<template>
  <div class="page-user__order_detail" v-if="orderInfo" :class="'status_' + queryInfo.status">
    <div class="top-pay" v-if="queryInfo.status == '1'">
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

      <order-brief :orderInfo="orderInfo"></order-brief>

      <div class="cancel-order-btn" v-if="queryInfo.status=='1'" @click="isShowCancelPopbox = true">取消订单</div>

    </div>

    <div class="bottom-column" v-if=" queryInfo.status == '2'">
      <div class="left">
        共 {{orderInfo.total_num}} 份,已停餐 {{orderInfo.cancle_num}} 份
      </div>

      <div class="right" @click="toStopFoodPage">
        停餐
      </div>
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
import OrderBrief from '@/components/OrderBrief'
export default {
  data() {
    return {
      system: config.system,
      queryInfo: {},
      orderInfo: null,

      isMouted: false,

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

  onShow(e){
    this.isMouted && this.getUserOrderInfo()
  },

  mounted() {
    this.queryInfo = this.$root.$mp.query
    this.getUserOrderInfo()
    this.setTitle()

    this.isMouted = true
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
    },
    toStopFoodPage() {
      let foodList = []
      this.orderInfo.list.forEach(item => {
        let food_list = item.food_list.filter(sitem => (sitem.status == '2'))

        if(food_list.length) {
          foodList.push({
            ...item,
            food_list: food_list
          })
        }
      })
      wx.navigateTo({
        url: `/pages/order/stopFood/main?food_list=${JSON.stringify(foodList)}&user_id=${this.orderInfo.user_info.user_id}&role_id=${this.orderInfo.user_info.role_id}`
      })
    }
  },
  components: {
    UserList,
    OrderList,
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
  &.status_2 {
    padding-bottom: 60px;
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

  .c-order-brief {
    .panel {
      margin-bottom: 0;
    }
  }
  .cancel-order-btn {
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