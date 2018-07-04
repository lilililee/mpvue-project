<template>
    <div class="page-home__chooseFood">
        <div class="user-info flex-center">
            <div class="title">订餐人：</div>
            <div class="user">{{nowUser.name}}({{nowUser.role_name}})</div>
        </div>

        <div class="choose-food-area flex">
            <scroll-view scroll-y class="date-list">
                <div class="date-list-item" @click="chooseAll">全部</div>
                <div class="date-list-item flex-between" v-for="(item, index) in foodList" :key="index" @click="changeDate(index)">
                    <div class="date">{{item.date2}}</div>
                    <div class="count" :class="'count_' + item.count">
                        <span>{{item.count}}</span>
                    </div>
                </div>
            </scroll-view>
            <scroll-view scroll-y class="food-list" v-if="foodList.length" :scroll-top="scrollTop">
                <div class="food-list-item flex" v-for="(item, index) in foodList[nowIndex].food_list" :key="index">
                    <div class="img">
                        <img :src="item.img" alt="">
                    </div>
                    <div class="text">
                        <div class="name">{{item.name}}</div>
                        <div class="buy flex-between">
                            <div class="price">{{item.price}}元</div>
                            <div class="picker-num flex-center" :class="'picker-num_' + item.num">
                                <div class="minus" @click="handleNum(-1,item)">-</div>
                                <div class="num">{{item.num}}</div>
                                <div class="add" @click="handleNum(1,item)">+</div>
                            </div>
                        </div>
                    </div>

                </div>
            </scroll-view>
        </div>

        <div class="bottom-column">
            <div class="left">
                共{{totalNum}}餐，合计金额
                <span>{{totalMoney}}元</span>
            </div>
            <div class="right" :class="{active: isChooseEveryDay}" @click="comfirmOrder">
                确认
            </div>
        </div>

    </div>
</template>

<script>
import utils from '../../../utils'

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
      return this.foodList.reduce((prev, item) => {
        return (
          prev +
          item.food_list.reduce((sprev, sitem) => {
            return sprev + sitem.num * sitem.price
          }, 0)
        )
      }, 0)
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
        loading:true,
        success: res => {
          if (res.code == 0) {
            res.data.list.forEach(item => {
              item.date2 = item.date.slice(5)
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
      this.foodList.forEach(item => {
        if (item.count == 0) {
          item.food_list.forEach((sitem, index) => {
            if (index == 0) {
              sitem.num = 1
              item.count = 1
            } else {
              sitem.num = 0
            }
          })
        }
      })
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

      let food_list = JSON.stringify(this.foodList)

      wx.navigateTo({
        url: `/pages/home/comfirmOrder/main?food_list=${food_list}`
      })
    }
  },
  components: {}
}
</script>
<style lang="less">
@import '../../../assets/css/mixin.less';
.page-home__chooseFood {
  height: 100vh;
  .user-info {
    // border-top: 1rpx solid @borderColor;

    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 80rpx;
    line-height: 80rpx;
  }

  .choose-food-area {
    padding-top: 80rpx;
    padding-bottom: @bottomColumnHeight;
    height: 100%;
    .date-list {
      width: 25%;
      height: 100%;
      background: #ccc;
      text-align: center;
      border-right: 10rpx solid #fff;
      .date-list-item {
        height: 80rpx;
        line-height: 80rpx;

        + .date-list-item {
          border-top: 1rpx solid #eee;
        }
      }

      .date {
        margin-left: 20rpx;
      }

      .count {
        margin-right: 20rpx;
      }
    }

    .food-list {
      width: 75%;
      height: 100%;

      .food-list-item {
        & + .food-list-item {
          margin-top: 20rpx;
        }
      }

      .img {
        width: 25%;

        img {
          display: block;
          width: 100%;
          height: 180rpx;
        }
      }

      .text {
        width: 75%;
        padding-left: 20rpx;
      }

      .name {
        font-size: 40rpx;
        line-height: 1.2;
        height: 96rpx;
        overflow: hidden;
        margin-bottom: 20rpx 0;
      }

      .buy {
      }

      .price {
        font-size: 32rpx;
        color: @red;
      }

      .picker-num {
        margin-right: 30rpx;
        &.picker-num_0 {
          .minus,
          .num {
            display: none;
          }
        }
        .minus,
        .add {
          width: 40rpx;
          height: 40rpx;
          border-radius: 50%;
          line-height: 40rpx;
          text-align: center;
          color: #fff;
        }

        .minus {
          background: @red;
        }

        .add {
          background: @blue;
        }

        .num {
          margin: 0 20rpx;
        }
      }
    }
  }

  .bottom-column {
    
    .left {
      

      span {
        font-size: 30rpx;
      }
    }

    // .submit-btn {
    //   width: 180rpx;
    //   text-align: center;
    //   background: #ccc;
    //   color: #fff;

    //   &.active {
    //     background: @blue;
    //   }
    // }
  }
}
</style>

