<template>
  <div class="page-main">
    <page-home v-if="nowPage == 'home'"></page-home>
    <page-calendar v-if="nowPage == 'calendar'"></page-calendar>
    <page-order v-if="nowPage == 'order'"></page-order>
    <page-user v-if="nowPage == 'user'"></page-user>

    <div class="tab-bar flex-around">
      <div class="tab-bar-item" v-for="(item, index) in pageList" :key="index" :class="{active: nowPage==item.name}" @click="changePage(item)">
        <i-icon type="homepage" size="22" color="#80848f" />
        <div class="title">{{item.title}}</div>
      </div>
    </div>

    <i-toast id="toast" />
    <i-message id="message" />
  </div>
</template>

<script>
import utils from '../../utils'
import PageHome from '../home/index/index'
import PageCalendar from '../calendar/index/index'
import PageOrder from '../order/index/index'
import PageUser from '../user/index/index'

let pageList = [
  {
    name: 'home',
    title: '首页',
    icon: '',
    path: ''
  },
  {
    name: 'calendar',
    title: '日历',
    icon: '',
    path: ''
  },
  {
    name: 'order',
    title: '订单',
    icon: '',
    path: ''
  },
  {
    name: 'user',
    title: '我',
    icon: '',
    path: ''
  }
]
export default {
  data() {
    return {
      pageList,
      nowPage: 'home' // home || calendar || order || user
    }
  },

  mounted() {},

  methods: {
    changePage(page) {
      if (this.nowPage == page.name) return
      wx.setNavigationBarTitle({
        title: page.title
      })
      this.nowPage = page.name

      utils.$Message({
        content: '警告的提示',
        type: 'error'
      })
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
  .tab-bar {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 120rpx;
    width: 100%;
    background: #fff;
  }

  .tab-bar-item {
    text-align: center;

    .title {
      margin-top: 5rpx;
    }
  }
}
</style>

