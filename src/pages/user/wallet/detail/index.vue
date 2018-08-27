<template>
  <div class="page-user__wallet__detail" :class="{'x-border-transparent': isIphoneX}">
     
    <ul class="bill-list">
      <li v-for="(item, index) in billList" :key="index">
        <div class="left">
          <div class="title">{{item.title}}</div>
          <div class="date">{{item.date}}</div>
        </div>
        
        <div class="right" >
          <div class="money">{{item.money}}</div>
        </div>
      </li>
    </ul>

    <loading-tip :isOver="isOver"></loading-tip>
  </div>
</template>

<script>
import utils from '@/utils'
import LoadingTip from '@/components/LoadingTip'

export default {
  data() {
    return {
      isIphoneX: utils.isIphoneX,
      system: utils._config.system,
      billList: [],
      page: 1,
      isOver: false
    }
  },

  onReachBottom() {
    !this.isOver && this.getBillList()
  },

  mounted() {
    this.billList = []
    this.page = 1
    this.isOver = false
    this.getBillList()
  },

  methods: {
    getBillList() {
      utils.ajax({
        action: 'getBillList',
        data: {
          page: this.page
        },
        success: res => {
          if (res.code == 0) {
            if (res.data.list.length < 10) {
              this.isOver = true
            }
            this.page++
            this.billList = this.billList.concat(res.data.list)
          }
        }
      })
    }
  },
  components: {LoadingTip}
}
</script>
<style lang="less">
@import '../../../../assets/css/mixin.less';

.page-user__wallet__detail {
  .bill-list {
    background: #fff;
    li {
      height: 66px;
      .flex-between();
      padding: 0 16px;

      & + li {
        .border-top();
      }
    }
    .title {
      line-height: 16px;
      margin-bottom: 7px;
    }

    .date {
      font-size: 12px;
      color: @gray;
    }

    .right {
      font-size: 16px;
      text-align: right;
    }

    // .credit {
    //   .money {
    //     font-size: 14px;
    //     line-height: 18px;
    //     margin-bottom: 5px;
    //   }

    //   .text {
    //     font-size: 12px;
    //     color: @red;
    //   }
    // }
  }
}
</style>

