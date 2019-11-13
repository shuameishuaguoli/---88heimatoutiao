import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入element-ui
import Element from 'element-ui'
// 引入样式
import 'element-ui/lib/theme-chalk/index.css'
// 引入index.less
import './style/index.less'
// 引入axios
import axios from 'axios'
Vue.config.productionTip = false
// 在vue中进行注册element
Vue.use(Element)
// 将axios挂载到vue中
// 在main.js中设置一下url的常态地址，这是服务器的一个线上地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
