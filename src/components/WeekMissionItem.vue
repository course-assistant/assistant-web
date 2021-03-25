<template>
  <div class="week-mission" @click="changeWeekMission">
    <p>{{ week_mission.week_mission_name }}</p>

    <el-tag
      v-if="week_mission.week_mission_status === 1"
      class="tag"
      size="medium"
      type="primary"
    >
      已发布
    </el-tag>

    <el-tag v-else class="tag" size="medium" type="info">未发布</el-tag>
  </div>
</template>

<script>
export default {
  props: ['week_mission'],

  methods: {
    changeWeekMission() {
      this.$emit('changeWeekMission', this.week_mission.week_mission_id);
    }
  },
}
</script>

<style lang="less" scoped>
.week-mission {
  width: 100%;
  height: 95px;
  background: #fff;
  border-bottom: solid 1px #f2f2f2;
  cursor: pointer;

  display: flex;
  align-items: center;
  color: #181e33;

  .tag {
    margin: 0 20px;
  }

  &:hover {
    background: #f7fafc;
  }

  p {
    margin-left: 40px;
  }
}
</style>