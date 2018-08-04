import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './store'
import utils from './utils'
import './assets/css/index.less'
// const emitter = new EventEmitter()
// emitter.setMaxListeners(0) //或者关闭最大监听阈值 
// mpvue 不支持直接注入vuex store的方式
Vue.prototype.$store = store

Vue.config.productionTip = false
App.mpType = 'app'


const app = new Vue(App)
app.$mount()




export default {
  // 这个字段走 app.json
  config: {
    // pages: ['^pages/login/index/main'],   // 登录页面入口
    pages: ['^pages/main/main'],    // 学校/企业订餐首页入口
    // pages: ['^pages/shopMain/main'],    // 商城首页入口
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      // backgroundColor: '#f1f3fa'
    },
    // tabBar: {
    //   backgroundColor: '#eee',
    //   // position:'top',
    //   list: [
    //     {
    //       pagePath: 'pages/home/index/main',
    //       text: '首页'
    //     },
    //     {
    //       pagePath: 'pages/calendar/index/main',
    //       text: '首页'
    //     },
    //     {
    //       pagePath: 'pages/order/index/main',
    //       text: '首页'
    //     },
    //     {
    //       pagePath: 'pages/user/index/main',
    //       text: '日志'
    //     }
    //   ]
    // }
    // 无效
    // usingComponents: {
    //   'i-button': '../static/iview/button/index'
    // }
  }
}
