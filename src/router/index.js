import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入登录页组件
import login from '../views/login'
// 引入首页组件
import home from '../views/home/'
// 引入nprogress包
import NProgress from 'nprogress'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: login
}, {
  // 配置首页路由
  path: '/home',
  component: home
}
  // 配置按需加载的路由
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

// 使用路由拦截器
router.beforeEach((to, from, next) => {
  // 测试一下
  console.log('所有的请求都经过这里')
  // 获取一下本地token值
  const token = window.localStorage.getItem('token')
  // console.log(token)
  // 判断一下是否有token值
  // 但是除了登录页不需要token值，其他的页面都需要token值，所以我们要将登录页单独进行判断
  // 在前置守卫中开启进度条
  NProgress.start()
  // path是to中的一个属性，这个属性存放的就是请求的页面的路径
  if (to.path === '/') {
    // 如果请求的是登录页，就直接通过
    next()
    // 并终止代码的执行
    return
  }
  if (token) {
    // 如果有token值就直接跳转到想要去的页面，直接放行
    next()
  } else {
    // 如果没有token的话，就跳转到登录页
    next('/')
    // 如果是跳到了登录页面，就要关闭进度条
    NProgress.done()
  }
})
// 全局后置钩子
router.afterEach((to, from) => {
  // 在全局后置钩子中关闭进度条
  NProgress.done()
})

export default router
