<template>
  <div class="page-home__chooseFood" v-if="foodList.length">

    <div class="choose-food-area flex">
      <div class="date-list-container">
        <div class="choose-all" @click="chooseAll" v-if="isChooseEveryDay">取消全选</div>
        <div class="choose-all" @click="chooseAll" v-else>全选</div>
        <scroll-view scroll-y class="date-list">

          <div class="date-list-item" v-for="(item, index) in foodList" :key="index" :class="{active: nowIndex==index}" @click="changeDate(index)">
            <div class="date">{{item.date2}}{{item.week}}</div>
            <div class="count" :class="'count_' + item.count">
              <span>{{item.count}}</span>
            </div>
          </div>
          <div class="placeholder"></div>
        </scroll-view>
      </div>
      <div class="food-list-container">
        <scroll-view scroll-y class="food-list" v-if="foodList.length" :scroll-top="scrollTop">
          <div class="food-list-item flex-between" v-for="(item, index) in foodList[nowIndex].food_list" :key="index">
            <div class="img">
              <img :src="item.img" :alt="item.name">
            </div>
            <div class="text">
              <div class="name">{{item.name}}</div>
              <div class="buy flex-between">
                <div class="price">
                  <span>¥</span>{{item.price}}
                </div>
                <div class="picker-num flex-center" :class="'picker-num_' + item.num">

                  <i class="icon-dinner-minus " @click="handleNum(-1,item)"></i>
                  <div class="num">{{item.num}}</div>
                  <i class="icon-dinner-plus" @click="handleNum(1,item)"></i>
                </div>
              </div>
            </div>

          </div>
          <div class="placeholder"></div>
        </scroll-view>
      </div>
    </div>

    <div class="bottom-column">
      <div class="user-info flex-center">
        订餐人：{{nowUser.name}}({{nowUser.role_name}})
      </div>

      <div class="pay-info">
        <div class="left">
          <div>
            <div class="total-price">¥{{totalMoney}}</div>
            <div class="total-count"> 共{{foodList.length}}天{{totalNum}}份</div>
          </div>
        </div>

        <div class="right" v-if="isChooseEveryDay" @click="comfirmOrder">
          <span>确认下单</span>
        </div>
        <div class="right disabled" v-else>
          <span>按日期订满<br/>才能下单</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import utils from '../../../utils'

let weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

