<template>
  <div class="course-item" @click="fun">
    <img class="cover" :src="courseData.course_cover" alt="" />
    <h4 class="course-name">{{ courseData.course_name }}</h4>
    <p class="teacher-name">{{ courseData.teacher_name }}</p>
  </div>
</template>

<script>
export default {

  data() {
    return {
      courseData: {
        // 课程的基本属性
        course_id: 1,
        course_name: '课程名',
        teacher_name: '教师名',
        course_cover: 'http://p.ananas.chaoxing.com/star3/240_130c/b7b9a80175b2d80938d72fcbfdabce24.jpg'
      }
    }
  },

  props: ['course'],

  methods: {
    fun() {
      let routeUrl = this.$router.resolve({
        path: '/course',
        query: { courseid: this.courseData.course_id }
      });
      window.open(routeUrl.href, '_blank');
    }
  },

  // 接收父组件传来的数据
  beforeMount() {
    this.courseData = this.course;
    console.log(this.course);

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