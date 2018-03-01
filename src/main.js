//导入 vue  App.vue
import Vue from 'vue'
import App from './App.vue'
import './assets/css/index.css'
import VueRouter from 'vue-router'

import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
Vue.use(VueRouter)

import Home from './components/home/Home.vue'
import Vip from './components/vip/Vip.vue'
import Cart from './components/cart/Cart.vue'
import Search from './components/search/Search.vue'
import NewsList from './components/news/List.vue'
import NewsInfo from './components/news/Info.vue'

const router = new VueRouter({
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', component: Home },
    {path: '/vip', component: Vip},
    {path: '/cart', component: Cart},
    {path: '/search', component: Search},
    {path: '/home/newslist', component: NewsList}

  ],
  linkActiveClass: 'mui-active'

})

import { Header,Button,Swipe, SwipeItem  } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

import axios from 'axios'
Vue.prototype.$http = axios;

import moment from 'moment'
Vue.filter('date', function(value, format = 'YYYY--MM-DD HH:mm:ss') {
  return moment(value).format(format)
})

new Vue({
  el: '#app',
  router,
  render: c => c(App)
})