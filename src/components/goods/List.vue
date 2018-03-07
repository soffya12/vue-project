<template>
  <div class="goods-list">
    <ul>
      <li class="goods-item" v-for="item in list" :key="item.id" @click="goInfo(item.id)">
        <img :src="item.img_url" alt="商品图片">
        <h2>{{item.title}}</h2>
        <div>
          <span class="price-cur">￥{{item.sell_price}}</span>
          <span class="price-prev">￥{{item.market_price}}</span>
        </div>
        <p>
          <span>热卖中</span>
          <span>剩余{{item.stock_quantity}}件</span>
        </p>
      </li>

    </ul>

    <!-- 加载更多 -->
    <mt-button plain size="large" type="primary" @click="getMoreGoods" v-if="hasMore">加载更多</mt-button>
    <p class="more" v-else>亲,没有更多商品了</p>
  </div>
</template>

<script>
export default {
  created() {
    this.getGoodsList(this.pageindex)
  },
  data() {
    return {
      list: [],
      pageindex: 1,
      hasMore: true  //是否有更多数据
    }
  },
  methods: {
    getGoodsList() {
      this.$http.get(`http://vue.studyit.io/api/getgoods?pageindex=${this.pageindex}`)
      .then(res => {
        if (res.data.status === 0) {
          this.list = [...this.list, ...res.data.message]

          if(res.data.message.length < 10) {
            this.hasMore = false
          }
        }
      })
    },
    getMoreGoods() {
      this.pageindex++;
      this.getGoodsList()
    },
    goInfo(id) {
      this.$router.push(`/home/goodsinfo/${id}`)
    }
  }
}
</script>

<style lang="scss">
  .goods-list {
    ul {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .goods-item {
      width: 48%;
      margin: 1%;
      padding: 3px;
      border: 1px solid #ccc;
      box-shadow: 0 0 10px #ccc;

      h2 {
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      div {
        font-size: 14px;
        margin-top: 5px;

        .price-cur {
          color: #f00;
          margin-right: 10px;
        }
        .price-prev {
          text-decoration: line-through;
          color: #ccc;
        }
      }

      img {
        width: 100%;
      }

      p {
        display: flex;
        justify-content: space-between;
        margin: 0;
        padding: 0 3px;
        color: #ccc;
      }
    }

    .more {
      text-align: center;
    }
  }
</style>
