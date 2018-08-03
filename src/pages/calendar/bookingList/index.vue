<template>
  <div class="page-calendar__booking_list" v-if="bookingList">
    <div class="page-container" v-if="bookingList.length">
      <scroll-view scroll-y :scroll-top="scrollTop">
        <!-- solt内不能写v-if -->
        <div class="user-list-container" v-if="system=='company'">
          <user-list :userData="companyNowUser" @assistClick="changeAddress">
            <div class="c-user-list__assets">修改地址</div>
          </user-list>
        </div>
        <div class="user-list-container" v-else>
          <user-list :userData="nowUser">
          </user-list>
        </div>

        <div class="toggle-date">

          <div class="prev" @click="changeDay(-1)">
            <i class="icon-arrow-left"></i>
            <span>前一天</span>
          </div>
          <div class="date-name">{{dateName}}</div>
          <div class="next" @click="changeDay(1)">
            <span>后一天</span>
            <i class="icon-arrow-right"></i>
          </div>
        </div>

        <ul class="booking-list">
          <li v-for="(item, index) in bookingList" :key="index" :class="'status_'+item.status">
            <div class="img">
              <img :src="item.img" :alt="item.name" @error="onImageError(item)">
            </div>
            <div class="text">
              <div class="name">{{item.name}}</div>
              <div class="buy">
                <div class="price">
                  <span>¥</span>{{item.price}}
                </div>
              </div>
            </div>

            <div class="stop btn-group" v-if="item.status=='2'">
              <div class="btn btn__mini" @click="submitCancelBooking(item)">停餐</div>
            </div>
            <div class="stop btn-group" v-if="item.status=='4'">
              <div class="btn btn__mini">已停餐</div>
            </div>

          </li>

        </ul>

      </scroll-view>

    </div>
    <empty text="当前日期没有订餐" v-else></empty>

    <!-- <div class="toggle-date" :class="{'x-border': isIphoneX}">

      <div class="prev" @click="changeDay(-1)">
        <i class="icon-arrow-left"></i>
        <span>前一天</span>
      </div>
      <div class="date-name">{{dateName}}</div>
      <div class="next" @click="changeDay(1)">
        <span>后一天</span>
        <i class="icon-arrow-right"></i>
      </div>
    </div> -->

    <popbox v-model="isShowcancelPopbox" :popboxData="popboxData" @comfirm="comfirmcancel"></popbox>
  </div>

  </div>
</template>

<script>
import utils from '@/utils'
import UserList from '@/components//UserList'
import Popbox from '@/components/Popbox'
import Empty from '@/components/Empty'

