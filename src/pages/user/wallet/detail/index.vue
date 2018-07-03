<template>
    <div class="page-user__detail">
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
    </div>
</template>

<script>
import utils from '@/utils'

export default {
  data() {
    return {
      billList: []
    }
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
            this.billList = res.data.list
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

.page-user__detail {
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
}
</style>

