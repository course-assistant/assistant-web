<template>
  <div class="course-item" @click="fun">
    <img
      class="cover"
      src="http://p.ananas.chaoxing.com/star3/240_130c/b7b9a80175b2d80938d72fcbfdabce24.jpg"
      alt=""
    />
    <h4 class="course-name">网站建设技术</h4>
    <p class="teacher-name">张妍琰</p>
  </div>
</template>

<script>
export default {
  methods: {
    fun() {
      this.$message.info('点击');
      const newtab = this.$router.resolve('/course');
      window.open(newtab.href, '_blank');
    }
  }
}
</script>

<style lang="less" scoped>
.course-item {
  width: 240px;
  height: 200px;
  margin: 20px;
  cursor: pointer;

  .cover {
    width: 240px;
    height: 130px;
    border-radius: 12px;
    object-fit: cover;
  }

  .course-name {
    margin: 0;
    height: 35px;
    line-height: 35px;
  }
  .teacher-name {
    margin: 0;
    height: 30px;
    line-height: 30px;
  }
}
</style>