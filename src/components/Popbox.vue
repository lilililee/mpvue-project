<template>
  <div class="c-popbox" :class="{show: value}">
    <div class="popbox-container" :class="{show: value}">
      <div class="title">{{popboxData.title}}</div>
      <div class="content">
        {{popboxData.content}}
      </div>
      <div class="btns" v-if="type=='2'">
        <div class="comfirm" @click="comfirm">知道了</div>
      </div>
      <div class="btns" v-else>
        <div class="left" @click="cancel">取消</div>
        <div class="right" @click="comfirm">确定</div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import utils from '../utils'
export default {
  props: {
    popboxData: Object,
    value: Boolean,
    type: {
      type: String,
      default: '1'
    }
  },
  mounted() {},
  methods: {
    cancel() {
      this.$emit('input', false)
      this.$emit('cancel')
    },
    comfirm() {
      this.$emit('comfirm')
    }
  }
}
</script>

<style lang="less">
@import '../assets/css/mixin';
.c-popbox {
  .full-page();
  background: rgba(0, 0, 0, 0.5);
  .flex-center;
  z-index: 500;

  opacity: 0;
  visibility: hidden;
  transition: 0.3s;

  &.show {
    opacity: 1;
    visibility: visible;
  }

  .popbox-container {
    background: #fff;
    border-radius: 4px;
    width: 250px;
    overflow: hidden;

    transform: translateY(10px);
    transition: 0.3s;

    &.show {
      transform: translateY(0);
    }
  }

  .title {
    font-size: 15px;
    color: #4a4a4a;
    padding: 17px 0 10px 0;
    text-align: center;
  }

  .content {
    padding: 0 25px;
    font-size: 12px;
    line-height: 17px;
    color: @gray;
    padding-bottom: 24px;
  }

  .btns {
    border-top: 1rpx solid @borderColor;
    .flex-center();
    color: @gray;
    .lh(45px);
    text-align: center;

    .left,
    .right {
      width: 50%;

      font-size: 15px;
    }

    .left {
      border-right: 1rpx solid @borderColor;
    }

    .right {
      color: @red;
    }

    .comfirm {
      width: 100%;
    }
  }
}
</style>
