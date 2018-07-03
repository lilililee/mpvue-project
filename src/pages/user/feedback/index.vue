<template>
  <div class="page-user__feedback">
    <div class="feedback-content">
      <textarea v-model="feedbackContent" placeholder="请填写你想对我们说的话..."></textarea>
    </div>

    <div class="btn-group">
      <div class="btn" :class="{disabled: feedbackContent == ''}" @click="submit">提交</div>
    </div>
  </div>
</template>

<script>
import utils from '@/utils'

export default {
  data() {
    return {
      feedbackContent: ''
    }
  },

  mounted() {},

  methods: {
    submit() {
      if (this.feedbackContent == '') return
      utils.ajax({
        action: 'submitFeedback',
        method: 'POST',
        data: {
          content: this.feedbackContent
        },
        success: res => {
          if (res.code == 0) {
            utils.showSuccessMsg('提交成功', wx.navigateBack)
          }
        }
      })
    }
  },
  components: {}
}
</script>
<style lang="less">
@import '../../../assets/css/mixin.less';
page {
  background: #fff;
}
.page-user__feedback {
  .feedback-content {
    height: 141px;
    margin-top: 20px;
    margin-bottom: 36px;

    textarea {
      display: block;
      margin: auto;
      width: 335px;
      border-radius: 4px;
      padding: 12px 14px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      font-size: 16px;
      // color: #b2b2b2;
      line-height: 24px;
    }
  }
}
</style>

