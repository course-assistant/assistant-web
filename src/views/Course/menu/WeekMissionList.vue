<template>
  <div class="week-mission-list">
    <div class="weekmission-list" style="margin-right: 10px">
      <WeekMissionItem
        v-for="(week_mission, index) in weekMissions"
        :key="index"
        :week_mission="week_mission"
        @changeWeekMission="changeWeekMission(week_mission.week_id)"
      />
    </div>

    <div>
      <router-link
        :to="'/course/' + $route.params.course_id + '/week-mission/week-mission-list/' + $route.params.week_id + '/week-mission-detail/' + 222"
      >
        11
      </router-link>
      <br />
    </div>
  </div>
</template>

<script>
import WeekMissionItem from '@/components/WeekMissionItem.vue';

export default {
  data() {
    return {

      week_id: 0,

      weekMissions: [
        {
          week_mission_name: '第01周',
          week_mission_status: 1,
        },
        {
          week_mission_name: '第02周',
          week_mission_status: 2,
        },
        {
          week_mission_name: '第03周',
          week_mission_status: 2,
        }
      ],
    }
  },
  components: { WeekMissionItem },

  beforeMount() {
    this.week_id = this.$route.params.week_id;
  }

}
</script>

<style lang="less" scoped>
.week-mission-list {
  width: 100%;
  overflow: auto;
}
</style>