<template>
  <div class="page-order__index">
    <ul class="top-bar">
      <li :class="{active: activeType==0}" @click="changeActiveType(0)">全部</li>
      <li :class="{active: activeType==1}" @click="changeActiveType(1)">未支付</li>
      <li :class="{active: activeType==2}" @click="changeActiveType(2)">已支付</li>
      <li :class="{active: activeType==3}" @click="changeActiveType(3)">已完成</li>
    </ul>

    <ul class="order-list">
      <li v-for="(item, index) in orderList" :key="index">
        <div class="left">
          <div class="select">
            <i class="icon-select" :class=""></i>
          </div>
          <div>
            <div class="date-name">{{item.date_name}}</div>
            <div class="info">
              <img :src="item.user_info.head_img" alt="" class="img">
              <div class="text">
                <div class="name">
                  <span>{{item.user_info.name}}</span>
                  <i class="role" :class="'status_' + item.user_info.role_id">{{item.user_info.role_name}}</i>
                </div>
                <div class="count">
                  共 {{item.total_days}} 天 {{item.total_num}} 份
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="right">
          <div class="status" :class="'status_' + item.status">{{statusList[item.status]}}</div>
          <div class="total-price">{{item.total_price}}</div>
        </div>
      </li>
    </ul>

    <loading-tip :isOver="isOver"></loading-tip>

  </div>
</template>

<script>
import utils from '@/utils'
import LoadingTip from '@/components/LoadingTip'

export default {
  data() {
    return {
      activeType: 0, // 0,1,2,3
      page: 1,
      orderList: [],

      statusList: ['待支付', '已支付', '已支付'],

      isOver: false
    }
  },
  onReachBottom() {
    !this.isOver && this.getFeedbackList()
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
            this.orderList = this.orderList.concat(res.data.list)
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
    }
  },
  components: {
    // TabBar
    // UserList
  }
}
</script>
<style lang="less">
.page-order__index {
  @import '../../assets/css/mixin.less';
  //   .slide-image {
  //     width: 100%;
  //     height: 400rpx;
  //   }
}
</style>

