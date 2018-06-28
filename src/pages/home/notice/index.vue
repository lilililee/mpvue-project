<template>
    <div class="page-home__notice">
        <div class="notice-title">
            {{noticeInfo.title}}
        </div>

        <div class="notice-date">
            {{noticeInfo.date}}
        </div>

        <rich-text class="notice-content" :nodes="ss">
         
        </rich-text>
    </div>
</template>

<script>
import utils from '@/utils'

export default {
  data() {
    return {
      noticeInfo: {},
      ss: '<p>asdasdsa</p><h1>h3h3h3h3h3</h1>'
    }
  },

  mounted() {
    this.getNoticeInfo()
  },

  methods: {
    getNoticeInfo() {
      utils.ajax({
        action: 'getNoticeInfo',
        data: {
          notice_id: this.$root.$mp.query.notice_id
        },
        success: res => {
          if (res.code == 0) {
            this.noticeInfo = res.data
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
.page-home__notice {
  padding-bottom: @bottomColumnHeight;
}
</style>

