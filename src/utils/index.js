import _config from '../config'
import _store from '../store'

function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
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
    return this.test(str, /^[0-9a-zA-Z]{6,16}$/, `密码输入有误`)
  }
}

const showMsg = msg => {
  log(msg)
}

const log = (...args) => {
  console.log(...args)
}

const ajax = ({ action, method ='GET',data = {}, success, fail }) => {
  // 登陆后的请求都需要token
  let header = {}
  _store.state.token && (header.token = _store.state.token)

  log(`%c${action}(input)`, `color:#29bb7b`, data)
  wx.request({
    url: _config.domain + action,
    method,
    data,
    header,
    success(res) {
      log(`%c${action}(res)`, `color:#5b8de2`, res.data)
      if (res.data.code == 0) {
        success(res.data)
      } else {
        showMsg(res.data.message)
      }
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

  formatNumber,
  formatTime,

  validate,
  showMsg,
  log,

  ajax
}
