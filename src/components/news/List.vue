<template>
  <div class="news-list">
    <ul class="mui-table-view mui-table-view-chevron">
				<li class="mui-table-view-cell mui-media" v-for="item in list" :key="item.id">
					<a class="mui-navigate-right">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h3 class="news-title mui-ellipsis">{{item.title}}</h3>
							<p class="news-desc">
                <span>发表时间 {{item.add_time | date}}</span>
                <span>点击次数: {{item.click}}次</span>
              </p>
						</div>
					</a>
				</li>
			</ul>
  </div>
</template>

<script>
export default {
  created() {
    this.getNewsList();
  },
  data() {
    return {
      list: []
    }
  },
  methods: {
    getNewsList() {
      this.$http.get('http://vue.studyit.io/api/getnewslist')
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

<style lang="scss" scoped>
  .news-list {
    .news-title {
      font-weight: normal;
      font-size: 16px;
    }
    .news-desc {
      font-size: 12px;
      color: #26a3ff;
      display: flex;
      justify-content: space-between;
    }
    .mui-table-view-chevron .mui-table-view-cell {
      padding-right: 52px;
    }
    .mui-table-view-cell {
      padding-bottom: 8px;
    }
  }
</style>
