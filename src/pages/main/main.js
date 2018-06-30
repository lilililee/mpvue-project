import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '首页',
    // disableScroll: true,
    usingComponents: {
      // "i-icon": "/static/iview/icon/index",
      // "i-toast": "/static/iview/toast/index",
      // "i-message": "/static/iview/message/index",
    }
  }
}
