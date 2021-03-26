<template>
  <div class="container">
    <div class="round-div">
      <!-- 导航 -->
      <div class="nav">
        <!-- 一级 -->
        <router-link
          class="link"
          :to="'/course/' + $route.params.course_id + '/week-mission/'"
        >
          周任务
        </router-link>

        /

        <!-- 二级 -->
        <router-link   class="link" :to="'/course/' + $route.params.course_id + '/week-mission/week-mission-list/' + $route.params.week_id + '/'">
           第01周
        </router-link>

        /

        <!-- 三级级 -->
        <router-link   class="link" to=""> 任务01 </router-link>
      </div>

      <div class="week-mission-detail">
        <div class="week-mission">
          <el-divider></el-divider>
          <!-- 主要内容 -->
          <div class="main-content">
            <div class="title"><b> 主要内容</b></div>
            <p class="content" v-html="convertHtml(main_content)"></p>
          </div>

          <el-divider></el-divider>

          <!-- 主要目标 -->
          <div class="main-goal">
            <div class="title"><b> 主要目标</b></div>

            <div class="goal">
              <div
                class="goal-item"
                v-for="(goal, index) in goals"
                :key="index"
              >
                <span class="content">{{ goal.goal_name }}：</span>
                <p class="content" v-html="convertHtml(goal.goal_content)"></p>
                <el-link
                  class="delete"
                  icon="el-icon-delete"
                  type="info"
                  :underline="false"
                ></el-link>
              </div>
            </div>
          </div>

          <el-divider></el-divider>
        </div>
      </div>
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
    }
  },
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
      // border-bottom: 1px solid #f2f2f2;

      .link {
        text-decoration: none;
        color: #000;
         font-weight: bold;
      }
    }

    .week-mission-detail {
      width: calc(100% - 80px);
      margin: 0 auto;

      .week-mission {
        width: calc(100% - 80px);
        height: 100%;
        padding: 0 40px;
        border: solid 1px #ebebeb;
        // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

        .title {
          // height: 40px;
          // line-height: 40px;
          margin-bottom: 10px;
        }

        .content {
          line-height: 23px;
        }

        .main-content {
        }

        .main-goal {
          .goal-item {
            position: relative;
            display: flex;
            margin-bottom: 10px;
            cursor: pointer;

            .delete {
              display: none;
              position: absolute;
              top: 5px;
              right: 15px;
            }

            &:hover {
              background: #ebebeb7f;
              .delete {
                display: block;
              }
            }
          }
        }
      }
    }
  }
}
</style>