<template>
  <div class="page-calendar__index">
    calendar__index
    <!-- <tab-bar page="calendar"></tab-bar> -->
  </div>
</template>

<script>
import utils from '../../utils'
// import TabBar from '../../../components/TabBar'
export default {
  data() {
    return {
      homeInfo: {}
    }
  },

  mounted() {
    this.getHomeInfo()
  },

  methods: {
    getHomeInfo() {
      utils.ajax({
        action: 'getHomeInfo',
        success: res => {
          if (res.code == 0) {
            this.homeInfo = res.data
          }
        }
      })
    }
  },
  components: {
    // TabBar
  }
}
</script>
<style lang="less">
.page-calendar__index {
  
}
</style>

