<template>
  <div class="page-home__change_address">
    <ul class="address-list">
      <li v-for="(item ,index) in addressList" :key="index" @click="changeNowAddress(item)">
        <div class="name">{{item.address_name}}</div>
        <i v-show="item.address_id == companyNowUser.address_id" class="icon-true"></i>
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
    companyNowUser() {
      return this.$store.state.companyNowUser
    }
  },

  mounted() {
    this.getAddressList()
  },

  methods: {
    getAddressList() {
      utils.ajax({
        action: 'getAddressList',
        data: {},
        loading: true,
        success: res => {
          if (res.code == 0) {
            this.addressList = res.data.list
          }
        }
      })
    },
    updateCompanyNowUser(item) {
      // 更新user信息
      this.$store.commit('updateCompanyNowUser', {
        ...this.companyNowUser,
        address_id: item.address_id,
        address_name: item.address_name
      })
    },
    changeNowAddress(item) {
      if (this.companyNowUser.address_id == item.address_id) return

      if (this.$root.$mp.query.type == 'xdAddress') {
        this.updateCompanyNowUser(item)
      }

      if (this.$root.$mp.query.type == 'calendar') {
        utils.ajax({
          action: 'changeUserAddress',
          method: 'POST',
          data: {
            user_id: this.companyNowUser.user_id,
            role_id: this.companyNowUser.role_id,
            date: this.$root.$mp.query.date,
            address_id: item.address_id
          },
          success: res => {
            this.updateCompanyNowUser(item)
          }
        })
      } else if (this.$root.$mp.query.type == 'order') {
        utils.ajax({
          action: 'changeOrderAddress',
          method: 'POST',
          data: {
            user_id: this.companyNowUser.user_id,
            role_id: this.companyNowUser.role_id,
            order_id: this.$root.$mp.query.order_id,
            address_id: item.address_id
          },
          success: res => {
            this.updateCompanyNowUser(item)
          }
        })
      }
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

