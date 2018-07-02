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

    <!-- <i-toast id="toast" />
    <i-message id="message" /> -->
  </div>
</template>

<script>
import utils from '../../utils'
import PageHome from '../../components/page/PageHome'
import PageCalendar from '../../components/page/PageCalendar'
import PageOrder from '../../components/page/PageOrder'
import PageUser from '../../components/page/PageUser'

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

      // setTimeout()
      if (this.nowPage == 'calendar' || this.nowPage == 'user') {
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#0095ff'
        })
      } else {
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: '#ffffff'
        })
      }

      // utils.$Message({
      //   content: '警告的提示',
      //   type: 'error'
      // })
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
    padding-top: 25px;
    height: 100%;
    width: 20%;

    .title {
      margin-top: 5rpx;
    }
  }
}
</style>

