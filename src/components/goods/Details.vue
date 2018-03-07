<template>
  <div class="details content">
    <h2>{{ desc.title }}</h2> 
    <div class="details-content" v-html="desc.content">
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getDescById()
  },
  data() {
    return {
      desc: {}
    }
  },
  methods: {
    getDescById() {
      this.$http.get(`http://vue.studyit.io/api/goods/getdesc/${this.$route.params.id}`)
      .then(res => {
        console.log(res);
        if (res.data.status === 0) {
          this.desc = res.data.message[0]
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .details {
    h2 {
      font-size: 20px;
      text-align: center;
      color: #26a2ff;
      padding: 10px 0;
    }

    .details-content {
      border-top: 1px solid #ccc;
      margin: 10px 4px 0 4px;
      padding-top: 10px;

      table {
        width: 100%
      }
    }

    img {
      width: 100%;
      display: block;
    }
  }
</style>
