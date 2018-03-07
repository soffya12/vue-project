<template>
  <Comment :commentId="$route.params.id"></Comment>
</template>

<script>
import Comment from '../common/Comment.vue'
export default {
  components: {Comment}
}
</script>

<style>

</style>
