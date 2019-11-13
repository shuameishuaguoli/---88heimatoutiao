import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入登录页组件
import login from '../views/login'
// 引入首页组件
import home from '../views/home/'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/login'
}, {
  // 配置登录页路由
  path: '/login',
  component: login
}, {
  // 配置首页路由
  path: '/home',
  component: home
}
  // 按需加载的路由
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
