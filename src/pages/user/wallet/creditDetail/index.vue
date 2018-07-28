<template>
  <div class="page-user__wallet_credit_detail" :class="{'x-margin': isIphoneX}">
     
    <ul class="credit-list">
      <li v-for="(item, index) in creditList" :key="index">
        <div class="left">
          <div class="title">{{item.title}}</div>
          <div class="date">{{item.date}}</div>
        </div>
     
        <div class="right">
          <div class="money">{{item.credit}}分</div>
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
      creditList: [],
      page: 1,
      isOver: false
    }
  },

  onReachBottom() {
    !this.isOver && this.getCreditList()
  },

  mounted() {
    this.page = 1
    this.creditList = []
    this.getCreditList()
  },

  methods: {
    getCreditList() {
      utils.ajax({
        action: 'getCreditList',
        data: {
          page: this.page
        },
        success: res => {
          if (res.code == 0) {
            if (res.data.list.length < 10) {
              this.isOver = true
            }
            this.page++
            this.creditList = this.creditList.concat(res.data.list)
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

.page-user__wallet_credit_detail {
  .credit-list {
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

