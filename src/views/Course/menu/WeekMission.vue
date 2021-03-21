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
            @changeWeekMission="changeWeekMission(weekMission.week_id)"
          />
        </div>

        <div class="weekmission-detail">
          <h2>{{ currWeekMission.week_mission_name }}</h2>

          <h3>
            主要内容
            <el-button
              class="edit"
              type="primary"
              round
              @click="
                editMissionDialogForm.content =
                  currWeekMission.week_mission_content;
                editMissionDialogVisible = true;
              "
            >
              编辑主要内容
            </el-button>
          </h3>
          <div class="content" v-html="content"></div>

          <h3>记忆目标</h3>
          <ul>
            <li v-for="(goal, index) in currWeekGoal.remember" :key="index">
              {{ goal.week_goal_content }}
              <button
                class="delete"
                @click.stop="deleteGoal(goal.week_goal_id)"
              >
                删除
              </button>
            </li>
          </ul>

          <h3>理解目标</h3>
          <ul>
            <li v-for="(goal, index) in currWeekGoal.understand" :key="index">
              {{ goal.week_goal_content }}
              <button
                class="delete"
                @click.stop="deleteGoal(goal.week_goal_id)"
              >
                删除
              </button>
            </li>
          </ul>

          <h3>应用目标</h3>
          <ul>
            <li v-for="(goal, index) in currWeekGoal.apply" :key="index">
              {{ goal.week_goal_content }}
              <button
                class="delete"
                @click.stop="deleteGoal(goal.week_goal_id)"
              >
                删除
              </button>
            </li>
          </ul>

          <h3>创造目标</h3>
          <ul>
            <li v-for="(goal, index) in currWeekGoal.create" :key="index">
              {{ goal.week_goal_content }}
              <button
                class="delete"
                @click.stop="deleteGoal(goal.week_goal_id)"
              >
                删除
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 对话框 -->
    <!-- 编辑周任务的对话框 -->
    <el-dialog
      title="编辑周任务"
      :visible.sync="editMissionDialogVisible"
      width="45%"
    >
      <el-form :model="editMissionDialogForm" label-position="left">
        <el-form-item>
          <el-input
            type="textarea"
            :rows="12"
            placeholder="请输入内容"
            v-model="editMissionDialogForm.content"
          >
          </el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editMissionDialogVisible = false"> 取 消 </el-button>
        <el-button type="primary" @click="onEditWeekMission"> 确 定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import WeekMissionItem from '@/components/WeekMissionItem.vue';

export default {

  data() {
    return {
      courseId: 0,

      // 所有的周
      weekMissions: [
        // {
        //   week_mission_name: '第01周'
        // },
        // {
        //   week_mission_name: '第02周'
        // },
        // {
        //   week_mission_name: '第03周'
        // }
      ],

      // 当前显示的周任务
      currWeekMission: {
        week_id: 0,
        week_mission_content: "任务1 任务2",
        week_mission_id: 1,
        week_mission_name: "第01周 任务",
        week_mission_status: 1
      },

      // 周目标
      currWeekGoal: {
        // 记忆目标
        remember: [{
          week_goal_id: 0,
          week_goal_content: 'HTML、CSS、JavaScript等语法'
        }],
        // 理解目标
        understand: [
          {
            week_goal_id: 0,
            week_goal_content: 'CSS中的动画'
          },
          {
            week_goal_id: 0,
            week_goal_content: '熟悉JQuery框架'
          },
        ],
        // 应用目标
        apply: [{
          week_goal_id: 0,
          week_goal_content: '使用HTML、CSS、JavaScript进行网页编写'
        }],
        // 操作目标
        create: [{
          week_goal_id: 0,
          week_goal_content: '使用所学的技术，编写一个简单的登录页面'
        }],
      },

      editMissionDialogVisible: false,
      editMissionDialogForm: {
        content: ''
      }
    }
  },

  computed: {
    content() {
      let content = this.currWeekMission.week_mission_content.replace(/\n/g, '<br>');
      return content;
    }
  },

  components: {
    WeekMissionItem
  },

  methods: {
    // 点击切换正在显示的周
    async changeWeekMission(id) {
      // 刷新周的周任务
      await this.refreshWeekMission(id);
      // 刷新周的周目标
      await this.refreshWeekGoal(id);
    },


    // 刷新周任务
    async refreshWeekMission(id) {
      let [data, err] = await this.$awaitWrap(this.$get('weekmission/selectbyweekid', { id }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      this.currWeekMission = data.data;
    },

    // 刷新周目标
    async refreshWeekGoal(id) {
      let [data, err] = await this.$awaitWrap(this.$get('weekgoal/selectbyweekid', { id }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      // 将周任务按类型 分类
      let remember = [];
      let understand = [];
      let apply = [];
      let create = [];
      data.data.forEach(goal => {
        switch (goal.week_goal_type) {
          case 1:
            remember.push(goal);
            break;
          case 2:
            understand.push(goal);
            break;
          case 3:
            apply.push(goal);
            break;
          case 4:
            create.push(goal);
            break;
        };
      });
      this.currWeekGoal.remember = remember;
      this.currWeekGoal.understand = understand;
      this.currWeekGoal.apply = apply;
      this.currWeekGoal.create = create;
    },


    // 点击修改周任务内容
    async onEditWeekMission() {
      let [data, err] = await this.$awaitWrap(this.$post('weekmission/updatecontent', {
        id: this.currWeekMission.week_mission_id,
        content: this.editMissionDialogForm.content
      }));
      this.editMissionDialogVisible = false;
      if (err) {
        this.$message.warning(err);
        return;
      }
      this.$message.success(data.msg);
      // 刷新内容
      await this.changeWeekMission(this.currWeekMission.week_id,);
    },


    // 点击删除周目标
    deleteGoal(id) {
      this.$cfm('确定删除', async () => {
        let [data, err] = await this.$awaitWrap(this.$post('weekgoal/delete', { id }));
        if (err) {
          this.$message.warning(err);
          return;
        }
        this.$message.success(data.msg);
        await this.changeWeekMission(this.currWeekMission.week_id);
      });
    },
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

    // 加载第一个周
    await this.changeWeekMission(this.weekMissions[0].week_id);
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
        border-right: solid 1px #f2f2f2;
        overflow: auto;
      }

      .weekmission-detail {
        flex: 3;
        margin: 0 30px 0 10px;

        // background: salmon;

        .edit {
          margin: 12px 0;
        }

        li {
          // width: fit-content;
          display: flex;
          cursor: pointer;

          .delete {
            display: none;
          }

          &:hover {
            .delete {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>