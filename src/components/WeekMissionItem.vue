<template>
  <div class="week-mission" @click="changeWeekMission">
    <p>{{ weekMission.week_mission_name }}</p>
  </div>
</template>

<script>
export default {
  props: ['weekMission'],

  methods: {
    changeWeekMission() {
      this.$emit('changeWeekMission', this.weekMission.week_mission_id);
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

  &:hover {
    background: #f7fafc;
  }

  p {
    margin-left: 40px;
  }
}
</style>