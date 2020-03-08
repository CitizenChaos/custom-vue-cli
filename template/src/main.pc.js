import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/common/common.less'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false

import { Message } from 'element-ui'

Vue.prototype.$message = Message

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
