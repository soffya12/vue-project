//导入 vue  App.vue
import Vue from 'vue'
import App from './App.vue'
import './assets/css/index.css'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
 
})

import { Header,Button } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);

new Vue({
  el: '#app',
  router,
  render: c => c(App)
})