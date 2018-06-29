<template>
    <div class="page-calendar__index">

        <div class="user-list-container">
            <user-list :userList="userList" @assetsClick="toChooseMonth">
                <div class="c-user-list__assets flex-center">
                    切换用餐人
                </div>
            </user-list>
        </div>

        <div class="table calendar-table">
            <div class="table-header">
                <div class="tr">
                    <div class="td">周日</div>
                    <div class="td">周一</div>
                    <div class="td">周二</div>
                    <div class="td">周三</div>
                    <div class="td">周四</div>
                    <div class="td">周五</div>
                    <div class="td">周六</div>
                </div>
            </div>
            <div class="table-body">
                <template v-for="(item, index) in bookingStatus">
                    <div class="tr">
                        <div class="td" v-for="(sitem, sindex) in item" :key="sindex" :class="'status_' + sitem.status"> {{sitem.day}}</div>
                    </div>
                </template>
                <!-- <div class="tr"></div> -->
            </div>
        </div>

    </div>
</template>

<script>
import utils from '../../utils'
import UserList from '../UserList'
export default {
  data() {
    return {
      bookingStatus: [], // 会处理成 7 的整数，不属于当月的天的状态用 -1 表示
      todayIndex: -1, // 今天在bookingStatus的下标， -1表示今天不在该月
      nowMonth: utils.formatDate(new Date()).slice(0, 7) // 当前查看的月份
    }
  },
  computed: {
    userList() {
      return [this.$store.state.nowUser]
    },
    nowUser() {
      return this.$store.state.nowUser
    }
  },

  mounted() {
    this.getUserBookingStatus()
  },

  methods: {
    getUserBookingStatus() {
      utils.ajax({
        action: 'getUserBookingStatus',
        data: {
          date: this.nowMonth,
          user_id: this.nowUser.user_id,
          role_id: this.nowUser.role_id
        },
        success: res => {
          if (res.code == 0) {
            // 获取本月第一天是周几
            res.data.list = res.data.list.map((item, index) => ({
              status: item,
              day: String(index + 1),
              isToday: false
            }))

            let date = new Date()
            if (utils.formatDate(date).slice(0, 7) == this.nowMonth) {
              res.data.list[date.getDate() - 1] && (res.data.list[date.getDate() - 1].isToday = true)
            }
            let week = new Date(this.nowMonth + '-01').getDay()
            let beforeDays = week

            console.log('beforeDays', beforeDays)
            for (let i = 0; i < beforeDays; i++) {
              res.data.list.unshift({
                status: 0,
                day: '-1',
                isToday: false
              })
            }

            let afterDays = (7 - res.data.list.length % 7) % 7
            console.log('afterDays', afterDays)
            for (let i = 0; i < afterDays; i++) {
              res.data.list.push({
                status: 0,
                day: '-1',
                isToday: false
              })
            }

            let tempCount = 1
            let result = []
            while (tempCount * 7 <= res.data.list.length) {
              result.push(res.data.list.slice((tempCount - 1) * 7, tempCount * 7))
              tempCount++
            }

            this.bookingStatus = result

            console.log('bookingStatus', this.bookingStatus)
            console.log('todayIndex', this.todayIndex)
          }
        }
      })
    },
    changeMonth(num) {
      let date = this.nowMonth.split('-')
      this.nowMonth = utils.formatDate(new Date(date[0], date[1] + num - 1)).slice(0, 7)
    }
  },
  components: {
    UserList
  }
}
</script>
<style lang="less">
@import '../../assets/css/mixin.less';
.page-calendar__index {
  .calendar-table {
    border-top: 1rpx solid @borderColor;
    border-left: 1rpx solid @borderColor;
    .tr {
      .flex();
    }

    .td {
      border-right: 1rpx solid @borderColor;
      border-bottom: 1rpx solid @borderColor;
      .flex-center();
      width: 14.2857%; // 1/ 7
      height: 80rpx;

      &.status_1 {
        background: #eee;
      }
      &.status_2 {
        background: #b3ccff;
      }
      &.status_3 {
        background: @blue;
      }
    }
  }
}
</style>

