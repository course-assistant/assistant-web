<template>
  <div class="container">
    <div class="round-div">
      <!-- 导航 -->
      <div class="nav">
        <router-link
          class="link"
          :to="'/course/' + course_id + '/week-mission/'"
        >
          周任务
        </router-link>
      </div>

      <!-- 周的列表 -->
      <div>
        <router-link :to="'/course/' + course_id + '/week-mission/week-mission-list/' + 22">11</router-link><br>
        <router-link to="/">22</router-link><br>
        <router-link to="/">33</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      course_id: 0,
    }
  },



  // 加载数据
  async beforeMount() {
    this.course_id = this.$route.params.course_id;
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

    .nav {
      margin: 20px 30px;
      display: flex;
      font-size: 26px;

      .link {
        text-decoration: none;
        color: #000;

        // &:link {
        //   text-decoration: none;
        // }
        // &:visited {
        //   text-decoration: none;
        // }
        // &:hover {
        //   text-decoration: none;
        // }
        // &:active {
        //   text-decoration: none;
        // }
      }
    }
  }
}
</style>