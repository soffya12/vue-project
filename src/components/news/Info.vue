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
      <div class="comment">
        <h3>发表评论</h3>
        <div>
          <textarea id="" cols="30" rows="5" placeholder="请输入评论内容, 最多120字" v-model="comment">
          </textarea>
        </div>
        <mt-button type="primary" size="large" @click="addComment">发表评论</mt-button>
        <ul class="comment-list">
          <li class="comment-item" v-for="(item,index) in list" :key="index">
            <h4 class="comment-header">
              <span>第{{index + 1}}楼</span>
              <span>用户: {{ item.user_name}}</span>
              <span>发表时间: {{ item.add_time | date }}</span>
            </h4>
            <p class="comment-content" v-text="item.content"></p>
          </li>
        </ul>
        <mt-button type="primary" size="large" plain @click="getMoreComment">加载更多</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getNewsInfoById(),
    this.getCommentsById()
  },
  data() {
    return {
      info: {},
      list: [],
      pageindex: 1,
      comment: '' 
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
    },
    getCommentsById() {
      this.$http.get(`http://vue.studyit.io/api/getcomments/${this.$route.params.id}?pageindex=${this.pageindex}`)
      .then( res => {
        const data = res.data
        if (data.status === 0) {
        // this.list = data.message
          // this.list = this.list.concat(data.message);
          this.list = [...this.list, ...data.message]
        
        }
      })
    },
    getMoreComment() {
      this.pageindex++;
      this.getCommentsById();
    },
    addComment() {
      if (this.comment.trim() === '') {
        return
      }
      this.$http.post(`http://vue.studyit.io/api/postcomment/${this.$route.params.id}`,`content=${this.comment}`)
      .then(res => {
        const data = res.data;
        console.log(data);
        if (data.status === 0) {
          this.list.unshift({
            add_time: new Date(),
            content: this.comment,
            user_name: '匿名用户'
          })

          this.comment = ''
        }
      })
    }
  }
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

  .comment {
    padding: 10px 5px;
    h3 {
      font-size: 26px;
    }
    .comment-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .comment-header {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      font-weight: normal;
      background-color: #eee;
      line-height: 20px;
    }
    .comment-content {
      color: #000;
      padding-left: 10px;
    }
  }
</style>
