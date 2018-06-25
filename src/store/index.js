// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',

    nowUser: {},
  },
  mutations: {
    updateToken: (state, token) => {
      state.token = token
    },
    updateNowUser: (state, nowUser) => {
      state.nowUser = nowUser
    },
  }
})

export default store
