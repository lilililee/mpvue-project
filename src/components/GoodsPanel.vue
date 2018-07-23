<template>
  <div class="c-goods-panle">
    <ul>
      <li v-for="(item,index) in goodsList" :key="index" @click="toGoodsDetailPage(item)">
        <img :src="item.img" @error="onImageError(item)">
        <div class="name">{{item.name}}</div>
        <div class="price">¥{{item.price}}</div>
      </li>
    </ul>
    <loading-tip :isOver="isOver"></loading-tip>
  </div>

</template>

<script>
import utils from '../utils'


export default {
  props: {
    goodsList: Array,
    isOver: Boolean
  },
  data() {
    return {}
  },
  mounted() {
  },
  methods: {
    toGoodsDetailPage(item){
      wx.navigateTo({
        url: `/pages/shopHome/goodsDetail/main?goods_id=${item.goods_id}`
      })
    },
    onImageError(item) {
      item.img = require('../assets/img/goods_default.png')
    },

  },
  components: {
    LoadingTip
  }
}
</script>

<style lang="less">
@import '../assets/css/mixin';
.c-goods-panle {
  > ul {
    padding: 8px;
    .flex-start();
    flex-wrap: wrap;
  }

  li {
    width: 50%;
    margin-bottom: 7px;
    background: #fff;

    &:nth-child(odd) {
      border-right: 3.5px solid #f0f3fa;
    }
    &:nth-child(even) {
      border-left: 3.5px solid #f0f3fa;
    }
    img {
      display: block;
      width: 100%;
      height: 176px;
    }

    .name {
      font-size: 13px;
      line-height: 16px;
      height: 32px;
      overflow: hidden;
      margin: 12px 10px;
    }

    .price {
      font-size: 15px;
      color: #ff5050;
      margin: 0 10px;
      margin-bottom: 10px;
    }
  }

  .c-loading-tip {
    margin-top: -7px;
  }
}
</style>
