import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    "navigationBarTitleText": "收银台",
    "navigationBarBackgroundColor": '#FF7C00',
    "navigationBarTextStyle": 'white',
    // "backgroundColor": '#ffffff'
  }
}
