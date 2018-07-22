<template>
  <div class="page-user__stop_food" :class="{'x-padding': isIphoneX}">

    <ul class="food-list">
      <li v-for="(item,index) in foodList" :key="index" :class="'status_' + item.status" @click="item.status=='2' && (item.is_check = !item.is_check)">
        <div class="left">
          <div class="select">
            <i class="icon-select" :class="{active: item.status=='2' && item.is_check}"></i>
          </div>

          <div class="info">
            <div class="date">{{item.date_name}}</div>
            <div class="name">{{item.name}}</div>
          </div>
        </div>

        <div class="right">¥ {{item.price}}</div>
      </li>
    </ul>
    

    <div class="bottom-column"  :class="{'x-border': isIphoneX}">
      <div class="left">
        <div class="select" @click="checkAll">
          <i class="icon-select" :class="{active:isCheckAll}"></i>全选
        </div>
        <div class="total-price">合计：¥{{totalPrice}}</div>
      </div>

      <div class="right" @click="isShowCancelPopbox = true" v-if="checkList.length">停餐</div>
      <div class="right disabled" v-else>停餐</div>
    </div>

    <popbox v-model="isShowCancelPopbox" :popboxData="popboxData" @comfirm="comfirmStopFood"></popbox>
  </div>
</template>

<script>
import utils from '@/utils'
import Popbox from '@/components/Popbox'
export default {
  data() {
    return {
      isIphoneX: utils.isIphoneX,

      foodList: [],

      isShowCancelPopbox: false,
      popboxData: {
        title: '确认停餐',
        content: '已支付金额将在3个工作日退款到您的钱包余额请注意查收'
      }
    }
  },
  computed: {
    checkList() {
      return this.foodList.filter(item => item.status == '2' && item.is_check)
    },
    isCheckAll() {
      return this.foodList.every(item => item.status != '2' || item.is_check) && this.checkList.length
    },
    totalPrice() {
      return this.checkList.reduce((prev, item) => {
        return prev + parseFloat(item.price) 
      },0).toFixed(2)
    }
  },

  mounted() {
    this.handlerFoodList()
    console.log(this.checkList)
  },

  methods: {
    handlerFoodList() {
      let foodList = JSON.parse(this.$root.$mp.query.food_list) // 传递的只有status为'2'的食品
      // console.log(foodList)
      let resultFoodList = []
      foodList.forEach(item => {
        let date_name = `${item.date2} ${item.week}`
        item.food_list.forEach(sitem => {
          resultFoodList.push({
            ...sitem,
            date: item.date,
            date_name,
            is_check: false
          })
        })
      })
      this.foodList = resultFoodList
    },
    checkItem(item) {
      item.status == '2' && (item.is_check = !item.is_check)
    },

    checkAll() {
      if (this.isCheckAll) {
        this.foodList.forEach(item => {
          item.is_check = false
        })
      } else {
        this.foodList.forEach(item => {
          item.is_check = true
        })
      }
    },
    comfirmStopFood() {
      this.isShowCancelPopbox = false

      let list = []
      this.checkList.forEach(item => {
        list.push({
          date: item.date,
          food_id: item.food_id
        })
      })
      utils.ajax({
        action: 'submitCancelBooking',
        method: 'POST',
        data: {
          user_id: this.$root.$mp.query.user_id,
          role_id: this.$root.$mp.query.role_id,
          list: JSON.stringify(list)
        },
        success: res => {
          if (res.code == 0) {
            utils.showSuccess('停餐成功')
            this.foodList.forEach(item => {
              if (item.status == '2' && item.is_check) {
                item.status = '4'
                item.is_check = false
              }
            })
          }
        }
      })
    }
  },
  components: {
    Popbox
  }
}
</script>
<style lang="less">
@import '../../../assets/css/mixin.less';
.page-user__stop_food {
  padding-bottom: 60px;
  .food-list {
    box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.02);
    li {
      .flex-between();
      padding: 0 16px;
      .border-top();
      height: 70px;
      background: #fff;

      &.status_4 {
        background: transparent;
      }
    }

    .left {
      .flex-start();
      width: 60%;
      line-height: 20px;
    }
    .select {
      .flex-start();
      width: 32px;
    }

    .name {
      margin-top: 6px;
      color: #666;
      .limit();
    }

    .right {
      color: @orange;
      font-size: 18px;
    }
  }

  .bottom-column {
    .select {
      .flex-start();
      margin-right: 16px;
      .icon-select {
        margin-right: 8px;
      }
    }

    .right {
      color: #fff;
      background: #ff5050;
      &.disabled {
        background: #eeeeee;
        color: #999999;
      }
    }
  }
}
</style>