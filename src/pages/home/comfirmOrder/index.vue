<template>
  <div class="page-home__comfirm_order">
    <div class="page-container">
      <scroll-view scroll-y>
        <div class="user-list-container">
          <user-list :userData="nowUser">
          </user-list>
        </div>

        <order-list :foodList="foodList"></order-list>
      </scroll-view>
    </div>

  
    <div class="bottom-column">
      <div class="left">
        <div>
          <div class="total-price">¥{{totalMoney}}</div>
          <div class="total-count"> 共{{foodList.length}}天{{totalNum}}份</div>
        </div>
      </div>

      <div class="right">
        <span>去支付</span>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '@/utils'
import UserList from '@/components/UserList'
import OrderList from '@/components/OrderList'

export default {
  data() {
    return {
      userList: []
     
    }
  },
  computed: {
    nowUser() {
      return this.$store.state.nowUser
    },
    foodList() {
      return this.$store.state.foodList
    },

    totalDay() {
      if (!this.foodList.length) return 0
      return this.foodList.length
    },
    totalNum() {
      if (!this.foodList.length) return 0
      return this.foodList.reduce((prev, item) => {
        return prev + item.count
      }, 0)
    },
    totalMoney() {
      if (!this.foodList.length) return 0
      return this.foodList.reduce((prev, item) => {
        return (
          prev +
          item.food_list.reduce((sprev, sitem) => {
            return sprev + sitem.num * sitem.price
          }, 0)
        )
      }, 0)
    }
  },

  mounted() {},

  methods: {
    handleFoodList() {
      // 归类已有的月份
      let months = {}
      this.foodList.forEach(item => {
        item.month = item.date.slice(0, 7)
        months[item.month] = 1
      })

      for (let key in months) {
        this.orderList.push({
          month: key,
          // name: `${key.slice(0, 4)}年${key.slice(5)}月`,
          foodList: this.foodList.filter(item => {
            return item.month == key
          })
        })
      }
    }
    // getSingleUserInfo() {
    //   utils.ajax({
    //     action: 'getSingleUserInfo',
    //     data: {
    //       user_id: this.nowUser.user_id,
    //       role_id: this.nowUser.role_id
    //     },
    //     success: res => {
    //       if (res.code == 0) {
    //         this.userList = [res.data]
    //       }
    //     }
    //   })
    // }
  },
  components: {
    UserList,
    OrderList
  }
}
</script>
<style lang="less">
@import '../../../assets/css/mixin.less';
.page-home__comfirm_order {
  padding-bottom: @bottomColumnHeight;

  .page-container {
    .full-page();
    padding-bottom: 60px;
    background: url(../../../assets/img/comfirm_oreder.png) top center no-repeat;
    background-size: contain;

    scroll-view {
      height: 100%;
      // padding-bottom: 60px;
    }
  }

  .user-list-container {
    padding: 12px;
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
      background: #ff6633;
    }
  }
}
</style>

