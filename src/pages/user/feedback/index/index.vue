<template>
  <div class="page-user__feedback_index" :class="{'x-border-transparent': isIphoneX}">
    <a class="to-feedback" href="/pages/user/feedback/submitFeedback/main" hover-class="none">
      我要反馈问题
    </a>

    <ul class="feedback-list">
      <li v-for="(item,index) in feedbackList" :key="index" @click="toFeedbackDetailPage(item)">
        <div class="title">
          <div class="date-time">{{item.date_time}}</div>
          <div class="text" v-if="item.is_reply=='1'">有回复</div>
        </div>

        <div class="content">{{item.content}}</div>
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
      feedbackList: [],
      page: 1,
      isOver: false
    }
  },

  onShow() {
    this.page = 1
    this.feedbackList = []
    this.getFeedbackList()
  },

  onReachBottom() {
    !this.isOver && this.getFeedbackList()
  },

  mounted() {},

  methods: {
    getFeedbackList() {
      utils.ajax({
        action: 'getFeedbackList',
        data: {
          page: this.page
        },
        success: res => {
          if (res.code == 0) {
            if (res.data.list.length < 10) {
              this.isOver = true
            }
            this.page++
            this.feedbackList = this.feedbackList.concat(res.data.list)
          }
        }
      })
    },

    toFeedbackDetailPage(item) {
      wx.navigateTo({
        url: `/pages/user/feedback/feedbackDetail/main?feedback_item=${JSON.stringify(item)}`
      })
    }
  },
  components: { LoadingTip }
}
</script>
<style lang="less">
@import '../../../../assets/css/mixin.less';

.page-user__feedback_index {
  .to-feedback {
    display: block;
    .lh(48px);
    text-align: center;
    background: #fcfcfe;
    margin-bottom: 12px;
  }

  .feedback-list {
    background: #fff;
    line-height: 20px;
    li {
      padding: 12px 16px;

      & + li {
        .border-top();
      }
    }

    .title {
      .flex-between();
      margin-bottom: 6px;

      .text {
        color: @theme;
      }
    }

    .content {
      color: #666;
      .limit();
    }
  }
}
</style>

