<template>
  <div class="page-home__change_address">
    <ul class="address-list">
      <li v-for="(item ,index) in addressList" :key="index" @click="changeNowAddress(item)">
        <div class="name">{{item.address_name}}</div>
        <i v-show="item.address_id == nowUser.address_id" class="icon-true"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import utils from '@/utils'

export default {
  data() {
    return {
      addressList: []
    }
  },
  computed: {
    nowUser() {
      return this.$store.state.nowUser
    }
  },

  mounted() {
    this.getAddressList()
  },

  methods: {
    getAddressList() {
      utils.ajax({
        action: 'getAddressList',
        loading: true,
        success: res => {
          if (res.code == 0) {
            this.addressList = res.data.list
          }
        }
      })
    },
   
    changeNowAddress(item) {
      if (this.nowUser.address_id == item.address_id) return

      utils.ajax({
        action: 'getExceptTime',
        success: res => {
          if (res.code == 0) {
            
            this.$store.commit('updateNowUser', {
              ...this.nowUser,
              address_id: item.address_id,
              address_name: item.address_name,
              expect_time: res.data.expect_time
            })
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
.page-home__change_address {
  .address-list {
    background: #fff;
    padding: 0 16px;
    margin-top: 12px;
    li {
      .flex-between();
      .lh(48px);

      + li {
        .border-top();
      }

      .name {
        width: 80%;
        .limit;
      }
    }
  }
}
</style>