export default {
  data() {
    return {
      foodList: [],
      nowIndex: 0,
      scrollTop: 0
    }
  },
  computed: {
    nowUser() {
      return this.$store.state.nowUser
    },
    totalNum() {
      if (!this.foodList.length) return 0
      return this.foodList.reduce((prev, item) => {
        return prev + item.count
      }, 0)
    },
    totalMoney() {
      if (!this.foodList.length) return 0
      return this.foodList
        .reduce((prev, item) => {
          return (
            prev +
            item.food_list.reduce((sprev, sitem) => {
              return sprev + sitem.num * sitem.price
            }, 0)
          )
        }, 0)
        .toFixed(2)
    },
    isChooseEveryDay() {
      return this.foodList.every(item => item.count > 0)
    }
  },

  mounted() {
    this.getFoodList()
    // console.log(this.$root.$mp)
  },

  methods: {
    getFoodList() {
      utils.ajax({
        action: 'getFoodList',
        data: {
          user_id: this.nowUser.user_id,
          role_id: this.nowUser.role_id,
          ...this.$root.$mp.query
        },
        loading: true,
        success: res => {
          if (res.code == 0) {
            res.data.list.forEach(item => {
              item.date2 = item.date.slice(-5)

              item.week = weekList[new Date(item.date).getDay()]
              item.count = 0

              item.food_list.forEach(sitem => {
                sitem.num = 0
              })
            })
            this.foodList = res.data.list
          }
        }
      })
    },
    chooseAll() {
      if (this.isChooseEveryDay) {
        this.foodList.forEach(item => {
          item.count = 0
          item.food_list.forEach((sitem, index) => {
            sitem.num = 0
          })
        })
      } else {
        this.foodList.forEach(item => {
          if (item.count == 0) {
            item.count = 1
            item.food_list.forEach((sitem, index) => {
              if (index == 0) {
                sitem.num = 1
              } else {
                sitem.num = 0
              }
            })
          }
        })
      }
    },
    changeDate(index) {
      if (this.nowIndex == index) return
      this.scrollTop = 0
      this.nowIndex = index
    },
    handleNum(num, item) {
      item.num += num
      this.foodList[this.nowIndex].count += num
    },

    comfirmOrder() {
      if (!this.isChooseEveryDay) {
        return
      }

      let result = []

      this.foodList.forEach(item => {
        result.push({
          ...item,
          food_list: item.food_list.filter(sitem => sitem.num > 0)
        })
      })

      this.$store.commit('updateFoodList', result)

      wx.navigateTo({
        url: `/pages/home/comfirmOrder/main?menu_id=${this.$root.$mp.query.menu_id}`
      })
    }
  },
  components: {}
}
</script>
<style lang="less">
@import '../../../assets/css/mixin.less';
.page-home__chooseFood {
  border-top: 1rpx solid @borderColor;
  .full-page();

  .choose-food-area {
    padding-bottom: 60px;
    height: 100%;

    .date-list-container {
      position: relative;
      padding-top: 40px;
      width: 116px;
      height: 100%;
      border-right: 1rpx solid @borderColor;
      text-align: center;
      .choose-all {
        position: absolute;
        width: 115.5px;
        left: 0;
        top: 0;
        // position: fixed;
        // width: 115.5px;
        // left: 0;
        // top: 1rpx;
        .lh(40px);

        border-bottom: 1rpx solid @borderColor;

        background: #fff;
        color: #333;
      }
    }
    .food-list-container {
      width: 259px;
      padding-left: 10.5px;
      height: 100%;
    }

    .placeholder {
      height: 24px;
    }
    .date-list {
      height: 100%;
      background: #f0f3fa;
      font-size: 12px;

      .date-list-item {
        .lh(40px);
        .flex-center();
        font-size: 12px;
        color: #666;

        &.active {
          background: #fff;
          color: #333;
        }
      }

      .date {
        margin-right: 6.5px;
      }

      .count {
        .lh(20px);
        width: 20px;
        border-radius: 50%;
        background: #ff1744;
        color: #fff;

        &.count_0 {
          opacity: 0;
        }
        &.count_1 {
          background: @theme;
        }
      }
    }

    .food-list {
      // width: 75%;
      height: 100%;

      .food-list-item {
        padding: 10px 0;
        // & + .food-list-item {
        //   margin-top: 30px;
        // }
      }

      .img {
        img {
          display: block;
          .wh(60px);
        }
      }

      .text {
        height: 60px;
        width: 187px;
        padding: 0 12px;
      }

      .name {
        font-size: 14px;
        padding: 8px 0 12px 0;
        .limit();
      }

      .buy {
      }

      .price {
        font-size: 16px;
        color: #ff7c00;
        span {
          font-size: 10px;
          vertical-align: 1px;
        }
      }

      .picker-num {
        &.picker-num_0 {
          .icon-dinner-minus,
          .num {
            display: none;
          }
        }

        .num {
          width: 21px;
          text-align: center;
          font-size: 12px;
        }
      }
    }
  }

  .bottom-column {
    height: 60px;
    .user-info {
      position: absolute;
      left: 0;
      top: -24px;
      width: 100%;
      .lh(24px);
      text-align: center;
      font-size: 12px;
      color: #333;
      background: rgba(255, 243, 205, 0.9);
    }

    .pay-info {
      .flex-between();
      width: 100%;
      height: 100%;

      .left {
        // width: 150px;
        // padding-left: 17px;
        // padding-top: 14px;
        // line-height: 1;
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
        // width: 120px;
        // .flex-center();
        // font-size: 16px;
        // color: #fff;
        line-height: 22px;
        background: @theme;

        &.disabled {
          color: @gray;
          background: #dfdfdf;
        }
      }
    }
  }
}
</style>

