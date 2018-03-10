//导入 vue  App.vue
import Vue from 'vue'
import App from './App.vue'
import './assets/css/index.css'

import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

import store from './store'

import { Header,Button,Swipe, SwipeItem,Lazyload, Switch, Indicator } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.use(Lazyload);
Vue.component(Switch.name, Switch);

import axios from 'axios'
axios.defaults.baseURL = 'http://vue.studyit.io'
axios.interceptors.request.use(function(config) {
  Indicator.open({
    text: '加载中...',
    spinnerType: 'fading-circle'
  })
  return config
}, function(error) {
  return Promise.reject(error)
})
axios.interceptors.response.use(function(response) {
  setTimeout(() => {
    Indicator.close();
  },500);
  return response
})
Vue.prototype.$http = axios;

import './filters'
import router from './router'

new Vue({
  el: '#app',
  router,
  store,
  render: c => c(App)
})