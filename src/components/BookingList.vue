<template>
  <ul class="c-booking-list">
    <li v-for="(item,index) in monthBooking" :key="index">
      <div class="year">{{item.year}}年</div>
      <ul class="month-list flex">
        <li v-for="(sitem,sindex) in item.months" :key="sindex">
          <div class="status flex-center" :class="'status_' + sitem.status_id" @click="chooseMonth(sitem, item.year)">
            <!-- <template v-if="sitem.status_name.length==6"> -->
            <!-- 不支持复杂表达式,待处理 -->
            <!-- <div>{{sitem.status_name.slice(0,2)}}{{ss()}}</div>
                  <div>{{sitem.status_name.slice(2)}}</div> -->
            <!-- {{sitem.status_name}}
              </template>
              <template v-else>
                {{sitem.status_name}}
              </template> -->

            {{sitem.status_name}}{{sitem.status_id}}
          </div>
          <div class="month">{{sitem.month_id}}</div>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import utils from '../utils'
export default {
  props: {
    // type: String,
    monthBooking: Array
  },
  computed: {
    nowUser() {
      return this.$store.state.nowUser
    }
  },
  data() {
    return {
     
    }
  },
  methods: {
    chooseMonth(item, year) {
      this.$emit('chooseMonth', item, year)
    }
  }
}
</script>

<style lang="less">
@import '../assets/css/mixin';
.c-booking-list {
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

      &.status_1 {
        background: @blue;
        color: #fff;
      }
      &.status_2 {
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
</style>
