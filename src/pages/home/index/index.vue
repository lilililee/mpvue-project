<template>
  <div class="page-home__index" @click="getCode">
      <div class="notice">
        home
      </div>
  </div>
</template>

<script>
import utils from '../../../utils'
export default {
  data() {
    return {
        homeInfo: {}
    }
  },

  created() {

  },

  methods: {
    getCode() {
      console.log(111)
      console.log(111)
      this.data = 112312
    },
    

   
  }

}
</script>
<style lang="less">
.page-home__index {
}
</style>

