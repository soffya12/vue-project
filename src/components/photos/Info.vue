<template>
  <div class="photo-info">
    <header>
      <h2 class="title">{{info.title}}</h2>
      <p class="mui-ellipsis">
        <span>发表时间：{{info.add_time | date}}</span>
        <span>点击次数：{{info.click}}次</span>
      </p>
    </header>
    <div class="thumb-img">
      <img :src="item.src" height="100" class="preview-img" v-for="(item,index) in list" :key="index" @click="$preview.open(index, list)">
    </div>
    <div class="content" v-html="info.content">
    </div>

    <!-- 评论组件-->
    <Comment :commentId="$route.params.id"></Comment>
  </div>
</template>

<script>
import Vue from 'vue'
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

import Comment from '../common/Comment.vue'

export default {
  created() {
    this.getImageInfoById(),
    this.getThumImagesById()
  },
  data() {
    return {
      info: {},
      list: []
    }
  },
  methods: {
    getImageInfoById() {
      this.$http.get(`http://vue.studyit.io/api/getimageInfo/${this.$route.params.id}`)
      .then(res => {
        if (res.data.status === 0) {
          this.info = res.data.message[0]
        }
      })
    },
    getThumImagesById() {
      this.$http.get(`http://vue.studyit.io/api/getthumimages/${this.$route.params.id}`)
      .then(res => {
        console.log(res);
        if (res.data.status === 0) {
          this.list = res.data.message.map(item => ({
              src: item.src,
              w: 600,
              h: 400
          }))
        }
      })
    }
  },

  components: {Comment}
};
</script>

<style lang="scss">
.photo-info {
  padding-left: 3px;
  padding-right: 3px;

  .thumb-img {
    border-top: 1px solid #ccc;

    img {
      margin: 9px;
      box-shadow: 0 0 15px #ccc;
    }
  }

  .title {
    font-size: 18px;
    color: #26a2ff;
    text-align: center;
  }

  .mui-ellipsis {
    display: flex;
    justify-content: space-between;
    padding: 0 3px;
  }

  .content {
    font-size: 14px;
    line-height: 28px;
    padding-top: 20px;
  }
}
</style>
