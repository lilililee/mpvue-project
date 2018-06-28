<template>
    <div class="page-home__comfirmOrder">
        <div class="panel">
            <div class="panel-header">
                <div class="panel-header__title">订餐人信息</div>
                <div class="panel-header__other"></div>
            </div>
            <div class="panel-body">
                <user-list :userList="userList">
                </user-list>
            </div>
        </div>

        <order-list v-for="(item, index) in orderList" :key="index" :orderList="item"></order-list>

        <div class="bottom-column">
            <div class="left">
                共{{totalDay}}天， 共{{totalNum}}餐， 合计金额
                <span>{{totalMoney}}元</span>
            </div>
            <div class="right" :class="{active: isChooseEveryDay}" @click="comfirmOrder">
                确认
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
      userList: [],
      foodList: [],
      orderList: []
    }
  },
  computed: {
    nowUser() {
      return this.$store.state.nowUser
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

  mounted() {
    this.handleFoodList()
    this.getSingleUserInfo()
  },

  methods: {
    handleFoodList() {
      this.foodList = JSON.parse(this.$root.$mp.query.food_list)
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
    },
    getSingleUserInfo() {
      utils.ajax({
        action: 'getSingleUserInfo',
        data: {
          user_id: this.nowUser.user_id,
          role_id: this.nowUser.role_id
        },
        success: res => {
          if (res.code == 0) {
            this.userList = [res.data]
          }
        }
      })
    }
  },
  components: {
    UserList,
    OrderList
  }
}
</script>
<style lang="less">
@import '../../../assets/css/mixin.less';
.page-home__comfirmOrder {
  padding-bottom: @bottomColumnHeight;

  .bottom-column {
    .right {
      background: #ff6633;
    }
  }
}
</style>

