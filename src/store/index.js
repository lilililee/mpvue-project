// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    nowUser: {},

    companyNowUser: {},   // 临时保存企业版在下单和某日订单的地址信息

    foodList: [],

  },
  mutations: {

    updateNowUser: (state, nowUser) => {
      state.nowUser = nowUser || {}   // 在userList.length为0时为undefined
    },
    updateFoodList: (state, foodList) => {
      state.foodList = foodList
    },
    updateCompanyNowUser: (state, companyNowUser) => {
      state.companyNowUser = companyNowUser
    },
    updateState: (state, {field, data}) => {
      state[field] = data
    }
  }
})

export default store
