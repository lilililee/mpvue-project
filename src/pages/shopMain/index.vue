<template>

  <div class="page-main" :class="{'x-padding': isIphoneX}">
    <page-home v-if="nowPage == 'home'" :onReachBottomTimes="onReachBottomTimes"></page-home>
    <page-cart v-if="nowPage == 'cart'"></page-cart>
    <page-order v-if="nowPage == 'order'"></page-order>
    <page-user v-if="nowPage == 'user'"></page-user>

    <div class="tab-bar flex-around" :class="{'x-border': isIphoneX}">
      <div class="tab-bar-item" v-for="(item, index) in pageList" :key="index" :class="{active: nowPage==item.name}" @click="changePage(item)">
        <i :class="[item.icon,{active: nowPage==item.name}]"></i>
        <div class="title">{{item.title}}</div>
        <div class="text" v-if="item.name == 'cart'">{{cartNum}}</div>
      </div>
    </div>

  </div>
</template>

<script>
import utils from '@/utils'
import PageHome from './PageHome'
import PageCart from './PageCart'
import PageOrder from './PageOrder'
import PageUser from './PageUser'

let pageList = [
  {
    name: 'home',
    title: '首页',
    icon: 'icon-navbar-home'
  },
  {
    name: 'cart',
    title: '购物车',
    icon: 'icon-navbar-cart'
  },
  {
    name: 'order',
    title: '订单',
    icon: 'icon-navbar-order'
  },
  {
    name: 'user',
    title: '我',
    icon: 'icon-navbar-user'
  }
]
export default {
  data() {
    return {
      isIphoneX: utils.isIphoneX,
      pageList,
      nowPage: '', // home || cart || order || user

      onReachBottomTimes: 0
    }
  },

  computed: {
    cartNum() {
      return this.$store.state.cartNum
    }
  },

  onReachBottom() {
    this.onReachBottomTimes++
  },

  beforeCreate() {
    if (!wx.getStorageSync('token')) {
      wx.reLaunch({
        url: '/pages/login/index/main'
      })
    }
  },

  mounted() {
    this.nowPage = ''
    setTimeout(() => {
      this.changePage(pageList[this.$root.$mp.query.page || 0])
    })

    this.getUserList()
    this.getCartNum()
  },

  methods: {
    changePage(page) {
      if (this.nowPage == page.name) return

      wx.setNavigationBarTitle({
        title: page.name == 'home' ? '积分商城' : page.title
      })
      this.nowPage = page.name

      if (this.nowPage == 'user') {
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#16B266'
        })
      } else {
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: '#ffffff'
        })
      }
    },

    getUserList() {
      utils.ajax({
        action: 'getUserList',
        success: res => {
          if (res.code == 0) {
            this.$store.commit('updateState', {
              field: 'nowUser',
              value: res.data.list[0] || {}
            })
          }
        }
      })
    },
    getCartNum() {
      utils.ajax({
        action: 'getCartNum',
        success: res => {
          if (res.code == 0) {
            this.$store.commit('updateState', {
              field: 'cartNum',
              value: res.data.cart_num * 1
            })
          }
        }
      })
    }
  },
  components: {
    PageHome,
    PageCart,
    PageOrder,
    PageUser
  }
}
</script>
<style lang="less">
@import '../../assets/css/mixin.less';
.page-main {
  // height: 100%;
  padding-bottom: @bottomColumnHeight;

  .tab-bar {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 50px;
    width: 100%;
    background: #fff;
    box-shadow: inset 0 1px 0 0 rgba(0, 0, 0, 0.05);
    z-index: 1;
  }

  .tab-bar-item {
    position: relative;
    text-align: center;
    height: 100%;
    width: 20%;
    padding-top: 6px;

    .title {
      margin-top: 2px;
      font-size: 10px;
    }

    .text {
      position: absolute;
      top: 5px;
      right: 16px;
      .wh(17px);
      line-height: 17px;
      border-radius: 50%;

      background: #ff5050;
      font-size: 9px;
      color: #ffffff;
    }

    &.active {
      color: @theme;
    }
  }
}
</style>

