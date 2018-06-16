<template>
  <div class="page-home__index" @click="getCode">
    home{{data}}
  </div>
</template>

<script>
import utils from '../../../utils'
export default {
  data() {
    return {
        data: 'data'
    }
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

