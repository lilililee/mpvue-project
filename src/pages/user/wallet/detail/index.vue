<template>
  <div class="page-user__wallet__detail">
     
    <ul class="bill-list">
      <li v-for="(item, index) in billList" :key="index">
        <div class="left">
          <div class="title">{{item.title}}</div>
          <div class="date">{{item.date}}</div>
        </div>
        <div class="right">
          <div class="money">{{item.money}}</div>
        </div>
      </li>
    </ul>

    <div class="loading-tip">
      <div v-if="isOver">没有更多了</div>
      <div v-else><img src="../../../../assets/img/loading.svg" alt="">加载中</div>
    </div>
  </div>
</template>

<script>
import utils from '@/utils'

export default {
  data() {
    return {
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
        data: {},
        success: res => {
          if (res.code == 0) {
            if (res.data.list < 10) {
              this.isOver = true
            }
            this.page++
            this.billList = this.billList.concat(res.data.list)
          }
        }
      })
    }
  },
  components: {}
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
    }
  }

  .loading-tip {
    padding: 12px 0;
    font-size: 12px;
    color: @gray;
    text-align: center;

    img {
      width: 12px;
      height: 12px;
      margin-right: 8px;
      vertical-align: middle;
    }
  }
}
</style>

