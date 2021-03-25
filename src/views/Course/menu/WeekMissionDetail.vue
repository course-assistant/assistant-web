<template>
  <div class="week-mission-detail">
    <div class="week-mission">
      <el-divider></el-divider>
      <!-- 主要内容 -->
      <div class="main-content">
        <b>主要内容</b>
        <div class="content">
          <p v-html="convertHtml(main_content)"></p>
        </div>
      </div>

      <el-divider></el-divider>

      <!-- 主要目标 -->
      <div class="main-goal">
        <b>主要目标</b>
        <div class="goal">
          <div class="goal-item" v-for="(goal, index) in goals" :key="index">
            <span>{{ goal.goal_name }}</span>
            ：
            <p v-html="convertHtml(goal.goal_content)"></p>
          </div>
        </div>
      </div>

      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 主要内容
      main_content: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；\n在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等',

      // 主要目标
      goals: [
        {
          goal_name: '记忆目标',
          goal_content: '与现实生活一致：与现实生活的流程、逻辑保持一致\n循用户习惯的语言和概念；\n在界面中一致',
        },
        {
          goal_name: '记忆目标',
          goal_content: '与现实生活一致：与现实生活的流程、逻辑保持一致\n循用户习惯的语言和概念；\n在界面中一致',
        },
      ],

      // goal: {
      //   goal_name: '记忆目标',
      //   goal_content: '与现实生活一致，与现实生活的流程、逻辑保持一致\n循用户习惯的语言和概念；\n在界面中一致',
      // },
    }
  },
}
</script>

<style lang="less" scoped>
.week-mission-detail {
  width: calc(100% - 80px);
  margin: 0 auto;

  .week-mission {
    width: calc(100% - 80px);
    height: 100%;
    padding: 0 40px;
    border: solid 1px #ebebeb;
    // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

    .main-content {
    }
    .main-goal {
      .goal-item {
        display: flex;
      }
    }
  }
}
</style>