import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/common/common.less'
import '@/utils/rem'
Vue.config.productionTip = false

import { Toast } from 'vant'

Vue.use(Toast)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
