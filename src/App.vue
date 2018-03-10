<template>
  <div class="container">
    <!-- 顶部 -->
    <mt-header fixed title="黑马程序员 | SH17">
    <a href="#" @click.prevent="$router.go(-1)" slot="left" v-show="$route.path !== '/home'">
    	<mt-button icon="back">返回</mt-button>
    </a>
    </mt-header>

    <!-- 内容: 路由出口 -->
    <router-view class="content"></router-view>

    <!-- 底部 -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home" @click.native="goPage('/home')">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/vip"  @click.native="goPage('/vip')">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/cart" @click.native="goPage('/cart')">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">{{ $store.getters.getCartCount }}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search"  @click.native="goPage('/search')">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>

<script>
export default {
	methods: {
		goPage(page) {
			this.$router.push(page)
		}
	}
}
</script>

<style scoped>
  .content {
    padding: 40px 0 50px 0;
  }
</style>
