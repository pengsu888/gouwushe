window.onload = function () {
  var htmlTag = document.getElementsByTagName('html')[0];
  htmlTag.style.fontSize = (document.documentElement.clientWidth / 7.5) + 'px';
}
utils = {
  storage: {
    set: function (key, data) {
      if (window.api) {
        // 有全局api对象时用原生存储
        try {
          api.setPrefs({
            key: key,
            value: JSON.stringify(data)
          })
        } catch (err) {
          api.setPrefs({
            key: key,
            value: data
          })
        }
      } else {
        // 没有全局api对象时
        try {
          return window.localStorage.setItem(key, window.JSON.stringify(data))
        } catch (err) {
          return window.localStorage.setItem(key, data)
        }
      }
    },
    get: function (key) {
      if (window.api) {
        // 有全局api对象时用原生存储
        try {
          return JSON.parse(api.getPrefs({sync: true, key: key}))
        } catch (err) {
          return api.getPrefs({sync: true, key: key})
        }
      } else {
        // 没有全局api对象时
        try {
          return window.JSON.parse(window.localStorage.getItem(key))
        } catch (err) {
          return window.localStorage.getItem(key)
        }
      }
    },
    remove: function (key) {
      if (window.api) {
        api.removePrefs({key: key})
      } else {
        return window.localStorage.removeItem(key)
      }
    }
  },
  auth: {
    toLogin: function(){
      api.execScript({
          name: 'main',
          script: 'localStorage.removeItem("token");localStorage.removeItem("userInfo");vueObj.jumpTo("/wechatLogin");'
      });
      setTimeout(function(){
        api.closeWin();
      }, 500)
    }
  },
  copyText: function(text, callback){
    var input = document.createElement('input')
    input.style.position = 'absolute';
    input.value = text
    document.body.appendChild(input)
    input.select()
    input.setSelectionRange(0, input.value.length)
    document.execCommand('Copy')
    document.body.removeChild(input)
    return callback && callback();
  }
}
