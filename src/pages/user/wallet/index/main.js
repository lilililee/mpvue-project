import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    "navigationBarTitleText": "钱包",
    "navigationBarBackgroundColor": '#ffffff',
    "navigationBarTextStyle": 'black',
    // "backgroundColor": '#ffffff'
  }
}
