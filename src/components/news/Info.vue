<template>
  <div>
    <div class="news-info">
      <header>
        <h3 v-text="info.title"></h3>
        <p class="news-desc">
          <span>发表时间: {{ info.add_time | date }}</span>
          <span>点击次数:  {{ info.click }}次</span>
        </p>
      </header>

      <!-- 新闻内容 -->
      <div class="news-content" v-html="info.content"></div>

      <!-- 评论功能 -->
      <Comment :commentId="$route.params.id"></Comment>
    </div>
  </div>
</template>

<script>
import Comment from '../common/Comment.vue'
export default {
  created() {
    this.getNewsInfoById()
  },
  data() {
    return {
      info: {} 
    }
  },
  methods: {
    getNewsInfoById() {
      this.$http.get(`http://vue.studyit.io/api/getnew/${this.$route.params.id}`)
      .then(res => {
        const data = res.data
        if (data.status === 0) {
          this.info = data.message[0]
        }
      })
    }
  },

  components: {Comment}
}
</script>

<style lang="scss">
  .news-info {
    padding: 5px;
    header, .news-content {
      border-bottom: 1px solid #ccc;
    }
    h3 {
      font-size: 18px;
    } 
    .news-desc {
      display: flex;
      justify-content: space-between;
      color: #26a2ff;
    }

    img {
      width: 100%;
    }
  }

  
</style>
