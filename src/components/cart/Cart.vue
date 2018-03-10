<template>
  <div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner cart" v-for="item in list" :key="item.id">
          <!-- 开关组件 -->
          <mt-switch v-model="item.isChecked"></mt-switch>
          <img data-v-0505f5cb="" :src="item.thumb_path" alt="">
          <div>
            <h2 data-v-0505f5cb="">{{item.title}}</h2>
            <div data-v-0505f5cb="" class="info">
              <span data-v-0505f5cb="">￥{{item.sell_price}}</span> 
              <NumberBox v-model="item.count"></NumberBox>
              <a data-v-0505f5cb="" href="#" @click.prevent="delGoods(item.id)">删除</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner cart-buy">
          <div>
            <p>总计（不包含运费）</p>
            <p>已勾选商品&nbsp;
              <span>{{ $store.getters.getCartCount }}</span>&nbsp;件&nbsp;&nbsp;总价：
              <span>￥{{ totalPrice }}</span></p>
          </div>
          <div>
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NumberBox from '../common/NumberBox.vue';
export default {
  created() {
    this.getShopCartListByIds()
  },
  data() {
    return {
      list: []
    }
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.list.forEach (item => {
        if (item.isChecked) {
        total += item.count * item.sell_price
        }
      })
      return total;
    },

    // totalCount() {
    //   let count = 0
    //   this.list.forEach(item => {
    //     count += item.count * item.sell_price
    //   })
    //   return count
    // }
  },
  methods: {
    getShopCartListByIds() {
      const {getIds, getCountById }= this.$store.getters
      this.$http.get(`api/goods/getshopcarlist/${getIds}`)
      .then(res => {
        if (res.data.status === 0) {
          this.list = res.data.message.map(item => {
            return {
              ...item,
              isChecked: true,
              count: getCountById[item.id]
            }
          })
        }
      })
    },

    delGoods(id) {
      let index = this.list.find(item=> item.id === id ).index
      this.list.splice(index, 1)
    }
  },
  components: { NumberBox },

  watch: {
    list: {
      handler(curVal) {
        this.$store.commit('updateCart', curVal)
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.cart {
  display: flex;
  align-items: center;

  h2 {
    font-size: 14px;
  }

  img {
    width: 60px;
    height: 60px;
  }

  span {
    color: #f00;
  }

  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.cart-buy {
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    color: #f00;
  }
}
</style>
