<template>
  <div class="goods-info">
    <!-- 轮播图 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <!-- 轮播图组件 -->
          <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item, index) in goodsImgs" :key="index">
              <img :src="item.src" alt="">
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
    </div>

    <!-- 飞舞的小球 -->
    <transition 
      @before-enter="beforeEnter"
      @enter="enter"
    >
      <div class="ball" v-show="isShow"></div>
    </transition>

    <!-- 商品数据展示 -->
    <div class="mui-card">
      <div class="mui-card-header">{{info.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner info">
          <p>
            <span class="market-price">市场价：<del>￥{{info.market_price}}</del></span> 
            <span>
            销售价：
            <span class="sell-price">￥{{info.sell_price}}</span>
            </span>
          </p>
          <div class="numbox-container">
            购买数量：
            <Numberbox :max="info.stock_quantity" v-model="count"></Numberbox>
          </div>
          <div>
            <mt-button type="primary">立即购买</mt-button>
            <mt-button type="danger" @click="addCart">加入购物车</mt-button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 商品参数 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{info.goods_no}}</p>
          <p>库存情况：{{info.stock_quantity}}件</p>
          <p>上架时间：{{info.add_time | date}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDetail">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import Numberbox from '../common/NumberBox.vue'
export default {
  created() {
    this.getGoodsInfoById();
    this.getGoodsImgs();
  },
  data() {
    return {
      info: {},
      goodsImgs: [],
      count: 1,
      isShow: false
    }
  },
  methods: {
    getGoodsInfoById() {
      this.$http.get(`http://vue.studyit.io/api/goods/getinfo/${this.$route.params.id}`)
      .then(res => {
        if (res.data.status === 0) {
          this.info = res.data.message[0];
          // this.isShow = true
        }
        
    })
    },
    getGoodsImgs() {
      this.$http.get(`http://vue.studyit.io/api/getthumimages/${this.$route.params.id}`)
      .then(res => {
        if (res.data.status === 0) {
          this.goodsImgs = res.data.message
        }
      })
    },
    goDetail() {
      this.$router.push(`/home/goodsdetail/${this.$route.params.id}`)
    },
    goComment() {
      this.$router.push(`/home/goodscomment/${this.$route.params.id}`)
    },
    addCart() {
      this.isShow = true
      console.log(this.count);
      this.$store.dispatch('addGoodsToCartAsyn',{id: this.$route.params.id - 0, count: this.count})
      
    },
    beforeEnter (el) {
      el.style.transform = 'translate(0,0)'
    },

    enter (el, done) {
      el.style.transform = `translate(120px, ${window.pageYOffset + 195}px)`
      done()
      this.isShow = false
    }
   
    
  },
  components: {Numberbox}
}
</script>

<style lang="scss">
  .mint-swipe {
    height: 200px;

    .mint-swipe-item {
      text-align: center;

      img {
        height: 100%;
        // width: 100%;
      }
    }
  }

  .info {

    p {
      color: #000;

      .market-price {
        margin-right: 10px;
      }

      .sell-price {
        color: #f00;
        font-size: 16px;
        font-weight: bold;
      }
    }

    .mui-numbox {
      height: 25px;
    }

    .numbox-container {
      margin-bottom: 10px;
    }

    .mint-button {
      font-size: 14px;
      height: 34px;
    }
  }

  .mui-card-footer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 120px;
  }

  .ball {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #f00;
    position: absolute;
    z-index: 11;
    top: 385px;
    left: 151px;
    /* 通过 贝塞尔曲线 设置动画效果 */
    transition: all 0.6s;
    // transition: all 0.6s cubic-bezier(.52,-0.54,.83,.67);
  }
</style>
