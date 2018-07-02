<template>
    <div class="page-user__wallet">
       sss
    </div>
</template>

<script>
import utils from '@/utils'

export default {
  data() {
    return {
     
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
.page-user__wallet {

  
}
</style>

