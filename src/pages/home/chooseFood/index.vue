<template>
  <div class="page-home__chooseFood">
    <div class="user-info flex-center">
      <div class="title">订餐人：</div>
      <div class="user">{{nowUser.name}}({{nowUser.role_name}})</div>
    </div>
    
  </div>
</template>

<script>
import utils from '../../../utils'

export default {
  data() {
    return {
      foodList: []
    }
  },
  computed: {
    nowUser() {
      return this.$store.state.nowUser
    }
  },

  mounted() {
    this.getFoodList()
    // console.log(this.$root.$mp)
  },

  methods: {
    getFoodList() {
      utils.ajax({
        action: 'getFoodList',
        data: {
          user_id: this.nowUser.user_id,
          role_id: this.nowUser.role_id,
          ...this.$root.$mp.query
        },
        success: res => {
          if (res.code == 0) {
            this.foodList = res.data.list
          }
        }
      })
    },
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

