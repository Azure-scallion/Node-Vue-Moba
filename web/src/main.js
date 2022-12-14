import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import './style.scss'
import router from './router'
import axios from 'axios'
import dayjs from 'dayjs'


// 引入Swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
// 引入Swiper样式
import 'swiper/css/swiper.css'

// 引入阿里图标
import "./assets/iconfont/iconfont.css"

// 引入card（自制组件）
import Card from './components/Card.vue'
//全局引用
Vue.component('m-card', Card)

// 引入ListCard（自制组件）
import ListCard from './components/ListCard.vue'
//全局引用
Vue.component('m-list-card', ListCard)

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/web/api',
})
Vue.prototype.dayjs = dayjs


Vue.use(VueAwesomeSwiper)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
