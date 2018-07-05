import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: '首页',
    // disableScroll: true,
    usingComponents: {
      "i-notice-bar": "../../static/iview/notice-bar/index",
      // "i-message": "/static/iview/message/index",
    }
  }
}
