<template>
  <div class="course-item" @click="fun">
    <img
      class="cover"
      src="http://p.ananas.chaoxing.com/star3/240_130c/b7b9a80175b2d80938d72fcbfdabce24.jpg"
      alt=""
    />
    <h4 class="course-name">{{ courseName }}</h4>
    <p class="teacher-name">{{ teacherName }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 课程的基本属性
      courseId: 1,
      courseName: '网站建设技术',
      teacherName: '张妍琰'
    }
  },
  methods: {
    fun() {
      let routeUrl = this.$router.resolve({
        path: '/course',
        query: { courseid: this.courseId }
      });
      window.open(routeUrl.href, '_blank');
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