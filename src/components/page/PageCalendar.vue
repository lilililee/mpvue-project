<template>
  <div class="page-calendar__index">
    <div class="page-calendar__index__container">
      <div class="user-info">
        <div class="date">
          <div class="month">{{today.month}}月</div>
          <div class="other">
            <div class="year">{{today.year}}年</div>
            <div class="day">{{today.day}}日
              <span>今天</span>
            </div>
          </div>
        </div>
        <div class="user" @click="isShowListPicker= true">
          <div class="name">{{nowUser.name}}</div>
          <div class="icon">▾</div>
        </div>

      </div>

      <div class="table calendar-table">
        <div class="table-header">
          <div class="tr">
            <div class="td">日</div>
            <div class="td">一</div>
            <div class="td">二</div>
            <div class="td">三</div>
            <div class="td">四</div>
            <div class="td">五</div>
            <div class="td">六</div>
          </div>
        </div>
        <div class="table-body">
          <div class="tr" v-for="(item, index) in bookingStatus" :key="index">
            <div class="td" v-for="(sitem, sindex) in item" :key="sindex" :class="{disabled:!sitem.isNowMonth,today:sitem.isToday}" @click="toBookingList(sitem)">

              <span> {{sitem.day}}</span>
              <!-- 1未订餐 2已订餐 3已完成 -->
              <div class="status-name" v-if="sitem.status_id!=='1'">  
                <i class="point" v-if="sitem.status_id=='2'"></i>
                <span>{{sitem.status_name}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="switch-month">
        <div class="prev" @click="changeMonth(-1)">
          <i class="icon icon-prev">左</i>
          <span>上个月</span>
        </div>
        <div class="next" @click="changeMonth(1)">
          <span>下个月</span>
          <i class="icon icon-next">右</i>
        </div>
      </div>
    </div>

    <list-picker v-model="isShowListPicker" :list="userList" @comfirm="comfirmUser"></list-picker>

  </div>
</template>

<script>
import utils from '../../utils'
import UserList from '../UserList'
import ListPicker from '../ListPicker'
export default {
  data() {
    return {
      bookingStatus: [], // 会处理成 7 的整数，不属于当月的天的状态用 -1 表示

      userList: [],
      today: {},
      nowMonth: '',
      isShowListPicker: false,
     

      
    }
  },
  computed: {
    nowUser() {
      return this.$store.state.nowUser
    }
  },

  mounted() {
    this.initToday()
    this.getUserList()

    
  },

  methods: {
    initToday() {
      let date = new Date()
      this.today.date = utils.formatDate(date)
      this.today.year = String(date.getFullYear())
      this.today.month = String(date.getMonth() + 1)
      this.today.day = String(utils.formatNumber(date.getDate()))

      this.nowMonth = this.today.date.slice(0, 7)
    },
    getUserList() {
      utils.ajax({
        action: 'getUserList',
        success: res => {
          if (res.code == 0) {
            this.userList = res.data.list
            this.$store.commit('updateNowUser', this.userList[0])
            this.getUserBookingStatus()
          }
        }
      })
    },
    getUserBookingStatus() {
      utils.ajax({
        action: 'getUserBookingStatus',
        data: {
          date: this.nowMonth,
          user_id: this.nowUser.user_id,
          role_id: this.nowUser.role_id
        },
        loading:true,
        success: res => {
          if (res.code == 0) {
            // 加入状态参数
            res.data.list.forEach(item => {
              item.day = String(parseInt(item.date.slice(-2)))  
              item.isNowMonth = item.date.slice(0, 7) == this.today.date.slice(0, 7)
              item.isToday = item.date == this.today.date
            })

            // 转化成二元数组
            let tempCount = 1
            let result = []
            while (tempCount * 7 <= res.data.list.length) {
              result.push(res.data.list.slice((tempCount - 1) * 7, tempCount * 7))
              tempCount++
            }

            this.bookingStatus = result
          }
        }
      })
    },
    comfirmUser(item, index) {
      this.$store.commit('updateNowUser', this.userList[index])
      this.nowMonth = this.today.date.slice(0, 7)
      this.getUserBookingStatus()
    },
    changeMonth(num) {
      let date = this.nowMonth.split('-')
      this.nowMonth = utils.formatDate(new Date(date[0] * 1, date[1] * 1 + num - 1)).slice(0, 7)
      this.getUserBookingStatus()
    },

    toBookingList(item) {
      wx.navigateTo({
        url: `/pages/calendar/bookingList/main?empty=${item.status_id=='1'}&date=${item.date}`
      })
    }
  },
  components: {
    UserList,
    ListPicker
  }
}
</script>
<style lang="less">
@import '../../assets/css/mixin.less';

.page-calendar__index {
  .page-calendar__index__container {
   .full-page();
    background: #fff;
  }
  .user-info {
    .flex-between();
    color: #fff;
    padding: 0 28px;
    height: 54px;
    background: @blue;

    .date {
      .flex-start();
      width: 200px;
    }

    .month {
      font-size: 30px;
      margin-right: 6px;
    }

    .other {
      font-size: 10px;
      .day {
        margin-top: 7px;
      }
    }

    .user {
      .flex-end();
      font-size: 16px;
    }
  }
  .calendar-table {
    .table-header {
      background: @blue;
      color: #fff;
      font-size: 10px;
      height: 46px;
    }
    .table-body {
      color: #333;
    }

    .tr {
      .flex-center();
      overflow: hidden;
    }

    .td {
      .flex-center();
      width: 44px; // 1/ 7
      height: 44px;
      margin: 8px 3px;
      text-align: center;

      &.status_1 {
        .status-name {
          display: none;
        }
      }
      &.status_2 {
      }
      &.status_3 {
      }
    }

    .table-body {
      .td {
        position: relative;
        border: 1rpx solid transparent;
        border-radius: 50%;

        .status-name {
          position: absolute;
          width: 100%;
          left: 0;
          bottom: 0;
          font-size: 9px;
          color: #aaaaaa;
          .flex-center();

          .point {
            display: inline-block;
            .wh(4px);
            background: @blue;
            border-radius: 50%;
            margin-right: 3px;
          }
        }

        &.disabled {
          color: #ccc;
        }

        &.today {
          border-color: @blue;
          background: @blue;
          color: #fff;

          .status-name {
            display: none;
          }
        }

        &.border-gray {
          border: 1rpx solid rgba(0, 0, 0, 0.1);
        }
      }
    }
  }

  .switch-month {
    padding: 0 30px;
    margin-top: 24px;
    font-size: 14px;
    color: @gray;
    .flex-between();

    .prev,
    .next {
      width: 50%;
    }

    .prev {
      .flex-start();
    }

    .next {
      .flex-end();
    }

    span {
      margin: 0 8px;
    }
  }
}
</style>

