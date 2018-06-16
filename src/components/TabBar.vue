<template>
  <ul class="tab-bar flex-around">
    <li :class="{active: page=='home'}">
      <div @click="to('home')">
        <div class="icon">icon</div>
        <div class="title">首页</div>
      </div>
    </li>
    <li :class="{active: page=='calendar'}">
      <div @click="to('calendar')">
        <div class="icon">icon</div>
        <div class="title">日历</div>
      </div>
    </li>
    <li :class="{active: page=='order'}">
      <div @click="to('order')">
        <div class="icon">icon</div>
        <div class="title">订单</div>
      </div>
    </li>
    <li :class="{active: page=='user'}">
      <div @click="to('user')">
        <div class="icon">icon</div>
        <div class="title">我</div>
      </div>
    </li>
  </ul>
</template>

<script>
import utils from '../utils'
export default {
  props: {
    page: String,
    default: ''
  },
  methods: {
    to(path) {
      if (!(this.page == path)) {
        wx.reLaunch({
          url: `/pages/${path}/index/main`
        })
      }
    }
  }
}
</script>

<style lang="less">
@import '../assets/css/mixin';
.tab-bar {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  padding: 10px;
  height: 70rpx;
  border-top: 1rpx solid @borderColor;

  > li {
    text-align: center;

    &.active {
      color: red;
    }
  }
}
</style>
