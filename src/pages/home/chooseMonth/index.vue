<template>
  <div class="page-home__chooseFood">
    <div class="user-list-container">
      <user-list :userList="userList">
        <div class="c-user-list__assets flex-center">

        </div>
      </user-list>
    </div>

    <div class="booking-list-container">
      <booking-list type="1"></booking-list>
    </div>

  </div>
</template>

<script>
import utils from '../../../utils'
import UserList from '../../../components/UserList'
import bookingList from '../../../components/bookingList'
export default {
  data() {
    return {}
  },
  computed: {
    userList() {
      return [this.$store.state.nowUser]
    }
  },

  mounted() {},

  methods: {},
  components: {
    UserList,
    bookingList
  }
}
</script>
<style lang="less">
@import '../../../assets/css/mixin.less';
.page-home__chooseFood {
  .user-list-container {
    border-top: 1rpx solid @borderColor;
  }

  .booking-list {
    padding: 20rpx;

    .year {
      font-size: 40rpx;
      padding: 20rpx 0;
      font-weight: bold;
    }
    .month-list {
      flex-wrap: wrap;
      > li {
        width: 22%;
        margin-bottom: 10rpx;
        margin-right: 4%;
        &:nth-child(4n) {
          margin-right: 0;
        }
      }

      .status {
        height: 130rpx;

        background: #fff;

        &.status_2 {
          background: @blue;
          color: #fff;
        }
        &.status_3 {
          background: @blue;
          color: #fff;
        }
      }

      .month {
        font-size: 24rpx;
        text-align: center;
        line-height: 2.5;
      }
    }
  }
}
</style>

