import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    "navigationBarTitleText": "确认下单",
    "navigationBarBackgroundColor": '#16B266',
    // "navigationBarBackgroundColor": '#398BFE',
    // "navigationBarBackgroundColor": '#0091fa',
    "navigationBarTextStyle": 'white',
  }
}
