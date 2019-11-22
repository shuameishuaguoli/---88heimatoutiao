import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入登录页组件
import login from '@/views/login'
// 引入布局组件这个布局组件中布局了侧边栏，头部，中间内容部分
import Layout from '@/views/layout/'
// 引入首页
import home from '@/views/home/'
// 引入发布文章组件
import article from '@/views/article/'
// 引入content 内容列表组件
import content from '@/views/content/'
// 引入comment 评论组件
import comment from '@/views/comment'
// 引入修改评论组件
import editcomment from '@/views/editComment'
// 引入素材组件
import material from '@/views/material'
// 引入账户信息页面
import account from '@/views/account'
// 引入nprogress包
import NProgress from 'nprogress'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: login
}, {
  // 配置布局页面路由
  path: '/layout',
  component: Layout,
  // 因为首页和发布文章和内容列表组件都属于布局页面的二级路由，所以要在布局页面路由下配置路由表，这里的布局页面属于一级路由，首页和发布文章和内容列表组件属于二级路由
  children: [{
    path: '/',
    component: home // 默认显示的是首页
  }, {
    path: '/article',
    component: article // 发布文章页面
  }, {
    path: '/article/:articleID', // 点击编辑跳转到发布文章页面 这里需要动态路由
    component: article
  }, {
    path: '/content',
    component: content // 内容页面
  }, {
    path: '/comment', // 评论页面
    component: comment
  }, {
    path: '/editcomment/:editcommentID', // 修改评论页面 这里需要动态路由，所以我们要配置动态参数
    component: editcomment,
    // 将路由参数映射给props数据这样获取参数更方便，不用每次是用id的时候，每次都要获取一遍
    props: true
  }, {
    path: '/material',
    component: material
  }, {
    path: '/account', // 配置账户信息路由表
    component: account
  }]
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
