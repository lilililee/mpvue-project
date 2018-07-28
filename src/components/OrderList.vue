<template>
  <div class="c-order-list" :class="'type_'+type">
    <div class="panel" v-for="(monthOrderItem, monthOrderIndex) in orderList" :key="monthOrderIndex">
      <div class="panel-header">
        <div class="panel-header__title">{{monthOrderItem.month_name}}月订餐情况</div>
        <div class="panel-header__other">共
          <strong>{{monthOrderItem.days}}</strong> 天
          <strong>{{monthOrderItem.total_num}}</strong> 份，合计
          <strong>{{monthOrderItem.total_price}}</strong> 元</div>
      </div>
      <div class="panel-body">
        <ul>
          <li class="day-item" v-for="(item, index) in monthOrderItem.food_list" :key="index" v-if="index<monthOrderItem.limit">
            <div class="date">{{item.date2}} {{item.week}}
              <span :class="{dup:item.count>1}" v-if="type!='status'">x{{item.count}}</span>
            </div>
            <ul class="foods">
              <li class="food-item" v-for="(sitem, sindex) in item.food_list" :key="sindex" :class="'status_' + sitem.status">
                <div class="name">{{sitem.name}}</div>
                <div class="status" v-if="type=='status'">{{statusList[sitem.status]}}</div>
                <div class="price">¥ {{sitem.price}}</div>
              </li>
            </ul>
          </li>
        </ul>

        <div class="more" @click="monthOrderItem.limit+=5" v-show="monthOrderItem.food_list && monthOrderItem.limit<monthOrderItem.food_list.length">查看更多</div>
        <div class="more" v-show="monthOrderItem.food_list && monthOrderItem.limit>=monthOrderItem.food_list.length">没有更多了</div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '@/utils'

let weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

export default {
  props: {
    foodList: Array,
    type: {
      type: String, // 当为status 表示要展示食品状态
      default: ''
    }
  },
  watch: {
    foodList() {
      this.handleFoodList()
    }
  },
  data() {
    return {
      orderList: [],
      statusList: ['', '待支付', '已支付', '已完成', '已停餐'],
  
    }
  },
  mounted() {
    this.handleFoodList()
  },
  methods: {
    handleFoodList() {
      // 源数据
      // this.foodList = [
      //   {
      //     date: '',
      //     food_list: [
      //       {
      //         food_id: '',
      //         num: '',
      //         price: ''
      //       }
      //     ]
      //   }
      // ]

      // 处理后的数据
      // this.orderList = [
      //   {
      //     month: '',
      //     month_name: '',
      //     days:'',
      //     total_num: '',
      //     total_price: '',
      //     limit: 5,
      //     food_list: [
      //       {
      //         date: '',
      //         date2: '',
      //         week: '',
      //         count: '',
      //         food_list: [
      //           {
      //             food_id: '',
      //             num: '',   // 如果份数为多份，会重复添加一份数据，num值始终保持为0
      //             price: ''
      //           },
      //           {
      //             food_id: '',
      //             num: '',
      //             price: ''
      //           }
      //         ]
      //       }
      //     ]
      //   }
      // ]
      // this.foodList = JSON.parse(this.$root.$mp.query.food_list)
      // 归类已有的月份
      let months = {}
      let tempOrderList = []
      this.foodList.forEach(item => {
        item.month = item.date.slice(0, 7)
        months[item.month] = 1
      })

      for (let key in months) {
        tempOrderList.push({
          month: key,
          food_list: this.foodList.filter(item => {
            return item.month == key
          })
        })
      }

      // 计算每个月份的月份名，总份数和总价格
      tempOrderList.forEach((monthOrderItem, monthOrderIndex) => {
        monthOrderItem.days = monthOrderItem.food_list.length
        monthOrderItem.month_name = parseInt(monthOrderItem.month.slice(5))
        monthOrderItem.total_num = 0
        monthOrderItem.total_price = 0
        monthOrderItem.limit = 5
        monthOrderItem.food_list.forEach(item => {
          item.date2 = item.date.slice(5).replace('/', '-')
          item.week = weekList[new Date(item.date).getDay()]
          item.count = 0

          let temp = [] // 保存重复菜品的数组
          item.food_list.forEach(sitem => {
            // 统计单天总份数
            item.count += parseInt(sitem.num)
            // 统计该月总价格
            monthOrderItem.total_price += sitem.price * sitem.num

            for (let i = 0; i < sitem.num; i++) {
              temp.push({
                ...sitem,
                num: 1
              })
            }
          })
          item.food_list = temp
          // 统计该月总份数
          monthOrderItem.total_num += item.count
          monthOrderItem.total_price
        })

        monthOrderItem.total_price = monthOrderItem.total_price.toFixed(2)
      })

      this.orderList = tempOrderList
    }
  }
}
</script>

<style lang="less">
@import '../assets/css/mixin';
.c-order-list {
  overflow: hidden;

//   .panel-body {
//     > ul {
//       padding: 6px 0;
//     }
//   }
  .day-item {
    display: flex;
    justify-content: space-between;
    align-items: top;
  }
  .date {
    width: 100px;

    span {
      color: @gray;
      margin-left: 10px;

      &.dup {
        color: #333;
      }
    }
  }

  .foods {
    width: 205px;
  }

  .food-item {
    .flex-between();

    .name {
      width: 125px;
      .limit();
    }

    .price {
      text-align: right;
      width: 55px;
      color: @orange;
    }
  }

  // 当要显示食品状态时的样式
  &.type_status {
    .date {
      width: 80px;
    }

    .foods {
      width: 240px;
    }

    .food-item {
      &.status_2 {
        .name,
        .status,
        .price {
          color: #333;
        }
      }

      &.status_3 {
        .status,
        .price {
          color: @gray;
        }
      }
      &.status_4 {
        .name,
        .status,
        .price {
          color: @red;
        }
      }
    }
  }

  .more {
    .lh(50px);
    border-top: 1rpx solid @borderColor;
    color: @gray;
    text-align: center;
  }
}
</style>
