//导入 vue  App.vue
import Vue from 'vue'
import App from './App.vue'
import './assets/css/index.css'
import VueRouter from 'vue-router'

import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
Vue.use(VueRouter)

import Home from './components/home/Home.vue'
const router = new VueRouter({
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', component: Home }
  ]

})

import { Header,Button,Swipe, SwipeItem  } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

import axios from 'axios'
Vue.prototype.$http = axios;

new Vue({
  el: '#app',
  router,
  render: c => c(App)
})