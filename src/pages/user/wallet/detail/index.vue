<template>
  <div class="page-user__wallet__detail" :class="{'x-margin': isIphoneX}">
     
    <ul class="bill-list">
      <li v-for="(item, index) in billList" :key="index">
        <div class="left">
          <div class="title">{{item.title}}</div>
          <div class="date">{{item.date}}</div>
        </div>
        <div class="right credit" v-if="system=='company'">
          <div class="money">{{item.money}}</div>
          <div class="text" v-if="item.credit != '0'">积分抵扣 {{item.credit}} 分</div>
        </div>
        <div class="right" v-else>
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

    .money {
      font-size: 18px;
      text-align: right;
    }

    .credit {
      .money {
        font-size: 14px;
        line-height: 18px;
        margin-bottom: 5px;
      }

      .text {
        font-size: 12px;
        color: @red;
      }
    }
  }
}
</style>

