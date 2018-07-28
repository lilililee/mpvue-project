<template>
  <div class="page-user__feedback" v-if="isShowPage">
    <form @submit="formSubmit" report-submit>
      <div class="feedback-content">
        <textarea name="feedback-content" v-model="feedbackContent" placeholder="请填写你想对我们说的话..."></textarea>
      </div>

      <div class="btn-group">
        <button class="btn" :class="{disabled: feedbackContent == ''}" form-type="submit" plain>提交</button>
        <!-- <div class="btn" :class="{disabled: feedbackContent == ''}" @click="submit">提交</div> -->
      </div>
    </form>

    <popbox v-model="isShowPopbox" type="2" :popboxData="popboxData" @comfirm="back"></popbox>

    <company-copyright></company-copyright>
  </div>
  </div>
</template>

<script>
import utils from '@/utils'
import Popbox from '@/components/Popbox'
import CompanyCopyright from '@/components/CompanyCopyright'

export default {
  data() {
    return {
      isShowPage: false, // hack 按钮颜色由蓝变灰
      feedbackContent: '',
      formId: '',

      isShowPopbox: false,
      popboxData: {
        title: '提交成功',
        content: '感谢您的反馈,反馈人数可能较多,我们将尽可能的进行回复,感谢您的谅解'
      }
    }
  },

  mounted() {
    this.feedbackContent = ''
    this.isShowPage = true
  },

  methods: {
    formSubmit(e) {
      this.formId = e.target.formId
      this.submit()
    },
    submit() {
      if (this.feedbackContent == '') return
      utils.ajax({
        action: 'submitFeedback',
        method: 'POST',
        data: {
          content: this.feedbackContent,
          form_id: this.formId
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
  components: { Popbox, CompanyCopyright }
}
</script>
<style lang="less">
@import '../../../../assets/css/mixin.less';
page {
  background: #fff;
}
.page-user__feedback {
  .full-page();
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

