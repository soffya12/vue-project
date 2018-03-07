import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const cart = JSON.parse(localStorage.getItem('cart')) || []

const store = new Vuex.Store({
  state: {
    cart,
  },

  mutations: {
    addGoodsToCart(state, payload) {
      const curGoods = state.cart.find(item => item.id === payload.id)
      if (!curGoods) {
        state.cart.push({id: payload.id, count: payload.count})
      }else {
        curGoods.count += payload.count
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    }

  },

  getters: {
    getCartCount(state) {
      let count = 0;
      state.cart.forEach(item => count += item.count)
      return count
    }
  },

  actions: {
    addGoodsToCartAsyn(context, payload) {
      setTimeout(() => {
        context.commit('addGoodsToCart', payload)
      }, 600)
    }
  }

})

export default store