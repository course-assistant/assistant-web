<template>
  <div class="container">
    <div class="round-div">
      <div class="div">
        <div>基础数据</div>
        <div>学生数据</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      courseId: 0
    }
  },

  beforeCreate() {
    // 检有没有携带参数
    if (this.$route.params.course_id === 0) {
      this.$router.replace('/');
    }
  },

  // 加载数据
  async beforeMount() {
    this.courseId = this.$route.query.course_id;
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
    display: flex;
    justify-content: center;
    align-items: center;

    .div {
      width: calc(100% - 40px);
      height: calc(100% - 40px);
      overflow: auto;
    }
  }
}
</style>