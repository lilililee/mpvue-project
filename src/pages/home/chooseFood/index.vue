<template>
  <div class="page-home__chooseFood">
    
    sas

  </div>
</template>

<script>
import utils from '../../../utils'

export default {
  data() {
    return {
      
    }
  },
  computed: {
    nowUser() {
      return this.$store.state.nowUser
    }
  },

  mounted() {
    // this.getMonthBooking()
  },

  methods: {
    // getMonthBooking() {
    //   utils.ajax({
    //     action: 'getMonthBooking',
    //     data: {
    //       user_id: this.userList[0].user_id,
    //       type: '1',
    //       role_id: this.userList[0].role_id
    //     },
    //     success: res => {
    //       if (res.code == 0) {
    //         this.monthBooking = res.data.list
    //       }
    //     }
    //   })
    // },
    // chooseFood(item) {
      
    // }
  },
  components: {
    // UserList,
    // MonthList
  }
}
</script>
<style lang="less">
@import '../../../assets/css/mixin.less';
.page-home__chooseFood {
  .user-list-container {
    border-top: 1rpx solid @borderColor;
  }

  
}
</style>

