import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import CategoryCreat from '../views/CategoryCreat.vue'
import CategoryList from '../views/CategoryList.vue'

import ItemCreat from '../views/ItemCreat.vue'
import ItemList from '../views/ItemList.vue'

import HeroCreat from '../views/HeroCreat.vue'
import HeroList from '../views/HeroList.vue'

import ArticleCreat from '../views/ArticleCreat.vue'
import ArticleList from '../views/ArticleList.vue'

import AdCreat from '../views/AdCreat.vue'
import AdList from '../views/AdList.vue'

import AdminUserCreat from '../views/AdminUserCreat.vue'
import AdminUserList from '../views/AdminUserList.vue'

Vue.use(VueRouter)

const routes = [
  // { path: '/', redirect: '/login' },   //redirect  当页面为  /  时，将页面重定向为 login页面
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      { path: 'categories/create', component: CategoryCreat },
      { path: 'categories/create/:id', component: CategoryCreat, props: true },
      { path: 'categories/list', component: CategoryList },

      { path: 'items/create', component: ItemCreat },
      { path: 'items/list', component: ItemList },
      { path: 'items/create/:id', component: ItemCreat, props: true },

      { path: 'heroes/create', component: HeroCreat },
      { path: 'heroes/list', component: HeroList },
      { path: 'heroes/create/:id', component: HeroCreat, props: true },

      { path: 'articles/create', component: ArticleCreat },
      { path: 'articles/list', component: ArticleList },
      { path: 'articles/create/:id', component: ArticleCreat, props: true },

      { path: 'ads/create', component: AdCreat },
      { path: 'ads/list', component: AdList },
      { path: 'ads/create/:id', component: AdCreat, props: true },

      { path: 'admin_users/create', component: AdminUserCreat },
      { path: 'admin_users/list', component: AdminUserList },
      { path: 'admin_users/create/:id', component: AdminUserCreat, props: true },

    ]
  },

]

const router = new VueRouter({
  routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // 访问登录页面则直接放行
  if (to.path === '/login') return next()
  // 访问除登录外的其他页面，都必须验证token
  // 1>获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  // Vue.prototype.$message.error('请先登录')


  next()

})

export default router
