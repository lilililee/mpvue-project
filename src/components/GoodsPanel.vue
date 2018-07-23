<template>
  <div class="c-goods-panle">
    <ul class="goods-list">
      <li v-for="(item,index) in goodsList" :key="index" @click="toGoodsDetailPage(item)">
        <img :src="item.img" class="img" @error="onImageError(item)">
        <div class="info">
          <div class="name">{{item.name}}</div>
          <div class="bottom">
            <div class="price">¥{{item.price}}</div>

            <div class="change-num">
              <i class="icon-shop-minus" :class="{active: item.num > 1}"></i>
              <span>{{item.num}}</span>
              <i class="icon-shop-plus active"></i>
            </div>

          </div>

        </div>
      </li>
    </ul>
    <ul class="count-list">
      <li>
        <div class="name">商品金额合计</div>
        <div class="value">¥ 123.60</div>
      </li>
      <li>
        <div class="name">运费合计</div>
        <div class="value">¥ 123.60</div>
      </li>
    </ul>
  </div>

</template>

<script>
import utils from '../utils'

export default {
  props: {
    goodsList: Array
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    onImageError(item) {
      item.img = require('../assets/img/goods_default.png')
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '../assets/css/mixin';
.c-goods-panle {
  background: #fff;
  padding: 0 16px;
  .goods-list {
    li {
      .flex-between();
      height: 94px;
      .border-bottom();
    }

    .img {
      .wh(60px);
    }

    .info {
      width: 250px;
    }

    .name {
      font-size: 14px;
      line-height: 20px;
      height: 40px;
      overflow: hidden;
    }

    .bottom {
      .flex-between();

    }

    .price {
      color: #FF5050;
    }

    .change-num {
      .flex-end();
      span {
        display: inline-block;
        width: 30px;
        font-size: 12px;
        margin: 0 3px;

        .lh(20px);
        background: #F5F5F5;
        text-align: center;
      }
    }
  }

  .count-list {
    padding: 16px 0 10px 0;
    font-size: 12px;
    li {
      .flex-between();
      margin-bottom: 12px;
      color: #434343;
      line-height: 17px;

    }
  }
}
</style>
