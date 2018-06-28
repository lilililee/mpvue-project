<template>
    <div class="c-order-list ">
        <div class="panel">
            <div class="panel-header">
                <div class="panel-header__title">{{newOrderList.name}}订餐</div>
                <div class="panel-header__other">共{{newOrderList.total_num}}份，合计{{newOrderList.total_price}}元</div>
            </div>
            <div class="panel-body">
                <ul>
                    <li class="day-item flex" v-for="(item, index) in newOrderList.foodList" :key="index" v-show="index<limit">
                        <div class="date">{{item.date2}}</div>
                        <ul class="foods">
                            <li class="food-item flex-between" v-for="(sitem, sindex) in item.food_list" :key="sindex" :class="'status_'+sitem.status" v-if="sitem.num!=0">
                                <div class="name">{{sitem.name}}</div>
                                <div class="num">{{sitem.num}}份</div>
                                <div class="price">{{sitem.price}}元</div>
                            </li>
                        </ul>
                    </li>
                </ul>

                <div class="more" @click="limit+=5" v-if="newOrderList.foodList && limit<newOrderList.foodList.length">查看更多</div>
            </div>
        </div>
    </div>
</template>

<script>
import utils from '@/utils'
export default {
  props: {
    orderList: Object
  },
  data() {
    return {
      newOrderList: {},
      limit: 5
    }
  },
  mounted() {
    let temp = this.orderList
    temp.name = `${temp.month.slice(0, 4)}年${temp.month.slice(5)}月`
    temp.total_num = temp.foodList.reduce((prev, item) => {
      return prev + item.count
    }, 0)
    temp.total_price = temp.foodList.reduce((prev, sitem) => {
      return (
        prev +
        sitem.food_list.reduce((sprev, ssitem) => {
          return sprev + ssitem.num * ssitem.price
        }, 0)
      )
    }, 0)
    this.newOrderList = temp

    console.log(temp)
  }
}
</script>

<style lang="less">
@import '../assets/css/mixin';
.c-order-list {
  .day-item {
    font-size: 28rpx;
    line-height: 80rpx;
  }
  .date {
    width: 20%;
  }

  .foods {
    width: 80%;
  }

  .food-item {
    .name {
      width: 40%;
      .limit();
    }

    .num {
      width: 40%;
      padding-left: 30rpx;
    }

    .price {
      width: 20%;
    }
  }

  .more {
    padding: 30rpx 0;
    text-align: center;
  }
}
</style>
