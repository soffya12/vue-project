//导入 vue  App.vue
import Vue from 'vue'
import App from './App.vue'
import './assets/css/index.css'

import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
// import './lib/mui/js/mui.js'





import { Header,Button,Swipe, SwipeItem,Lazyload   } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.use(Lazyload);

import axios from 'axios'
Vue.prototype.$http = axios;

import './filters'
import router from './router'

new Vue({
  el: '#app',
  router,
  render: c => c(App)
})