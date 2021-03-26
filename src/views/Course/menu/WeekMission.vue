<template>
  <div class="container">
    <div class="round-div">
      <!-- 导航 -->
      <div class="nav">
        <!-- 一级 -->
        <!-- <router-link
          class="link"
          :to="'/course/' + course_id + '/week-mission/'"
        >
          周任务
        </router-link> -->
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="'/course/' + course_id + '/week-mission/'"
            >周任务</el-breadcrumb-item
          >
        </el-breadcrumb> -->

        <el-breadcrumb class="f-size" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="'/course/' + course_id + '/week-mission/'">
            周任务
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 周的列表 -->
      <div class="week-mission-list">
        <div class="weekmission-list" style="margin-right: 10px">
          <WeekItem v-for="(week, index) in weeks" :key="index" :week="week" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WeekItem from '@/components/WeekItem.vue';

export default {

  data() {
    return {
      course_id: 0,

      weeks: [
        {
          week_id: 0,
          week_name: '第01周',
          week_status: 1,
        },
        {
          week_id: -1,
          week_name: '第02周',
          week_status: 2,
        },
        {
          week_id: -2,
          week_name: '第03周',
          week_status: 2,
        }
      ],



    }
  },
  components: { WeekItem },



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

      .f-size {
        font-size: 16px;
        margin-left: 12px;
      }
    }

    .week-mission-list {
      width: 100%;
      overflow: auto;
    }
  }
}
</style>