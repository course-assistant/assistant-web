<template>
  <div class="container">
    <div class="round-div">
      <div class="head">
        <p>周任务</p>
      </div>

      <div class="weekmission">
        <div class="weekmission-list">
          <WeekMissionItem
            v-for="(weekMission, index) in weekMissions"
            :key="index"
            :week-mission="weekMission"
            @changeWeekMission="changeWeekMission"
          />
        </div>

        <div class="weekmission-detail">
          <div class="name">{{ currWeekMission.week_mission_name }}</div>

          <div class="content">{{ currWeekMission.week_mission_content }}</div>
        </div>
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
          week_mission_name: '第01周'
        },
        {
          week_mission_name: '第02周'
        },
        {
          week_mission_name: '第03周'
        }
      ],

      // 当前显示的周任务
      currWeekMission: {
        week_id: 1,
        week_mission_content: "任务1 任务2",
        week_mission_id: 1,
        week_mission_name: "第01周 任务",
        week_mission_status: 1
      }
    }
  },

  components: {
    WeekMissionItem
  },

  methods: {
    // 切换正在显示的周任务
    async changeWeekMission(id) {
      let [d, e] = await this.$awaitWrap(this.$get('weekmission/selectbyid', {
        id
      }));
      this.currWeekMission = d.data;
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
    this.courseId = this.$route.query.courseid;
    // 刷新左边的周任务
    let [data, err] = await this.$awaitWrap(this.$get('weekmission/selectbycourseid', {
      id: this.courseId
    }));
    if (err) {
      this.$message.warning(err);
      return;
    }
    this.weekMissions = data.data;
    console.log(this.weekMissions);
    // 再加载第一个周任务
    let [d, e] = await this.$awaitWrap(this.$get('weekmission/selectbyid', {
      id: this.weekMissions[0].week_mission_id
    }));
    this.currWeekMission = d.data;
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

    .head {
      p {
        margin: 20px 30px;
        font-size: 22px;
      }
    }

    .weekmission {
      width: 100%;
      height: calc(100% - 100px);
      display: flex;

      .weekmission-list {
        flex: 1;
        height: 100%;
        overflow: auto;
      }

      .weekmission-detail {
        flex: 3;
        margin: 0 30px 0 10px;
        background: palegoldenrod;
      }
    }
  }
}
</style>