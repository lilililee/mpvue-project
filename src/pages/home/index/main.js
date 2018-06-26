import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '订餐首页',
    usingComponents: {
      //   'i-button': '/static/iview/button/index',
      //   "i-card": "/static/iview/card/index"
      // 'i-tab-bar': '/static/iview/tab-bar/index',
      // 'i-tab-bar-item': '/static/iview/tab-bar-item/index'
    }
  }
}
