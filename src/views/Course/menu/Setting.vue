<template>
  <div class="container">
    <div class="round-div">
      <div style="margin: 20px 30px">
        <div class="section">
          <p class="title">课程封面</p>
          <img class="cover" :src="course.cover" alt="" />
        </div>

        <div class="section">
          <p class="title">课程名称</p>
          <p>{{ course.name }}</p>
        </div>

        <div class="section">
          <p class="title">课程教师</p>
          <p>{{ course.teacher }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      courseId: 0,

      course: {
        cover: 'https://tanyiqu.oss-cn-hangzhou.aliyuncs.com/assistant/img/course-cover/01.jpg',
        name: '移动终端开发',
        teacher: '张妍琰'
      }
    }
  },

  beforeCreate() {
    // 检有没有携带参数
    if (this.$route.query.courseid === 0) {
      this.$router.replace('/');
    }
  },

  // 加载数据
  async beforeMount() {

  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: #f2f4f7;
  display: flex;
  justify-content: center;
  align-items: center;

  .round-div {
    width: 100%;
    min-width: 1000px;
    height: calc(100% - 60px);
    margin: 30px;
    margin-top: 30px;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .section {
      margin-bottom: 20px;
      .title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .cover {
        width: 280px;
        height: 168px;
        border-radius: 6px;
      }
    }
  }
}
</style>