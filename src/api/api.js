import axios from 'axios'
import qs from 'qs'
// import store from '../store'

let ax = axios.create({
  withCredentials: true, // 允许cookie
  // baseURL: process.env.BASE_PATH,
  // baseURL: 'http://web.babe2018.com'
  baseURL: 'https://webapi.newbabe.com'
})

// 添加响应拦截器
ax.interceptors.response.use(res => {
  // 如果接口返回NOT_LOGGEDIN就跳转到登录
  if (res.data.resultCode === 'NOT_LOGGEDIN' && window.location.hash !== '#/home' && window.location.hash !== '#/aboutUs' && window.location.hash !== '#/down' && window.location.hash !== '#/reliable') {
    // store.commit('CLEAR_USER')
    window.location.href = '/#/login'
  }
  return res
})

export default {
  get: (url, params) => {
    return new Promise((resolve, reject) => {
      ax({
        method: 'get',
        url,
        params: qs.stringify(params)
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  post: (url, params) => {
    return new Promise((resolve, reject) => {
      ax({
        method: 'post',
        url,
        data: qs.stringify(params)
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  postFormdata: (url, params) => {
    return new Promise((resolve, reject) => {
      ax.post(url, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
