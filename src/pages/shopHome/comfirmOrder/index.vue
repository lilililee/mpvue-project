<template>
  <div class="page-home__comfirm_order" :style="{paddingBottom: isIphoneX?'118px':'84px'}">
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
      <div class="top">现在下单预计{{nowUser.expect_time}}后到货</div>
      <div class="left">
        合计：
        <span>¥{{totalMoney}}</span>

      </div>

      <div class="right" @click="submitOrder">去支付</div>

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
      return this.goodsList
        .reduce((prev, item) => {
          return prev + (item.price * 1 + item.carriage * 1) * item.num
        }, 0)
        .toFixed(2)
    }
  },

  mounted() {
    this.goodsList = JSON.parse(this.$root.$mp.query.goods_list)
    // this.getPreOrderInfo()
  },

  methods: {
    // getPreOrderInfo() {
    //   utils.ajax({
    //     action: 'getPreOrderInfo',

    //     loading: true,
    //     success: res => {
    //       if (res.code == 0) {
    //         this.preOrderInfo = res.data

    //         this.$store.commit('updateState', {
    //           field: 'nowUser',
    //           value: {
    //             ...res.data.user_info,
    //             expect_time: res.data.expect_time
    //           }
    //         })
    //       }
    //     }
    //   })
    // },
    changeAddress() {
      wx.navigateTo({
        url: `/pages/shopHome/changeAddress/main`
      })
    },
    submitOrder() {
      let goodsList = []
      this.goodsList.forEach(item => {
          goodsList.push({
              goods_id: item.goods_id,
              num: item.num,
          })
      })
      utils.ajax({
        action: 'submitOrder',
        method: 'POST',
        data: {
          address_id: this.nowUser.address_id,
          total_money: this.totalMoney,
          goods_list: JSON.stringify(goodsList)
        },
        success: res => {
          if (res.code == 0) {
            let order_id_list = JSON.stringify([res.data.order_id])
            wx.reLaunch({
              url: `/pages/pay/index/main?order_id_list=${order_id_list}&total_money=${res.data.total_money}`
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
    // padding-bottom: 24px;
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
    .top {
      position: absolute;
      left: 0;
      width: 100%;
      top: -24px;
      .lh(24px);
      font-size: 12px;
      color: #ff0707;
      text-align: center;

      background: rgba(255, 243, 205, 0.9);
    }
    .left {
      span {
        font-size: 20px;
      }
    }

    .right {
      background: @orange;
    }
  }
}
</style>

