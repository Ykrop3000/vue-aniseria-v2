import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import infiniteScroll from 'vue-infinite-scroll'



import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'



import ru from 'vee-validate/dist/locale/ru';
import * as VeeValidate from 'vee-validate';
import { Validator } from 'vee-validate';
Vue.use(VeeValidate)
Validator.localize('ru', ru);

import 'vue-preloaders/dist/vue-preloaders.css'
import VuePreloaders from 'vue-preloaders'

Vue.use(VuePreloaders, /*{ options }*/)


Vue.use(VueLazyload)
Vue.use(ElementUI);





import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import "@/assets/css/global.css"

Vue.use(infiniteScroll)

Vue.directive('click-outside', {
  bind () {
      this.event = event => this.vm.$emit(this.expression, event)
      this.el.addEventListener('click', this.stopProp)
      document.body.addEventListener('click', this.event)
  },   
  unbind() {
    this.el.removeEventListener('click', this.stopProp)
    document.body.removeEventListener('click', this.event)
  },

  stopProp(event) { event.stopPropagation() }
})

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
