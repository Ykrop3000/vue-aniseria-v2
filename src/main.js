import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import bbCodeParser from 'js-bbcode-parser';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'

import 'axios-progress-bar/dist/nprogress.css'
import "@/assets/css/global.css"

Vue.use(VueLazyload)
Vue.use(ElementUI);


Vue.config.productionTip = false
Vue.prototype.$http = Axios;

bbCodeParser.setCodes({
  '\\[replies=.*\\]': '',
  '\\[comment=.*\\]': '',
  '\\[spoiler=(.+?)\\](.+?)\\[/spoiler\\]': '<span onclick="showSpoiler(this)" class="spoiler"><div class="text">$1</div><br><span>$2</span></span>',
  '\\[spoiler\\](.+?)\\[/spoiler\\]': '<span onclick="showSpoiler(this)" class="spoiler"><div class="text">спойлер</div><br><span>$1</span></span>',

  '\\[character=(.+?)\\](.+?)\\[/character\\]': '<a class="br-link" href="http://localhost:8080/charapter/$1"> $2 </a>',
  '\\[image=(.+?)\\]': '<img class="br-link" src="http://localhost:8080/charapter/$1">',
  '\\[anime=(.+?)\\](.+?)\\[/anime\\]': '<a class="br-link" href="http://localhost:8080/anime/$1"> $2 </a>',

  '\\[br\\]': '<br>',
  '\\[b\\](.+?)\\[/b\\]': '<strong>$1</strong>',
  '\\[i\\](.+?)\\[/i\\]': '<em>$1</em>',
  '\\[u\\](.+?)\\[/u\\]': '<u>$1</u>',
  '\\[h1\\](.+?)\\[/h1\\]': '<h1>$1</h1>',
  '\\[h2\\](.+?)\\[/h2\\]': '<h2>$1</h2>',
  '\\[h3\\](.+?)\\[/h3\\]': '<h3>$1</h3>',
  '\\[h4\\](.+?)\\[/h4\\]': '<h4>$1</h4>',
  '\\[h5\\](.+?)\\[/h5\\]': '<h5>$1</h5>',
  '\\[h6\\](.+?)\\[/h6\\]': '<h6>$1</h6>',
  '\\[p\\](.+?)\\[/p\\]': '<p>$1</p>',
  '\\[color=(.+?)\\](.+?)\\[/color\\]':  '<span style="color:$1">$2</span>',
  '\\[size=([0-9]+)\\](.+?)\\[/size\\]': '<span style="font-size:$1px">$2</span>',
  '\\[img\\](.+?)\\[/img\\]': '<img src="$1">',
  '\\[img=(.+?)\\]':          '<img src="$1">',
  '\\[email\\](.+?)\\[/email\\]':       '<a href="mailto:$1">$1</a>',
  '\\[email=(.+?)\\](.+?)\\[/email\\]': '<a href="mailto:$1">$2</a>',
  '\\[url\\](.+?)\\[/url\\]':                      '<a href="$1">$1</a>',
  '\\[url=(.+?)\\|onclick\\](.+?)\\[/url\\]':      '<a onclick="$1">$2</a>',
  '\\[url=(.+?)\\starget=(.+?)\\](.+?)\\[/url\\]': '<a href="$1" target="$2">$3</a>',
  '\\[url=(.+?)\\](.+?)\\[/url\\]':                '<a href="$1">$2</a>',
  '\\[a=(.+?)\\](.+?)\\[/a\\]': '<a href="$1" name="$1">$2</a>',
  '\\[list\\](.+?)\\[/list\\]': '<ul>$1</ul>',
  '\\[\\*\\](.+?)\\[/\\*\\]':   '<li>$1</li>'
});

const plugin ={
  install(){
    Vue.bbcode = bbCodeParser
    Vue.prototype.$bbcode = bbCodeParser
  }
}
Vue.use(plugin)

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
