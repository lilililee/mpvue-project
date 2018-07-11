<template>
  <div class="page-home__notice">
    <div class="notice-title">
      {{noticeInfo.title}}
    </div>

    <div class="notice-date">
      {{noticeInfo.date}}
    </div>

    <!-- <rich-text class="notice-content" :nodes="noticeInfo.content">

    </rich-text> -->

    <div class="notice-content" v-html="noticeInfo.content"></div>
  </div>
</template>

<script>
import utils from '@/utils'

export default {
  data() {
    return {
      noticeInfo: {},
      // testContent: '<p>asdasdsa</p><h1>h1h1h1h1h1</h1>'
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
        loading: true,
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
  padding: 24px 20px;

  .notice-title {
    font-size: 18px;
    text-align: center;
  }

  .notice-date {
    font-size: 12px;
    color: @gray;
    margin: 6px 0 24px 0;
    text-align: center;
  }

  .notice-content {
    font-size: 14px;
    
  }
}
</style>

