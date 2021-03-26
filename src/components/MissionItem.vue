<template>
  <div class="lesson-mission-item" @click="toMissionDetail">
    <el-checkbox class="checked" v-model="mission.checked"></el-checkbox>

    <div class="head">
      <b style="margin-right: 20px">{{ mission.week_mission_name }}</b>

      <div style="margin-right: 20px">
        <el-tag
          v-if="mission.week_mission_type == 1"
          class="tag"
          size="medium"
          type="primary"
        >
          理论课
        </el-tag>
        <el-tag v-else class="tag" size="medium" type="info">实验课</el-tag>
      </div>

      <div>
        <el-tag
          v-if="mission.week_mission_status == 1"
          class="tag"
          size="medium"
          type="primary"
        >
          已发布
        </el-tag>
        <el-tag v-else class="tag" size="medium" type="info">未发布</el-tag>
      </div>
      <span style="margin-left: 20px; color: #999">
        {{ mission.views }}人已查看
      </span>
    </div>

    <div class="info">
      <b style="margin-right: 10px">{{ mission.teacher_name }}</b>
      <span>创建</span>
    </div>

    <div class="opts">
      <el-link type="primary" :underline="false" @click.stop="onEdit">
        编辑
      </el-link>
      <el-link
        type="primary"
        :underline="false"
        style="margin-left: 20px"
        @click.stop="onDelete"
      >
        删除
      </el-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['mission'],

  methods: {
    // 跳转到详情
    toMissionDetail() {
      // console.log('detail');
      this.$router.push({
        path: `/course/${this.$route.params.course_id}/week-mission/week-mission-list/${this.$route.params.week_id}/week-mission-detail/${this.mission.week_mission_id}`
      });
    },

    onEdit() {
      this.$emit('edit', this.mission.week_mission_id);
    },

    onDelete() {
      this.$emit('delete', this.mission.week_mission_id);
    },
  },

  beforeMount() {
    console.log(this.mission);
  },
}
</script>

<style lang="less" scoped>
.lesson-mission-item {
  position: relative;
  //   width: 910px;
  width: 100%;
  height: 130px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

  &:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .checked {
    position: absolute;
    top: 30px;
    left: 30px;
  }

  .head {
    position: absolute;
    display: flex;
    align-items: center;
    top: 22px;
    left: 60px;
    color: #333333;
    font-size: 16px;
  }

  .info {
    position: absolute;
    top: 78px;
    left: 60px;
    color: #999999;
    font-size: 14px;
  }

  .opts {
    position: absolute;
    right: 30px;
    bottom: 30px;
  }
}
</style>