<template>
  <div class="container">
    <div class="round-div">
      <div class="head">
        <p>周任务</p>
      </div>

      <div class="weekmission-list">
        <WeekMissionItem
          v-for="(weekMission, index) in weekMissions"
          :key="index"
          :week-mission="weekMission"
        />
      </div>
    </div>
  </div>
</template>

<script>
import WeekMissionItem from '@/components/WeekMissionItem.vue';

export default {

  data() {
    return {
      courseId: 0,

      weekMissions: [
        {
          week_name: '第01周'
        },
        {
          week_name: '第02周'
        },
        {
          week_name: '第03周'
        },
      ]
    }
  },

  components: {
    WeekMissionItem
  },

  beforeCreate() {
    // 检有没有携带参数
    if (this.$route.query.courseid === 0) {
      this.$router.replace('/');
    }
  },

  // 加载数据
  async beforeMount() {
    this.courseId = this.$route.query.courseid;
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
    overflow: auto;

    .head {
      p {
        margin: 20px 30px;
        font-size: 22px;
      }
    }

    .weekmission-list {
      width: 100%;
      // height: 100%;
    }
  }
}
</style>