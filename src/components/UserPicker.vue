<template>
  <div class="c-user-picker" :class="{show:value}">
    <div class="content" :class="{show:value}">
      <div class="btns">
        <div class="cancle" @click="cancle">取消</div>
        <div class="comfirm" @click="comfirm">确定</div>
      </div>
      <picker-view indicator-style="height: 40px;" style="width: 100%; height: 210px;" @change="bindChange">
        <picker-view-column>
          <view style="line-height: 40px" v-for="(item,index) in userList" :key="index">{{item.name}}</view>
        </picker-view-column>
      </picker-view>
    </div>
  </div>
</template>

<script>
import utils from '../utils'
export default {
  props: {
    userList: Array,
    value: Boolean
  },
  data() {
    return {
      userIndex: 0,
     
    }
  },
  mounted() {
   
  },
  methods: {
    bindChange(e) {
      this.userIndex = e.mp.detail.value[0]
    },
    cancle() {
      this.$emit('input', false)
    },
    comfirm() {
      this.$emit('comfirm', this.userIndex)
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="less">
@import '../assets/css/mixin';
.c-user-picker {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 500;
  background: rgba(0, 0, 0, 0.5);
  visibility: hidden;
  opacity: 0;
  transition: .3s;

  &.show{
    opacity: 1;
    visibility: visible;
  }

  .content {
    position: absolute;
    width: 100%;
    bottom: 0;
    background: #fff;
    transform: translateY(250px);
    transition: 0.3s;

    &.show {
      transform: translateY(0);
    }
  }

  .btns {
    .flex-between();
    .lh(40px);
    padding: 0 16px;
    color: gray;
    border-bottom: 1rpx solid @borderColor;
    background: #fbf9fe;

    .comfirm {
      color: @blue;
    }
  }

  picker-view-column {
    view {
      color: #333;
      text-align: center;

      height: 40px !important;
      line-height: 40px !important;
    }
  }
}
</style>
