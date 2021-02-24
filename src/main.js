import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'

import 'axios-progress-bar/dist/nprogress.css'
import "@/assets/css/global.css"

Vue.use(VueLazyload)
Vue.use(ElementUI);


Vue.config.productionTip = false

Vue.prototype.$http = Axios;


const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
