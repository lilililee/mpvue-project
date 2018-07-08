<template>
  <div class="page-home__chooseFood">

    <div class="booking-list-container">
      <ul class="booking-list">
        <li v-for="(item,index) in monthBooking" :key="index">
          <div class="year">{{item.year}}</div>
          <ul class="month-list flex">
            <li v-for="(sitem,sindex) in item.months" :key="sindex">
              <div class="status flex-center" :class="'status_' + sitem.status_id" @click="chooseMonth(sitem, item.year)">
                {{sitem.status_name}}
              </div>
              <div class="month" :class="{bind: sitem.is_bind=='1', prev:sitem.has_prev_bind,next:sitem.has_next_bind}">{{sitem.month_id}}月</div>
            </li>
          </ul>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import utils from '../../../utils'
import UserList from '../../../components/UserList'
import bookingList from '../../../components/bookingList'
export default {
  data() {
    return {
      monthBooking: []
    }
  },
  computed: {
    nowUser() {
      return this.$store.state.nowUser
    }
  },

  mounted() {
    wx.setNavigationBarTitle({
      title: this.$root.$mp.query.type == '1' ? '选择月份-加餐' : '选择月份-预订'
    })

    this.getMonthBooking()
  },

  methods: {
    getMonthBooking() {
      utils.ajax({
        action: 'getMonthBooking',
        data: {
          user_id: this.nowUser.user_id,
          type: this.$root.$mp.query.type,
          role_id: this.nowUser.role_id
        },
        loading: true,
        success: res => {
          if (res.code == 0) {
            res.data.list.forEach((item, index) => {
              item.months.forEach((sitem, sindex) => {
                let next = item.months[sindex + 1]
                if (sindex == item.months.length - 1 && res.data.list[index + 1]) {
                  next = res.data.list[index + 1].months[0]
                }
                if (next) {
                  // 第一个判断才为正确判断
                  // if (item.is_bind == '1' && next.is_bind == '1' && item.menu_id == next.menu_id) {
                  if (sitem.is_bind == '1' && next.is_bind == '1') {
                    // if (1) {
                    sitem.has_next_bind = true
                    next.has_prev_bind = (sindex + 1) % 4 == 0
                  } else {
                    sitem.has_next_bind = false
                    next.has_prev_bind = false
                  }
                }
              })
            })
            this.monthBooking = res.data.list
          }
        }
      })
    },
    chooseMonth(item, year) {
      if (['2', '4', '5'].indexOf(item.status_id) != -1) {
        let date = year + '-' + utils.formatNumber(item.month_id)

        wx.navigateTo({
          url: `/pages/home/chooseFood/main?menu_id=${item.menu_id}&date=${date}`
        })
      }
    }
  },
  components: {
    UserList,
    bookingList
  }
}
</script>
<style lang="less">
@import '../../../assets/css/mixin.less';
.page-home__chooseFood {
  .booking-list {
    padding: 0 16px;
    > li {
      margin-bottom: -12px;
    }

    .year {
      margin: 16px 0 12px 0;
      font-weight: bold;
      font-size: 18px;
      color: #000000;
    }

    .month-list {
      flex-wrap: wrap;
      text-align: center;
      > li {
        width: 21.5%;
        margin-right: 4.66%;
        // width: 76px;
        // margin-right: 16px;
        margin-bottom: 12px;
        &:nth-child(4n) {
          margin-right: 0;
        }
      }

      .status {
        .lh(40px);
        border-radius: 4px;
        background: #fff;
        font-size: 14px;

        &.status_1 {
          background: rgba(0, 0, 0, 0.02);
          color: @gray;
        }
        &.status_2 {
          color: @blue;
        }
        &.status_3 {
          color: #ff1744;
        }
        &.status_4 {
          color: #ae62f5;
        }
        &.status_5 {
          color: #ff7c00;
        }
        &.status_6 {
          color: @gray;
        }
      }

      .month {
        font-size: 12px;
        margin-top: 6px;
        color: @gray;
        position: relative;

        &.bind {
          color: #333;
        }
        &.prev {
          &::before {
            content: '';
            position: absolute;
            top: 2.5px;
            left: -35.5px;
            width: 56px;
            height: 9px;
            background: url(../../../assets/img/monthlink.png);
            background-size: cover;
          }
        }
        &.next {
          &::after {
            content: '';
            position: absolute;
            top: 2.5px;
            right: -35.5px;
            width: 56px;
            height: 9px;
            background: url(../../../assets/img/monthlink.png);
            background-size: cover;
          }
        }
      }
    }
  }
}
</style>

