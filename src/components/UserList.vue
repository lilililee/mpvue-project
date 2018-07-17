<template>
    <div class="c-user-list ">
        <ul>
            <li class="user-item flex-start" v-for="(item,index) in userList" :key="item.id">
                <div class="img">
                    <img :src="item.head_img" alt="">
                </div>

                <div class="info">
                    <div class="top">
                        <div class="name">{{item.name}}</div>
                        <div class="c-role" :class="'role_' + item.role_id">{{item.role_name}}</div>
                    </div>
                    <div class="bottom" v-if="isShowAddress">
                        <div class="address" v-if="item.address_name">{{item.address_name}}</div>
                    </div>
                </div>

                <div class="assist" @click="$emit('assistClick', item, index)" v-if="isUseAssist">
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
    userData: [Array, Object],
    isUseAssist: {
        type: Boolean,
        default: true
    },
    default: []
  },
  data() {
    return {
      isShowAddress: true
    }
  },

  computed: {
    userList() {
      if (Array.isArray(this.userData)) {
        this.isShowAddress = false
        return this.userData
      } else {
        return [this.userData]
      }
    }
  },
  mounted() {
  },
  methods: {}
}
</script>

<style lang="less">
@import '../assets/css/mixin';
// 提取到css文件下
</style>
