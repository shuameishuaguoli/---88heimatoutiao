import Vue from 'vue'
import App from './App.vue'
// 引入vuerouter  挂载路由的
import router from './router'
// 引入element-ui
import Element from 'element-ui'
// 引入elementui的整体样式
import 'element-ui/lib/theme-chalk/index.css'
// 引入index.less
import './style/index.less'
// 引入nprogress的css文件
import 'nprogress/nprogress.css'

// 引入axios
import axios from 'axios'
// 这是开发模式   false是开发模式，true时生产模式
Vue.config.productionTip = false
// 在vue中进行注册element
Vue.use(Element)
// 将axios挂载到vue中
// 在main.js中设置一下url的常态地址，这是服务器的一个线上地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 将axios挂载到Vue的方法区，这样所有的vue实例就都有了$axios这属性了
Vue.prototype.$axios = axios

new Vue({
  // 目的是为了让vue与router产生关系，就要将router挂载到Vue实例中
  router,
  render: h => h(App)
}).$mount('#app')
