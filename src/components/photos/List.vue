<template>
  <div>
    <div class="mui-slider mui-fullscreen">
			<div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
          <a href="#" :class="{'mui-control-item': true, 'mui-active': item.id===0}" v-for="item in categoryList" :key="item.id" @click="getImagesById(item.id)">
						{{ item.title }}
					</a>
        </div>
			</div>
		</div>

		<!-- 图片列表 -->
		<ul class="category-img-list">
      <li class="img-list-item" v-for="item in imagesList" :key="item.id" @click="goInfo(item.id)">
        <img v-lazy="item.img_url"> 
        <div>
          <h2>{{item.title}}</h2>
          <p>{{item.zhaiyao}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.js'

export default {
  mounted() {
    mui('.mui-scroll-wrapper').scroll({
	    deceleration: 0.0005 
    });
    this.getPhotoTitle();
    this.getImagesById(0)
  },
  data() {
    return {
      categoryList: [],
      imagesList: []
    }
  },
  methods: {
    getPhotoTitle() {
      this.$http.get('http://vue.studyit.io/api/getimgcategory')
      .then(res => {
        if (res.data.status === 0) {
          // this.categoryList = res.data.message;
          this.categoryList = [{id: 0, title: '全部'},...res.data.message]
        }
      })
    },
    getImagesById(id) {
      this.$http.get(`http://vue.studyit.io/api/getimages/${id}`)
      .then(res => {
        if (res.data.status === 0) {
          console.log(res.data);
          this.imagesList = res.data.message
        }
      })
    },
    goInfo(id) {
      this.$router.push({name: 'photoinfo', params: {id}})
    }
  }
};
</script>

<style lang="scss">
.mui-slider-indicator.mui-segmented-control {
  background-color: #fff;
}

.mui-fullscreen {
  position: fixed;
  top: 40px;
  height: 38px;
}

/* scroll滚动警告的处理方式参考：http://www.jianshu.com/p/baf61adc8667 */
* {
  touch-action: none;
}

.category-img-list {
  list-style: none;
  padding: 5px;
  padding-top: 30px;

  img[lazy=loading] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
  .img-list-item {
    position: relative;
    margin-bottom: 5px;

    div {
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.2);
      color: #fff;

      h2 {
        font-size: 16px;
      }

      p {
        color: #fff;
        margin-bottom: 0px;
      }
    }

    img {
      display: block;
      width: 100%;
    }
    
  }
}
</style>
