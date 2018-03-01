<template>
  <div class="home">
    <!-- 轮播图 -->
    <mt-swipe :auto="2000">
      <mt-swipe-item v-for="(item,index) in list" :key="index">
        <img :src="item.img" :alt="item.url">
      </mt-swipe-item>
    </mt-swipe>
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
      this.$http.get('http://vue.studyit.io/api/getlunbo')
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

</style>
