<template>
  <div class="page-home__comfirm_order" :class="{'x-padding': isIphoneX}">
    <scroll-view scroll-y>
      <div class="user-list-container">
        <user-list :userData="nowUser" @assistClick="changeAddress">
          <div class="c-user-list__assets">修改地址</div>
        </user-list>
      </div>

      <div class="goods-panel-container">
        <goods-panel :goodsList="goodsList"></goods-panel>
      </div>
    </scroll-view>

    <div class="bottom-column" :class="{'x-border': isIphoneX}">
      <div class="left">
        <div>
          <div class="total-price">¥{{totalMoney}}</div>
          <div class="total-count"> 共{{totalDay}}天{{totalNum}}份</div>
        </div>
      </div>

      <div class="right" @click="submitOrder">
        <span>去支付</span>
      </div>

    </div>
  </div>
</template>

<script>
import utils from '@/utils'
import UserList from '@/components/UserList'
import GoodsPanel from '@/components/GoodsPanel'

export default {
  data() {
    return {
      isIphoneX: utils.isIphoneX,

      preOrderInfo: {},
      goodsList: []
    }
  },
  computed: {
    nowUser() {
      return this.$store.state.nowUser
    },

    totalMoney() {
      // if (!this.foodList.length) return '0.00'
      // return this.foodList
      //   .reduce((prev, item) => {
      //     return (
      //       prev +
      //       item.food_list.reduce((sprev, sitem) => {
      //         return sprev + sitem.num * sitem.price
      //       }, 0)
      //     )
      //   }, 0)
      //   .toFixed(2)
    }
  },

  mounted() {
    this.goodsList = JSON.parse(this.$root.$mp.query.goods_list)
    this.getPreOrderInfo()
    console.log(this.goodsList)
  },

  methods: {
     getPreOrderInfo() {
      utils.ajax({
        action: 'getPreOrderInfo',

        loading: true,
        success: res => {
          if (res.code == 0) {
            this.preOrderInfo = res.data

            this.$store.commit('updateState', {
              field: 'nowUser',
              value: {
                ...res.data.user_info
              }
            })
           
          }
        }
      })
    },
    changeAddress() {
      wx.navigateTo({
        url: `/pages/shopHome/changeAddress/main?`
      })
    },
    submitOrder() {
      utils.ajax({
        action: 'submitOrder',
        method: 'POST',
        data: {
          user_id: this.nowUser.user_id,
          role_id: this.nowUser.role_id,
          address_id: this.system == 'company' ? this.companyNowUser.address_id : this.nowUser.address_id,
          total_price: this.totalMoney,
          foods: JSON.stringify(this.foodList),
          menu_id: this.$root.$mp.query.menu_id
        },
        success: res => {
          if (res.code == 0) {
            let order_id_list = JSON.stringify([res.data.order_id])
            wx.reLaunch({
              url: `/pages/pay/index/main?order_id_list=${order_id_list}&total_money=${this.totalMoney}`
            })
          }
        }
      })
    }
  },
  components: {
    UserList,
    GoodsPanel
  }
}
</script>
<style lang="less">
@import '../../../assets/css/mixin.less';
.page-home__comfirm_order {
  padding-bottom: 84px;

  .full-page();

  background: url(~@/assets/img/comfirm_order.png) top center no-repeat;
  background-size: contain;

  scroll-view {
    height: 100%;
    // padding-bottom: 60px;
  }

  .user-list-container {
    padding: 12px;
    .c-user-list__assets {
      color: @theme;
      font-size: 14px;
    }
  }

  .goods-panel-container {
    padding: 0 12px;
  }

  .bottom-column {
    .left {
      line-height: 1;
      .total-price {
        font-size: 20px;
        margin-bottom: 5px;
      }
      .total-count {
        font-size: 10px;
        color: #151515;
      }
    }

    .right {
      background: @orange;
    }
  }
}
</style>

