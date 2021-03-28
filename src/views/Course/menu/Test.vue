<template>
  <div class="container">
    <div
      class="round-div"
      v-loading="loading"
      element-loading-text="正在加载中，请稍等..."
    >
      <h1>随堂测试</h1>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      course_id: 0,
      loading: false,
    }
  },


  // 加载数据
  beforeMount() {
    this.course_id = this.$route.params.course_id;
  },

  methods: {

  },

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
    margin-top: 20px;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    overflow: auto;
  }
}
</style>