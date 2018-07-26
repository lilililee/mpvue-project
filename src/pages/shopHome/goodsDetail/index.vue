<template>
  <div class="page-home__goods_detail" :class="{'x-padding': isIphoneX}">
    <img class="img" :src="goodsInfo.img" @error="onImageError">

    <div class="desc">
      <div class="name">{{goodsInfo.name}}</div>

      <div class="money">
        <div class="price">¥{{goodsInfo.price}}</div>
        <div class="carriage">运费：{{goodsInfo.carriage}}元</div>
      </div>
    </div>

    <div class="address" @click="toAddressPage">
      <div class="left">
        <div class="address-name">{{nowUser.address_name}}</div>
        <div class="expect-time">现在下单预计 {{nowUser.expect_time}} 后到货</div>
      </div>
      <i class="right icon-arrow-right"></i>
    </div>

    <div class="detail">
      <div class="title">商品详情</div>
      <div class="content" v-html="goodsInfo.content"></div>
    </div>

    <div class="bottom" :class="{'x-border': isIphoneX}">
      <div class="cart" @click="toCartPage">
        <i class="icon-cart"></i>
        <div class="text">{{cartNum}}</div>
      </div>
      <div class="add" @click="addToCart">加入购物车</div>
      <div class="buy" @click="toComfirmOrderPage">直接购买</div>
    </div>
  </div>
</template>

<script>
import utils from '@/utils'

export default {
  data() {
    return {
      isIphoneX: utils.isIphoneX,

      goodsInfo: {}
    }
  },

  computed:{
    cartNum() {
      return this.$store.state.cartNum
    },
    nowUser() {
      return this.$store.state.nowUser
    }
  },
 
  mounted() {
    this.getGoodsInfo()
  },

  methods: {
    getGoodsInfo() {
      utils.ajax({
        action: 'getGoodsInfo',
        data: {
          goods: this.$root.$mp.query.goods_id
        },
        loading: true,
        success: res => {
          if (res.code == 0) {
            this.goodsInfo = res.data

            // this.$store.commit('updateState', {
            //   field: 'nowUser',
            //   value: {
            //     address_id: this.goodsInfo.address_id,
            //     address_name: this.goodsInfo.address_name,
            //     expect_time: res.data.expect_time
            //   }
            // })
            // this.$store.commit('updateState', {
            //   field: 'cartNum',
            //   value: res.data.car_num * 1
            // })
          }
        }
      })
    },
    toAddressPage(){
      wx.navigateTo({
        url: `/pages/shopHome/changeAddress/main`
      })
    },
    toCartPage(){
      wx.reLaunch({
        url: `/pages/shopMain/main?page=1`
      })
    },
    toComfirmOrderPage(){
      let goodsList = [{
        ...this.goodsInfo,
        num: 1
      }]
      wx.navigateTo({
        url: `/pages/shopHome/comfirmOrder/main?goods_list=${JSON.stringify(goodsList)}`
      })
    },
    addToCart() {
      utils.ajax({
        action: 'changeCartGoods',
        method: 'POST',
        data: {
          goods_id: this.goodsInfo.goods_id,
          num: 1
        },
        success: res => {
          if (res.code == 0) {
            utils.showSuccess('添加成功')
            this.$store.commit('updateState', {
              field: 'cartNum',
              value: this.cartNum + 1
            })

          }
        }
      })
    },
    onImageError() {
      this.goodsInfo.img = require('../../../assets/img/goods_default.png')
    }
  },
  components: {}
}
</script>
<style lang="less">
@import '../../../assets/css/mixin.less';
.page-home__goods_detail {
  padding-bottom: 60px;

  .img {
    display: block;
    width: 100%;
    height: 375px;
  }

  .desc {
    padding: 16px 16px 23px;
    background: #fff;
    .border-bottom();
    .name {
      font-size: 16px;
      margin-bottom: 20px;
      font-weight: bold;
    }

    .money {
      .flex-between();
      line-height: 16px;
    }

    .price {
      font-size: 20px;
      color: #ff5050;
    }

    .carriage {
      color: @gray;
    }
  }

  .address {
    background: #fff;
    padding: 16px;
    .flex-between();

    .address-name {
      width: 300px;
      .limit();
      line-height: 16px;
      margin-bottom: 8px;
    }

    .expect-time {
      font-size: 12px;
      color: #ff5050;
      line-height: 16px;
    }
  }

  .detail {
    margin-top: 12px;
    background: #fff;

    .title {
      padding: 0 12px;
      .lh(48px);
    }
  }

  .bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 60px;
    .flex-center();
    font-size: 16px;
    text-align: center;
    .border-top();
    background: #fff;

    > div {
      .lh(40px);
      width: 125px;

      & + div {
        .border-left();
      }
    }
    .cart {
      position: relative;

      .text {
        position: absolute;
        top: 2px;
        right: 37px;

        .wh(17px);
        line-height: 17px;
        border-radius: 50%;

        background: #ff5050;
        font-size: 9px;
        color: #ffffff;
      }
    }

    .add {
      color: @theme;
    }

    .buy {
      color: #ff5050;
    }
  }
}
</style>

