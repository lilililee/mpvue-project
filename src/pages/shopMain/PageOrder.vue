<template>
  <div class="page-order__index">
    <ul class="top-bar">
      <li :class="{active: activeType==1}" @click="changeActiveType(1)">未支付</li>
      <li :class="{active: activeType==2}" @click="changeActiveType(2)">已支付</li>
    </ul>

    <ul class="order-list">
      <li v-for="(item, index) in orderList" :key="index" @click="toOrderDetailPage(item)">
        <div class="top">
          <div class="data-time">{{item.date_time}}</div>
          <div class="status" :class="'status_' + item.status">{{statusList[activeType]}}</div>
        </div>
        <div class="goods-list">
          <div class="goods-list-item" v-for="(sitem, sindex) in item.goods_list" :key="sindex">
            <img :src="sitem.img" class="img" @error="onImageError(sitem)">
            <div class="info">
              <div class="name">{{sitem.name}}</div>
              <div class="bottom">
                <div class="price">¥{{sitem.price}}</div>
                <div class="num">X {{sitem.num}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="count">共 {{item.totalNum}} 件商品 ,合计 {{item.totalPrice}}元</div>
      </li>
    </ul>

    <empty v-if="isShowEmpty" text="没有找到订单"></empty>

    <loading-tip v-if="!isShowEmpty && page > 1" :isOver="isOver"></loading-tip>

  </div>
</template>

<script>
import utils from '@/utils'
import LoadingTip from '@/components/LoadingTip'
import Empty from '@/components/Empty'

export default {
  data() {
    return {
      activeType: 1, // 1，2
      page: 1,
      orderList: [],

      isShowEmpty: false,

      statusList: ['', '待支付', '已支付'], // 对应状态 1 2

      isOver: false
    }
  },
  onReachBottom() {
    !this.isOver && this.getUserOrderList()
  },

  mounted() {
    this.getUserOrderList()
  },

  methods: {
    getUserOrderList() {
      utils.ajax({
        action: 'getUserOrderList',
        data: {
          type: String(this.activeType),
          page: this.page
        },
        loading: this.page == 1,
        success: res => {
          if (res.code == 0) {
            res.data.list = res.data.list || []
            if (res.data.list.length < 10) {
              this.isOver = true
            }

            res.data.list.forEach(item => {
              item.totalNum = 0
              item.totalPrice = 0
              item.goods_list.forEach(sitem => {
                item.totalNum += sitem.num * 1
                item.totalPrice += sitem.num * sitem.price
              })
              item.totalPrice = item.totalPrice.toFixed(2)
            })
            this.page++

            this.orderList = this.orderList.concat(res.data.list)

            this.isShowEmpty = this.orderList.length == 0
          }
        }
      })
    },
    changeActiveType(type) {
      if (type == this.activeType) return

      this.page = 1
      this.orderList = []
      this.isOver = false
      this.activeType = type
      this.getUserOrderList()
    },

    toOrderDetailPage(item) {
      wx.navigateTo({
        url: `/pages/shopOrder/orderDetail/main?order_id=${item.order_id}&status=${item.status}`
      })
    },
    onImageError(item) {
      item.img = require('../../assets/img/goods_default.png')
    }
  },
  components: {
    LoadingTip,
    Empty
  }
}
</script>
<style lang="less">
@import '../../assets/css/mixin.less';
.page-order__index {
  padding-top: 44px;

  .top-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
    .flex-center();
    margin-bottom: 10px;
    padding: 0 16px;
    .border-bottom();
    background: #fff;

    li {
      border-bottom: 2px solid transparent;
      font-size: 14px;
      line-height: 42px;
      padding: 0 6px;

      margin: 0 40px;

      &.active {
        color: @theme;
        border-bottom-color: @theme;
      }
    }
  }

  .order-list {
    li {
      background: #fff;
      margin-top: 12px;
      padding: 16px;
      padding-top: 12px;
    }

    .top {
      .flex-between();
      line-height: 20px;
      margin-bottom: 12px;
      .status_1 {
        color: #ff683d;
      }
    }

    .goods-list-item {
      .flex-between();
      padding-bottom: 14px;
      .img {
        display: block;
        .wh(60px);
      }

      .info {
        width: 275px;
      }

      .name {
        line-height: 20px;
        height: 40px;
        overflow: hidden;
        margin-bottom: 8px;
      }

      .bottom {
        .flex-between();
        line-height: 16px;
      }

      .price {
         color: #FF5050;
      }

      .num {
        font-size: 12px;
      }
    }

    .count {
      text-align: right;
      padding-top: 4px;
    }
  }
}
</style>

