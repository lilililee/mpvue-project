<template>
  <div class="page-order__index" :style="{paddingBottom: activeType==1?'60px':''}">
    <ul class="top-bar">
      <li :class="{active: activeType==0}" @click="changeActiveType(0)">全部</li>
      <li :class="{active: activeType==1}" @click="changeActiveType(1)">未支付</li>
      <li :class="{active: activeType==2}" @click="changeActiveType(2)">已支付</li>
      <li :class="{active: activeType==3}" @click="changeActiveType(3)">已完成</li>
    </ul>

    <ul class="order-list">
      <li v-for="(item, index) in orderList" :key="index" @click="toOrderDetailPage(item)">
        <div class="left">
          <div class="select" v-if="activeType==1">
            <i class="icon-select" :class="{active:item.is_check}" @click="item.is_check = !item.is_check"></i>
          </div>
          <div>
            <div class="date-name">
              <i v-if="item.is_add=='1'" class="icon-add-dinner"></i>
              <span>{{item.date_name}}</span>
            </div>
            <div class="info">
              <img :src="item.user_info.head_img" alt="" class="img">
              <div class="text">
                <div class="name">
                  <span>{{item.user_info.name}}</span>
                  <i class="c-role" :class="'role_' + item.user_info.role_id">{{item.user_info.role_name}}</i>
                </div>
                <div class="count">
                  共 {{item.total_days}} 天 {{item.total_num}} 份
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="right" :class="'status_' + item.status">
          <div class="status-name">{{statusList[item.status]}}</div>
          <div class="total-price">{{item.total_price}}</div>
        </div>
      </li>
    </ul>

    <empty v-if="isShowEmpty"></empty>

    <loading-tip v-if="!isShowEmpty" :isOver="isOver"></loading-tip>

    <div class="to-pay" v-if="activeType==1&&!isShowEmpty">
      <div class="left">

        <div class="select" @click="checkAll">
          <i class="icon-select" :class="{active:isCheckAll}"></i>全选
        </div>

        <div class="total-price">合计：
          <span>{{checkTotalPrice}}</span>
        </div>
      </div>

      <div class="right" v-if="checkOrderList.length" @click="toPay">去支付</div>
      <div class="right disabled" v-else>去支付</div>
    </div>

  </div>
</template>

<script>
import utils from '@/utils'
import LoadingTip from '@/components/LoadingTip'
import Empty from '@/components/Empty'

export default {
  data() {
    return {
      activeType: 0, // 0,1,2,3
      page: 1,
      orderList: [],

      isShowEmpty: false,

      statusList: ['', '待支付', '已支付', '已支付'], // 对应状态 1 2 3

      isOver: false
    }
  },
  computed: {
    checkOrderList() {
      return this.orderList.filter(item => item.is_check)
    },
    isCheckAll() {
      return this.checkOrderList.length == this.orderList.length && this.orderList.length != 0
    },
    checkTotalPrice() {
      return this.checkOrderList
        .reduce((prev, item) => {
          return prev + parseFloat(item.total_price)
        }, 0)
        .toFixed(2)
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
        success: res => {
          if (res.code == 0) {
            if (res.data.list.length < 10) {
              this.isOver = true
            }
            this.page++
            if (this.activeType == 1) {
              res.data.list.forEach(item => {
                item.is_check = false
              })
            }
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
    checkAll() {
      if (this.isCheckAll) {
        this.orderList.forEach(item => {
          item.is_check = false
        })
      } else {
        this.orderList.forEach(item => {
          item.is_check = true
        })
      }
    },
    toPay() {
      let list = []
      this.checkOrderList.forEach(item => {
        list.push(item.order_id)
      })
      wx.reLaunch({
        url: `/pages/pay/index/main?order_id_list=${JSON.stringify(list)}&total_money=${this.checkTotalPrice}`
      })
    },
    toOrderDetailPage(item) {
      wx.navigateTo({
        url: `/pages/order/orderDetail/main?user_id=${item.user_info.user_id}&role_id=${item.user_info.role_id}&order_id=${item.order_id}&status=${1}`
      })
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
    .flex-between();
    margin-bottom: 10px;
    padding: 0 16px;
    .border-bottom();
    background: #fff;

    li {
      border-bottom: 2px solid transparent;
      font-size: 14px;
      line-height: 42px;
      padding: 0 6px;
      // margin: 0 42px;

      &.active {
        color: @theme;
        border-bottom-color: @theme;
      }
    }
  }

  .order-list {
    background: #fff;
    li {
      .flex-between();
      padding: 13px 16px 19px 16px;
      + li {
        .border-top();
      }
    }

    .left {
      .flex-start();
    }

    .select {
      .flex-start();
      height: 100%;
      margin-right: 12px;
    }
    // *****

    .date-name {
      .flex-start();
      line-height: 20px;
      margin-bottom: 12px;

      .icon-add-dinner {
        margin-right: 6px;
      }
    }

    .info {
      .flex-start();

      .img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: block;
        margin-right: 8px;
      }

      .text {
      }

      .count {
        font-size: 12px;
        color: @gray;
        line-height: 16px;
        margin-top: 4px;
      }
    }

    .right {
      padding-top: 34px;
      text-align: right;
      line-height: 16px;

      &.status_1 {
        .status-name {
          color: #ff7c00;
        }
        .total-price {
          color: #333;
        }
      }
      &.status_2 {
        .status-name {
          color: #333;
        }
      }
      &.status_3 {
        .status-name {
          color: @gray;
        }
      }

      .total-price {
        color: @gray;
        margin-top: 6px;
        font-size: 12px;
      }
    }
  }

  .to-pay {
    position: fixed;
    left: 0;
    bottom: 50px;
    .flex-between();
    height: 60px;
    width: 100%;
    background: #fff;
    box-shadow: inset 0 1px 0 0 rgba(0, 0, 0, 0.05);

    .left {
      .flex-start();
      padding-left: 16px;

      .select {
        .flex-start();
        margin-right: 16px;
        i {
          margin-right: 8px;
        }
      }

      .total-price {
        span {
          color: #151515;
        }
      }
    }

    .right {
      width: 120px;
      .lh(60px);
      color: #fff;
      background: #FF7C00;
      text-align: center;

      &.disabled {
        color: #999;
        background: #dfdfdf;
      }
    }
  }
}
</style>

