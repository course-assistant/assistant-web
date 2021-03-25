<template>
  <div class="week-lesson-mission">
    <!-- 操作框 -->
    <div class="tools">
      <el-checkbox v-model="selectedAll" style="margin-left: 30px">
        全选
      </el-checkbox>
      <div style="margin-right: 30px">
        <el-button type="text">发布选中任务</el-button>
        <el-button type="text">删除选中任务</el-button>
      </div>
    </div>

    <!-- 列表 -->
    <div class="mission-list">
      <LessonMessionItem
        class="mission-item"
        v-for="(mission, index) in LessonMissions"
        :key="index"
        :lesson_mission="mission"
      />
    </div>

    <!-- 操作框 -->
    <div class="add">
      <i class="el-icon-plus"></i>
    </div>
  </div>
</template>

<script>
import LessonMessionItem from '@/components/LessonMissionItem.vue';

export default {
  data() {
    return {

      selectedAll: false,

      LessonMissions: [
        {
          name: '任务01',
          date: '2021-1-1',
          teacher: '张妍琰',
          status: 1,
          type: 1,
          checked: true,
        },
        {
          name: '任务01',
          date: '2021-1-1',
          teacher: '张妍琰',
          status: 2,
          type: 2,
          checked: false,
        },
      ],
    }
  },

  components: { LessonMessionItem },
}
</script>

<style lang="less" scoped>
.week-lesson-mission {
  background: #fff;
  width: calc(100% - 80px);
  // width: 500px;
  margin: 0 auto;

  .tools {
    position: relative;
    height: 60px;
    margin: 0 auto;
    margin-top: 10px;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .mission-list {
    width: 100%;
    .mission-item {
      margin-top: 20px;
    }
  }

  .add {
    width: 150px;
    height: 100px;
    margin-top: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    cursor: pointer;
    &:hover {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    display: flex;
    justify-content: center;
    align-items: center;

    i {
      color: #999999;
      font-size: 60px;
    }
  }
}
</style>