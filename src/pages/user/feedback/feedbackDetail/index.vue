<template>
  <div class="page-user__feedback_detail">
    <div class="content">
      <div class="feedback-content">
        <div class="title">反馈</div>
        <div class="text">{{feedbackInfo.content}}</div>
      </div>
      <div class="replay-content" v-if="feedbackInfo.is_reply == '1'">
        <div class="title">回复</div>
        <div class="text">{{feedbackInfo.reply_content}}</div>
      </div>
    </div>

    <div class="date-time">{{feedbackInfo.date_time}}</div>
  </div>
</template>

<script>
import utils from '@/utils'

export default {
  data() {
    return {
      feedbackInfo: {}
    }
  },

  mounted() {
    this.feedbackInfo = JSON.parse(this.$root.$mp.query.feedback_item)
  },

  methods: {},
  components: {}
}
</script>
<style lang="less">
@import '../../../../assets/css/mixin.less';

.page-user__feedback_detail {
  .content {
    margin: 14px 0;
    padding: 16px 16px 25px;
    background: #fff;
  }

  .title {
    line-height: 20px;
    color: @gray;
    margin-bottom: 12px;
  }

  .text {
    line-height: 22px;
  }

  .replay-content {
    margin-top: 32px;
  }

  .date-time {
    text-align: right;
    padding-right: 16px;
  }
}
</style>

