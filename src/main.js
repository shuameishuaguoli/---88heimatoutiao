import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入element-ui
import Element from 'element-ui'
// 引入样式
import 'element-ui/lib/theme-chalk/index.css'
// 引入index.less
import './style/index.less'
Vue.config.productionTip = false
// 在vue中进行注册element
Vue.use(Element)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
