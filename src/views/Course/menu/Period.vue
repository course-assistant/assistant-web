<template>
  <div class="container">
    <div class="round-div" v-loading="loading">
      <ul>
        <ul>
          第一周
          <li>001</li>
          <li>002</li>
        </ul>

        <ul>
          第二周
          <li>003</li>
        </ul>

        <ul>
          第三周
          <li>004</li>
          <li>005</li>
        </ul>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      courseId: 0,

      loading: true
    }
  },

  beforeCreate() {
    // 检有没有携带参数
    if (this.$route.query.courseid === 0) {
      this.$router.replace('/');
      console.log(0);
    }
  },

  // 加载数据
  async beforeMount() {
    this.courseId = this.$route.query.courseid;
    // let [data, err] = await this.$awaitWrap(this.$get('weekperiod/select', {
    //   id: this.courseId
    // }));
    // if (err) {
    //   this.$message.warning(err);
    //   return;
    // }
    // console.log(data);

    setTimeout(() => {
      this.loading = false;
    }, 500);

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
  }
}
</style>