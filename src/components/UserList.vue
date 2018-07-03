<template>
    <div class="c-user-list ">
        <ul>
            <li class="user-item flex-start" v-for="item in userList" :key="item.id">
                <div class="img">
                    <img :src="item.head_img" alt="">
                </div>

                <div class="info">
                    <div class="top">
                        <div class="name">{{item.name}}</div>
                        <div class="role">{{item.role_name}}</div>
                    </div>
                    <div class="bottom" v-if="isShowAddress">
                        <div class="address" v-if="item.address_name">{{item.address_name}}</div>
                    </div>
                </div>

                <div class="assist" @click="$emit('assistClick', item)">
                    <slot></slot>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import utils from '../utils'
export default {
  props: {
    userData: [Array, Object]
  },
  data: {
    userList: [],
    isShowAddress: true
  },
  mounted() {
    // 当为用户列表时不展示地址
    if (Array.isArray(userData)) {
      this.isShowAddress = false
      this.userList = this.userData
    } else {
      this.userList = [this.userData]
    }
  },
  methods: {}
}
</script>

<style lang="less">
@import '../assets/css/mixin';
// 提取到css文件下
</style>
