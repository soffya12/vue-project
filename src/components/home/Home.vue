<template>
  <div class="home">
    <!-- 轮播图 -->
    <mt-swipe :auto="2000">
      <mt-swipe-item v-for="(item,index) in list" :key="index">
        <img :src="item.img" :alt="item.url">
      </mt-swipe-item>
    </mt-swipe>

    <!-- 九宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-sm-4">
        <router-link to="/home/newslist">
          <span class="mui-icon mui-menu-icon-1"></span>
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-sm-4">
        <router-link to="/home/photolist">
          <span class="mui-icon mui-menu-icon-2"></span>
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-sm-4">
        <router-link to="/home/goodslist">
          <span class="mui-icon mui-menu-icon-3"></span>
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-sm-4">
        <a href="#">
          <span class="mui-icon mui-menu-icon-4"></span>
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-sm-4">
        <a href="#">
          <span class="mui-icon mui-menu-icon-5"></span>
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-sm-4">
        <a href="#">
          <span class="mui-icon mui-menu-icon-6"></span>
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>

    </ul>
  </div>
</template>

<script>
  // http://vue.studyit.io
  export default {
    created() {
      this.getLunbo();
    },
    data() {
      return {
        list: []
      }
    },

    methods: {
      getLunbo() {
        this.$http.get('api/getlunbo')
          .then(res => {
            const data = res.data
            if (data.status === 0) {
              this.list = data.message
            }
          })
      }
    }
  }
</script>

<style lang="scss">
  .mint-swipe {
    height: 180px;

    img {
      width: 100%;
    }
  }
  .mui-grid-view.mui-grid-9 {
    background-color: #fff;
    .mui-table-view-cell {
    border: 0
    }

    .mui-icon {
      width: 60px;
      height: 60px;
      background-size: contain;
    }
    .mui-menu-icon-1 {
      background-image: url(../../assets/images/menu1.png);
    }
    .mui-menu-icon-2 {
      background-image: url(../../assets/images/menu2.png);
    }
    .mui-menu-icon-3 {
      background-image: url(../../assets/images/menu3.png);
    }
    .mui-menu-icon-4 {
      background-image: url(../../assets/images/menu4.png);
    }
    .mui-menu-icon-5 {
      background-image: url(../../assets/images/menu5.png);
    }
    .mui-menu-icon-6 {
      background-image: url(../../assets/images/menu6.png);
    }
  }
</style>