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
    },

    updateCart(state, payload) {
      state.cart = payload.map(item => {
        if (item.isChecked) {
          return { id: item.id, count: item.count}
        }else {
          return { id: item.id, count: 0}
        }
      })
      localStorage.setItem('cart', JSON.stringify(state.cart))
      
    }

  },

  getters: {
    getCartCount(state) {
      let count = 0;
      state.cart.forEach(item => count += +item.count)
      return count
    },
    getIds(state) {
      return state.cart.map(item => item.id).join(',')
    },
    getCountById(state) {
      const idsObj = {}
      state.cart.forEach(item => {
        idsObj[item.id] = item.count
      })
      return idsObj
    },
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