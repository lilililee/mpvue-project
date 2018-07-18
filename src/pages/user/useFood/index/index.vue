<template>
  <div class="page-user__userFood__index">
    <div @click="toAddUserPage" class="add-user">+ 添加用餐人</div>
    <user-list :userData="userList" @assistClick="deleteUser">
      <div class="c-user-list__assets flex-center">
        删除
      </div>
    </user-list>

    <popbox v-model="isShowDelatePopbox" :popboxData="popboxData" @comfirm="comfirmDelete"></popbox>
  </div>
</template>

<script>
import utils from '@/utils'
import UserList from '@/components/UserList'
import Popbox from '@/components/Popbox'

export default {
  data() {
    return {
      userList: [],
      isShowDelatePopbox: false,

      deleteUserIndex: -1,

      popboxData: {
        title: '确认删除',
        content: '删除后将不可对该成员进行订餐补餐等操作'
      }
    }
  },
  onShow(){
    this.getUserList()
  },

  mounted() {
  },

  methods: {
    getUserList() {
      utils.ajax({
        action: 'getUserList',
        success: res => {
          if (res.code == 0) {
            this.userList = res.data.list
            this.$store.commit('updateNowUser', this.userList[0] || {})
          }
        }
      })
    },
    deleteUser(user, index) {
      this.isShowDelatePopbox = true
      this.deleteUserIndex = index
    },
    comfirmDelete() {
      utils.ajax({
        action: 'deleteUser',
        method: 'POST',
        data: {
          user_id: this.userList[this.deleteUserIndex].user_id,
          role_id: this.userList[this.deleteUserIndex].role_id
        },
        success: res => {
          if (res.code == 0) {
            this.isShowDelatePopbox = false
            this.userList.splice(this.deleteUserIndex, 1)
            if(this.userList.length == 0) {
              this.$store.commit('updateNowUser', {})
            }
          }
        }
      })
    },
    toAddUserPage() {
      wx.navigateTo({
        url: `/pages/user/useFood/addUser/main`
      })
    }
  },
  components: {
    UserList,
    Popbox
  }
}
</script>
<style lang="less">
@import '../../../../assets/css/mixin.less';
.page-user__userFood__index {
  .add-user {
    display: block;
    background: #fff;
    border: 1rpx solid @borderColor;
    text-align: center;
    .lh(48px);
    margin-bottom: 12px;
  }

  .c-user-list__assets {
    color: @red;
  }
}
</style>

