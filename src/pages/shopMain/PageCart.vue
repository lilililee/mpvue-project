<template>
  <div class="page-cart__index">
    <div class="top">
      <div class="select" @click="checkAll">
        <i class="icon-select" :class="{active:isCheckAll}"></i>全选
      </div>

      <div class="edit" @click="isEdit = !isEdit">{{isEdit? '取消编辑': '编辑'}}</div>
    </div>

    <ul class="goods-list">
      <li v-for="(item,index) in goodsList" :key="item.goods_id">
        <div class="select">
          <i class="icon-select" :class="{active:item.is_check}" @click="item.is_check = !item.is_check"></i>
        </div>
        <img :src="item.img" class="img" @error="onImageError(item)">
        <div class="info" :class="{'is-edit': isEdit}">
          <div class="name">{{item.name}}</div>
          <div class="bottom">
            <div class="price">¥{{item.price}}</div>

            <div class="change-num" v-if="!isEdit">
              <i class="icon-shop-minus" :class="{active: item.num > 1}" @click="addToCart(item, -1)"></i>
              <span>{{item.num}}</span>
              <i class="icon-shop-plus active" @click="addToCart(item, 1)"></i>
            </div>

          </div>
        </div>
        <div class="remove" v-if="isEdit" @click="addToCart(item, 0, index)">移除</div>
      </li>
    </ul>

    <div class="bottom-column" :class="{'x-margin': isIphoneX}">
      <div class="left">
        合计：
        <span>{{checkTotalPrice}}</span>
      </div>

      <div class="right" :class="{'disabled': isEdit || checkGoodsList.length == 0}" @click="toComfirmOrderPage">去结算</div>
    </div>

    <!-- <list-picker v-model="isShowListPicker" :list="userList" @comfirm="comfirmUser"></list-picker> -->

  </div>
</template>

<script>
import utils from '@/utils'
import ListPicker from '@/components/ListPicker'
export default {
  data() {
    return {
      system: utils._config.system,
      isIphoneX: utils.isIphoneX,

      goodsList: [],

      isEdit: false

      // isShowListPicker: false
    }
  },
  computed: {
    cartNum() {
      return this.$store.state.cartNum
    },
    checkGoodsList() {
      return this.goodsList.filter(item => item.is_check)
    },
    isCheckAll() {
      return this.checkGoodsList.length == this.goodsList.length && this.goodsList.length != 0
    },
    checkTotalPrice() {
      return this.checkGoodsList
        .reduce((prev, item) => {
          return prev + item.price * item.num
        }, 0)
        .toFixed(2)
    }
  },

  mounted() {
    this.getCartGoodsList()
  },

  methods: {
    getCartGoodsList() {
      utils.ajax({
        action: 'getCartGoodsList',
        loading: true,
        success: res => {
          if (res.code == 0) {
            let cartNum = 0
            res.data.list.forEach(item => {
              item.is_check = false
              cartNum += item.num * 1
            })

            this.$store.commit('updateState', {
              field: 'cartNum',
              value: cartNum
            })

            this.goodsList = res.data.list
          }
        }
      })
    },
    checkAll() {
      if (this.isCheckAll) {
        this.goodsList.forEach(item => {
          item.is_check = false
        })
      } else {
        this.goodsList.forEach(item => {
          item.is_check = true
        })
      }
    },
    addToCart(item, num, index) {
      if (num == -1 && item.num == 1) return
      utils.ajax({
        action: 'changeCartGoods',
        method: 'POST',
        data: {
          goods_id: item.goods_id,
          num: num
        },
        loading: true,
        success: res => {
          if (res.code == 0) {
            if (num == 0) {
              this.$store.commit('updateState', {
                field: 'cartNum',
                value: this.cartNum + -item.num * 1
              })
              this.goodsList.splice(index, 1)

              utils.showSuccess('移除成功')
            } else {
              item.num = item.num * 1 + num
              this.$store.commit('updateState', {
                field: 'cartNum',
                value: this.cartNum + num
              })
            }
          }
        }
      })
    },
    changeGoodsNum(item, num) {
      let result = item.num * 1 + num
      result > 0 && (item.num = result)
    },
    toComfirmOrderPage() {
      if (this.isEdit || this.checkGoodsList.length == 0) return
      let goodsList = this.checkGoodsList
      wx.navigateTo({
        url: `/pages/shopHome/comfirmOrder/main?goods_list=${JSON.stringify(goodsList)}`
      })
    },
    onImageError(item) {
      item.img = require('../../assets/img/goods_default.png')
    }
  },
  components: {
    ListPicker
  }
}
</script>
<style lang="less">
@import '../../assets/css/mixin.less';

.page-cart__index {
  padding-top: 44px;
  padding-bottom: 60px;
  .top {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
    .flex-between();
    padding: 0 16px;
    background: #fff;

    .select {
      .flex-start();

      i {
        margin-right: 8px;
      }
    }
  }

  .goods-list {
    padding: 0 16px;
    background: #fff;
    margin-top: 12px;
    li {
      .flex-start();
      height: 94px;

      + li {
        .border-top();
      }
    }

    .select {
      margin-right: 8px;
    }

    .img {
      .wh(60px);
      margin-right: 8px;
    }

    .info {
      width: 243px;

      &.is-edit {
        width: 181px;
      }
    }

    .name {
      font-size: 14px;
      line-height: 20px;
      height: 40px;
      overflow: hidden;
    }

    .bottom {
      .flex-between();
      height: 40px;
    }

    .price {
      color: #ff5050;
    }

    .change-num {
      .flex-end();
      span {
        display: inline-block;
        width: 30px;
        font-size: 12px;
        margin: 0 3px;

        .lh(20px);
        background: #f5f5f5;
        text-align: center;
      }
    }
    .remove {
      width: 53px;
      color: #ff5050;
      text-align: right;
    }
  }

  .bottom-column {
    bottom: 50px;
    .right {
      background: @orange;

      &.disabled {
        opacity: 0.5;
      }
    }
  }
}
</style>

