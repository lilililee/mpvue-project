<template>
  <div class="c-user-list ">
    <ul>
      <li class="user-item flex-center" v-for="item in userList" :key="item.id">
        <div class="img">
          <img :src="item.head_img" alt="">
        </div>
        <div class="name">
          {{item.name}}
        </div>
        <div class="info">
          <div class="role">{{item.role_name}}</div>
          <div class="address" v-if="item.address_name">{{item.address_name}}</div>
        </div>
        <div class="assets" @click="$emit('assetsClick', item)">
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
    userList: Array,
    
  },
  methods: {}
}
</script>

<style lang="less">
@import '../assets/css/mixin';
.c-user-list {

  .user-item {
    height: 140rpx;
    background: #fff;

    + li {
      margin-top: 20rpx;
    }

    > div {
      height: 100%;
      .flex-center();
    }

    .info {
      .flex-start()
    }
  }

  .img {
    width: 15%;
box-sizing: border-box;
    img {
      width: 60rpx;
      height: 60rpx;
      border-radius: 50%;
    }
  }

  .name {
    width: 25%;
  }
  .info {
    width: 40%;
    paddding-left: 20rpx;

    .role {

    }

    .address {
      margin-top: 20rpx;
    }
  }
  .assets {
    width: 20%;
  }
}
</style>
