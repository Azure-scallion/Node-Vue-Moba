import Vue from 'vue'
// 导入axios包
import axios from 'axios'
import router from './router'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

http.interceptors.request.use(res => {
  if (sessionStorage.token) {
    res.headers.Authorization = 'Bearer ' + sessionStorage.token
  }
  return res
}, err => {
  if (err.response.data.message) {
    Vue.prototype.$message.error(err.response.data.message)
    return Promise.reject(err)
  }

})

http.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response.data.message) {
    Vue.prototype.$message.error(err.response.data.message)
  }
  if (err.response.status === 401) {
    router.push('/login')

  }


})

export default http

