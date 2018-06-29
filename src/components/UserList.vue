<template>
  <div class="c-user-list ">
    <ul>
      <li class="user-item flex-center" v-for="item in userList" :key="item.id">
        <div class="img">
          <img :src="item.head_img" alt="">
        </div>

        <div class="info">
          <div class="top">
            <div class="name">{{item.name}}</div>
            <div class="role">{{item.role_name}}</div>
          </div>
          <div class="bottom">
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
    userList: Array
  },
  methods: {}
}
</script>

<style lang="less">
@import '../assets/css/mixin';
.c-user-list {
  .user-item {
    height: 132rpx;
    background: #fff;
    padding: 0 32rpx;

    + li {
      // border-top: 1px solid @borderColor;
      margin-top: 1px;
    }

    > div {
      height: 100%;
      .flex-center();
    }

    .info {
      .flex-start();
    }
  }

  .img {
    width: 72rpx;
    height: 72rpx;
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
  .assist {
    width: 20%;
  }
}
</style>
