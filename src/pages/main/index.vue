<template>

  <div class="page-main" :class="{'x-padding': isIphoneX}">
    <page-home v-if="nowPage == 'home'" :showTimes="showTimes"></page-home>
    <page-calendar v-if="nowPage == 'calendar'" :showTimes="showTimes"></page-calendar>
    <page-order v-if="nowPage == 'order'"></page-order>
    <page-user v-if="nowPage == 'user'"></page-user>

    <div class="tab-bar flex-around"  :class="{'x-border': isIphoneX}">
      <div class="tab-bar-item" v-for="(item, index) in pageList" :key="index" :class="{active: nowPage==item.name}" @click="changePage(item)">
        <i :class="[item.icon,{active: nowPage==item.name}]"></i>
        <div class="title">{{item.title}}</div>
      </div>
    </div>

  </div>
</template>

<script>
import utils from '@/utils'
import PageHome from './PageHome'
import PageCalendar from './PageCalendar'
import PageOrder from './PageOrder'
import PageUser from './PageUser'

let pageList = [
  {
    name: 'home',
    title: '首页',
    icon: 'icon-navbar-home'
  },
  {
    name: 'calendar',
    title: '日历',
    icon: 'icon-navbar-calendar'
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
      nowPage: '', // home || calendar || order || user
      showTimes: 0,
    }
  },
  computed: {
    nowUser() {
      return this.$store.state.nowUser
    }
  },
  onShow() {
    this.showTimes ++   // 针对添加用餐人后通知首页更新数据
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
  },

  methods: {
    changePage(page) {
      if (this.nowPage == page.name) return
      if (page.name == 'calendar' && !this.nowUser.user_id) {
        utils.showMsg('请先添加用餐人')
        return
      }
      wx.setNavigationBarTitle({
        title: page.title
      })
      this.nowPage = page.name

      if (this.nowPage == 'calendar' || this.nowPage == 'user') {
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
    }
  },
  components: {
    PageHome,
    PageCalendar,
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
    text-align: center;
    height: 100%;
    width: 20%;
    padding-top: 6px;

    .title {
      margin-top: 2px;
      font-size: 10px;
    }

    &.active {
      color: @theme;
    }
  }
}
</style>

