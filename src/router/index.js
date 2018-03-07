import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Home from '../components/home/Home.vue'
import Vip from '../components/vip/Vip.vue'
import Cart from '../components/cart/Cart.vue'
import Search from '../components/search/Search.vue'
import NewsList from '../components/news/List.vue'
import NewsInfo from '../components/news/Info.vue'
import PhotoList from '../components/photos/List.vue'
import PhotoInfo from '../components/photos/Info.vue'
import GoodsList from '../components/goods/List.vue'
import GoodsInfo from '../components/goods/Info.vue'
import GoodsDetail from '../components/goods/Details.vue'
import GoodsComment from '../components/goods/Comment.vue'
const router = new VueRouter({
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', component: Home },
    {path: '/vip', component: Vip},
    {path: '/cart', component: Cart},
    {path: '/search', component: Search},
    {path: '/home/newslist', component: NewsList},
    {path: '/home/newsinfo/:id', component: NewsInfo},
    {path: '/home/photolist', component: PhotoList},
    {path: '/home/photoinfo/:id', component: PhotoInfo, name: 'photoinfo'},
    {path: '/home/goodslist', component: GoodsList},
    {path: '/home/goodsinfo/:id', component: GoodsInfo},
    {path: '/home/goodsdetail/:id', component: GoodsDetail},
    {path: '/home/goodscomment/:id', component: GoodsComment},
    

  ],
  linkActiveClass: 'mui-active'

})

export default router;