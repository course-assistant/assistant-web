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
  </div>
</template>

<script>
import WeekMissionItem from '@/components/WeekMissionItem.vue';

export default {
  data() {
    return {
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

}
</script>

<style lang="less" scoped>
.week-mission-list {
}
</style>