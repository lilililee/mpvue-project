function setHtmlFontSize() {
  adjust();
  window.addEventListener('resize', function () {
    adjust();
  })
  function adjust() {
    var windowWidth = document.body.clientWidth;
    var fontSize = (200 * windowWidth) / 750;

    document.documentElement.style.fontSize = fontSize + 'px'
  }
}
setHtmlFontSize()



var validate = {
  test: function (str, regexp, msg) {
    if (!regexp.test(str)) {
      alert(msg)
      return true
    } else {
      return false
    }
  },
  isEmpty: function (str, name) {
    // 当name第一个字符为$时不会补充文字--请输入
    var txt = '请输入' + name
    return this.test(str, /^.+$/, txt)
  },
  notPhone: function (str) {
    return this.test(str, /^1[0-9]{10}$/, '手机号码输入有误')
  },
  notPassword: function (str) {
    return this.test(str, /^[0-9a-zA-Z]{6,16}$/, '密码为6-16位英文和数字组合')
  }
}

var bind = document.querySelector('.bind')
var phone = document.querySelector('.phone')
var code = document.querySelector('.code')
var getCode = document.querySelector('.get-code')
var before = document.querySelector('.before')
var after = document.querySelector('.after')

var isGetCode = false
var count = 60
var countInterval = ''

getCode.addEventListener('click', function () {
  if (isGetCode) return

  if (validate.isEmpty(phone.value, '手机号')) return
  if (validate.notPhone(phone.value)) return

  $.ajax({
    url: window.DOMAIN + 'getCode',
    type: 'POST',
    data: {
      phone: phone.value,
    },
    success: function (res) {
      if (res.code == 0) {
        isGetCode = true
        
        count--
        getCode.innerHTML = '已发送(' + count + 's)'
        countInterval = setInterval(() => {
          if (count == 0) {
            clearInterval(countInterval)
            count = 60
            getCode.innerHTML = '获取验证码'
            isGetCode = false
            return
          }
          count--
          getCode.innerHTML = '已发送(' + count + 's)'
        }, 1000)
        
      } else {
        alert(res.message)
      }
    }
  })
})


var hasSendBind = false
bind.addEventListener('click', function () {
  if (hasSendBind) return

  if (validate.isEmpty(phone.value, '手机号')) return
  if (validate.notPhone(phone.value)) return
  if (validate.isEmpty(code.value, '验证码')) return

  hasSendBind = true
  $.ajax({
    url: window.DOMAIN + 'submitBind',
    type: 'POST',
    data: {
      phone: phone.value,
      code: code.value
    },
    success: function (res) {
      if (res.code == 0) {
        alert('绑定成功')
        hasSendBind = false
        before.style.display = 'none'
        after.querySelector('.bind-phone').innerHTML = phone.value
        after.style.display = 'block'

      } else {

        alert(res.message)
      }
    }
  })
})
