<template>
  <div class="page-protocol__index">
    <rich-text :nodes="protocolInfo.content">
    </rich-text>
  </div>
</template>

<script>
import utils from '../../../utils'
export default {
  data() {
    return {
      protocolInfo: {},
      
    }
  },
  mounted() {
    this.getProtocolInfo()
  },
  methods: {
    getProtocolInfo() {
      utils.ajax({
        action: 'getProtocolInfo',
        data: {
        },
        loading:true,
        success: res => {
          if (res.code == 0) {
            this.protocolInfo = res.data
          }
        }
      })
    }
  }
}
</script>
<style lang="less">
page {
    background: #fff;
}
.page-protocol__index {
  line-height: 48rpx;
}
</style>

