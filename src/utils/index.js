import _config from '../config'
import _store from '../store'

import {
  $Toast,
  $Message
} from '../assets/iview/base/index'

const formatNumber = (n) => {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

const formatDate = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}
const formatTime = (date) => {

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = formatDate(date)
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

// 校验方法
const validate = {
  test(str, regexp, msg) {
    if (!regexp.test(str)) {
      showMsg(msg)
      return true
    } else {
      return false
    }
  },
  isEmpty(str, name) {
    return this.test(str, /^.+$/, `请输入${name}`)
  },
  notPhone(str) {
    return this.test(str, /^1[0-9]{10}$/, `手机号码输入有误`)
  },
  notPassword(str) {
    return this.test(str, /^[0-9a-zA-Z]{6,16}$/, `密码为6-16位英文和数字组合`)
  }
}

const showMsg = msg => {
  log(msg)
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 1500
  })

  // $Message({
  //   content: msg,
  //   type: 'warning'
  // });
}

const log = (...args) => {
  console.log(...args)
}


// const isLoading = false

const ajax = ({
  action,
  method = 'GET',
  data = {},
  success,
  fail
}) => {

  // 登陆后的请求都需要token
  let header = {}
  _store.state.token && (header.token = _store.state.token)

  // 加载速度太快会导致页面抖动
  // if (isLoading) {
  //   isLoading = true
  //   wx.showNavigationBarLoading()
  // }

  log(`%c${action}(input)`, `color:#29bb7b`, data)
  wx.request({
    url: _config.domain + action,
    method,
    data,
    header,
    success(res) {
      // if (isLoading) {
      //   wx.hideNavigationBarLoading()
      // }
      log(`%c${action}(res)`, `color:#5b8de2`, res.data)
      if (res.data.code != 0) {
        success(res.data)
        showMsg(res.data.message)
      }

      success(res.data)
    },
    fail(e) {
      log(e)
      fail(e)
    }
  })
}

export default {
  _config,
  _store,
  $Toast,
  $Message,

  formatNumber,
  formatDate,
  formatTime,

  validate,
  showMsg,
  log,

  ajax,

}