export default {
  data() {
    return {
      isIphoneX: utils.isIphoneX,
      system: utils._config.system,
      bookingList: '',
      date: '',
      nowcancelFood: null,
      isShowcancelPopbox: false,

      scrollTop: 0,

      popboxData: {
        title: '确认停餐',
        content: '已支付金额将在3个工作日退款到您订餐钱包余额请注意查收'
      }
    }
  },
  computed: {
    nowUser() {
      return this.$store.state.nowUser
    },
    companyNowUser() {
      return this.$store.state.companyNowUser
    },

    dateName() {
      let temp = new Date(this.date)
      return `${temp.getMonth() + 1}月${temp.getDate()}日`
    }
  },

  // onShow() {
  //   if(this.system == 'company') {
  //     this.getUserAddress()
  //   }
  // },

  mounted() {
    this.date = this.$root.$mp.query.date

    // if (this.system == 'company') {
    //   this.getUserAddress() // 后续地址更新会在修改地址的页面处理
    // }

    this.system == 'company' && this.getUserAddress() // 后续地址更新会在修改地址的页面处理

    this.getUserBookingList()
  },

  methods: {
    getUserAddress() {
      utils.ajax({
        action: 'getUserAddress',
        data: {
          user_id: this.nowUser.user_id,
          role_id: this.nowUser.role_id,
          date: this.date
        },
        loading: true,
        success: res => {
          if (res.code == 0) {
            this.system == 'company' &&
              this.$store.commit('updateCompanyNowUser', {
                ...this.nowUser,
                address_id: res.data.address_id,
                address_name: res.data.address_name
              })
          }
        }
      })
    },
    getUserBookingList() {
      utils.ajax({
        action: 'getUserBookingList',
        data: {
          user_id: this.nowUser.user_id,
          role_id: this.nowUser.role_id,
          date: this.date
        },
        loading: true,
        success: res => {
          if (res.code == 0) {
            this.bookingList = res.data.list

            if (this.bookingList.length) {
              wx.setNavigationBarColor({
                frontColor: '#ffffff',
                backgroundColor: '#16B266'
              })
            } else {
              wx.setNavigationBarColor({
                frontColor: '#000000',
                backgroundColor: '#ffffff'
              })
            }
          }
        }
      })
    },
    changeAddress() {
      wx.navigateTo({
        url: `/pages/home/changeAddress/main?type=calendar&date=${this.date}`
      })
    },
    submitCancelBooking(item) {
      this.nowcancelFood = item
      this.isShowcancelPopbox = true
    },
    comfirmcancel() {
      this.isShowcancelPopbox = false
      utils.ajax({
        action: 'submitCancelBooking',
        method: 'POST',
        data: {
          user_id: this.nowUser.user_id,
          role_id: this.nowUser.role_id,
          list: JSON.stringify([
            {
              date: this.date,
              food_id: this.nowcancelFood.food_id
            }
          ])
        },
        success: res => {
          if (res.code == 0) {
            this.nowcancelFood.status = '4'
          }
        }
      })
    },
    changeDay(num) {
      this.date = utils.formatDate(new Date(new Date(this.date).valueOf() + num * 1000 * 60 * 60 * 24))
      if (this.system == 'company') {
        this.getUserAddress() // 后续地址更新会在修改地址的页面处理
      }
      this.scrollTop = 0
      this.getUserBookingList()
    },
    onImageError(item) {
      item.img = require('../../../assets/img/food_default.png')
    }
  },
  components: {
    UserList,
    Popbox,
    Empty
  }
}
</script>
<style lang="less">
@import '../../../assets/css/mixin.less';
.page-calendar__booking_list {
  .page-container {
    .full-page();

    padding: 12px 12px 60px 12px;
    padding-bottom: 0;
    background: url(~@/assets/img/comfirm_order.png) top center no-repeat;
    background-size: contain;

    scroll-view {
      height: 100%;
      // padding-bottom: 60px;
    }
  }

  .user-list-container {
    .c-user-list__assets {
      color: @theme;
      font-size: 14px;
    }
  }
  .booking-list {
    // width: 75%;
    // height: 100%;
    padding: 0 16px;
    margin: 12px 0;
    background: #fff;

    li {
      padding: 20px 0;
      .flex-start();

      + li {
        .border-top();
      }

      &.status_4 {
        opacity: 0.5;
        border-color: rgba(0, 0, 0, 0.1);

        .stop .btn {
          border: 1rpx solid transparent;
          color: #ccc;
        }
      }
    }

    .img {
      img {
        display: block;
        .wh(60px);
      }
    }

    .text {
      height: 60px;
      width: 200px;
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

    .stop {
      padding: 0;
      .btn {
        background: #fff;
        border: 1rpx solid rgba(0, 0, 0, 0.1);
        color: @red;
      }
    }
  }

  // .empty {
  //   .img {
  //     display: block;
  //     .wh(190px);
  //     margin: 36px auto 5px auto;
  //     background: url(~@/assets/img/empty.png) center center no-repeat;
  //     background-size: contain;
  //   }

  //   .text {
  //     font-size: 16px;
  //     color: @gray;
  //     text-align: center;
  //   }
  // }

  .toggle-date {
    // position: fixed;
    // left: 0;
    // bottom: 0;
    // width: 100%;
    margin-top: 12px;


    height: 60px;
    .flex-between();
    background: #ffffff;
    box-shadow: inset 0 1px 0 0 rgba(0, 0, 0, 0.05);

    .prev,
    .next {
      padding: 0 10px;
      .flex-center();
      font-size: 14px;
      color: @gray;
      // span {
      //   margin: 0 8px;

      // }
    }

    .date-name {
      font-size: 18px;
    }
  }
}
</style>

