<template>
  <div class="page-user__feedback" v-if="isShowPage">
    <div class="feedback-content">
      <textarea v-model="feedbackContent" placeholder="请填写你想对我们说的话..."></textarea>
    </div>

    <div class="btn-group">
      <div class="btn" :class="{disabled: feedbackContent == ''}" @click="submit">提交</div>

      <!-- <div class="btn" v-if="feedbackContent != ''" @click="submit">提交</div>
      <div class="btn disabled" v-else>提交</div> -->
    </div>

    <popbox v-model="isShowPopbox" type="2" :popboxData="popboxData" @comfirm="back" ></popbox>
  </div>
  </div>
</template>

<script>
import utils from '@/utils'
import Popbox from '@/components/Popbox'

export default {
  data() {
    return {
      isShowPage: false,      // hack 按钮颜色由蓝变灰
      feedbackContent: '',

      isShowPopbox: false,
      popboxData: {
        title: '提交成功',
        content: '感谢您的反馈,反馈人数可能较多,我们将尽可能的进行回复,感谢您的谅解'
      }
    }
  },

  mounted() {
    this.isShowPage = true
  },

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
            this.isShowPopbox = true
          }
        }
      })
    },
    back() {
      this.isShowPopbox = false
      utils.sleep(wx.navigateBack)
    }
  },
  components: {Popbox}
}
</script>
<style lang="less">
@import '../../../../assets/css/mixin.less';
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

