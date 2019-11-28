import Vue from 'vue'
import App from './App.vue'
import 'babel-polyfill' // 兼容旧浏览器
import router from './router'
import store from './store'
import Cube from 'cube-ui'
import fetch from './api/api'
import axios from 'axios'
// 引入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // 这个样式必须引入
import 'swiper/dist/css/swiper.min.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Cube)
Vue.use(ElementUI)
Vue.prototype.$fetch = fetch
Vue.prototype.$http = axios
// Vue.prototype.$api = 'http://web.dis20190000test.com'

Vue.prototype.$api = 'https://webapi.newbabe.com'
Vue.prototype.$api2 = 'https://openapi.alipay.com/gateway.do'
Vue.config.productionTip = false

// 时间戳转换
Vue.prototype.$changeDate = function (time, str = '/', type = 1) {
  function ifTime (value) { // 判断时间是否是个位数
    if (value < 10) {
      return '0' + value
    }
    return value
  }
  let newTime = new Date(time)
  let day = newTime.getDate()
  let month = newTime.getMonth() + 1
  let year = newTime.getFullYear()
  let hours = newTime.getHours()
  let min = newTime.getMinutes()
  let sec = newTime.getSeconds()
  switch (type) {
    case 1:
      return year + str + ifTime(month) + str + ifTime(day) + ' ' + ifTime(hours) + ':' + ifTime(min)
    case 2:
      return year + str + ifTime(month) + str + ifTime(day) + ' 00:00:00'
    case 3:
      return year + str + ifTime(month) + str + ifTime(day) + ' 23:59:59'
    case 4:
      return year + str + ifTime(month) + str + ifTime(day)
    case 5:
      return year + str + ifTime(month) + str + ifTime(day)
    case 6:
      return ifTime(hours) + ':' + ifTime(min)
    case 7:
      return ifTime(hours) + ':' + ifTime(min) + ':' + ifTime(sec)
    case 8:
      return year + str + ifTime(month) + str
  }
}

Vue.prototype.$cycleType = function (type) {
    switch (type) {
        case 1:
            return '月'
        case 2:
            return '周'
    }
}

Vue.prototype.$statusType = function (type) {
    switch (type) {
        case 0:
            return '待支付'
        case 1:
            return '已支付(审核中)'
        case 2:
            return '审核通过'
        case 3:
            return '已到账'
        case 4:
            return '取消'
        case 5:
            return '打款失败'
        case 6:
            return '失败'
    }
}

Vue.filter('f2', function (value) { // 保留4位小数点,不四舍五入
  if (!isNaN(value) && value !== null) {
    let f = Math.floor(value * 100) / 100
    let s = f.toString()
    let rs = s.indexOf('.')
    if (rs < 0) {
      rs = s.length
      s += '.'
    }
    while (s.length <= rs + 2) {
      s += '0'
    }
    return s
  } else {
    return '0.00'
  }
})

Vue.prototype.$productType = function (type) {
  let productArr = ['饮食', '零售','服务','服装','酒店','房产','数码','茶叶','健身','珠宝','美容','汽车']
  return productArr[type - 1]
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 进度条
NProgress.configure({
  showSpinner: false,
  minimum: 0.6,
  easing: 'ease',
  speed: 200
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  window.scrollTo(0, 0)
  NProgress.done()
})
