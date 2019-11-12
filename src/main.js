import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入index.less
import './style/index.less'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
