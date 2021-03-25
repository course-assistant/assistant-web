<template>
  <div class="container">
    <div class="round-div">
      <div class="head" style="display: flex">
        <p @click="to('WeekMissionList')">周任务</p>
        <p @click="to('WeekLessonMission')">第01周任务</p>
        <p @click="to('WeekMissionDetail')">任务01</p>
      </div>

      <router-view class="week-mission-content" />

      <!-- <div class="weekmission">
        <div class="weekmission-list" style="margin-right: 10px">
          <WeekMissionItem
            v-for="(weekMission, index) in weekMissions"
            :key="index"
            :week-mission="weekMission"
            @changeWeekMission="changeWeekMission(weekMission.week_id)"
          />
        </div>
      </div> -->

      <!-- 
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

          <br />

          <h3>
            主要目标
            <el-button
              class="edit"
              type="primary"
              round
              @click="addGoalDialogVisible = true"
            >
              添加目标
            </el-button>
          </h3>
          <ul>
            <li v-for="(goal, index) in currWeekGoal" :key="index">
              {{ goal.week_goal_title }} :
              {{ goal.week_goal_content }}

              <button
                class="delete"
                @click.stop="deleteGoal(goal.week_goal_id)"
              >
                删除
              </button>
            </li>
          </ul>
        </div> -->
    </div>

    <!-- 对话框 -->
    <!-- 编辑周任务的对话框 -->
    <!-- <el-dialog
      title="添加"
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
    </el-dialog> -->

    <!-- 添加周目标的对话框 -->
    <!-- <el-dialog
      title="添加目标"
      :visible.sync="addGoalDialogVisible"
      width="500px"
    >
      <el-form :model="addGoalDialogForm">
        <el-form-item>
          <el-input
            placeholder="请输入目标标题"
            v-model="addGoalDialogForm.title"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入目标内容"
            v-model="addGoalDialogForm.content"
            clearable
          >
          </el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addGoalDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertGoal">确 定</el-button>
      </div>
    </el-dialog> -->
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
      currWeekGoal: [
        {
          week_goal_id: 0,
          week_id: 0,
          week_goal_title: '记忆目标',
          week_goal_content: 'html'
        }
      ],

      editMissionDialogVisible: false,
      editMissionDialogForm: {
        content: ''
      },

      addGoalDialogVisible: false,
      addGoalDialogForm: {
        title: '',
        content: ''
      },
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

    to(name) {
      if (this.$route.name === name) {
        return;
      }
      this.$router.push({ name: name });
    },


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
      // console.log('目标');
      // console.log(data);
      this.currWeekGoal = data.data;
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


    // 点击确定添加周目标
    async insertGoal() {
      if (this.addGoalDialogForm.title.trim() === '' || this.addGoalDialogForm.content.trim() === '') {
        this.$message.warning('请输入');
        return;
      }
      let [data, err] = await this.$awaitWrap(this.$post('weekgoal/insert', {
        id: this.currWeekMission.week_id,
        title: this.addGoalDialogForm.title,
        content: this.addGoalDialogForm.content
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      await this.changeWeekMission(this.currWeekMission.week_id);
      this.addGoalDialogVisible = false;
      this.$message.success(data.msg);
    },


    // 点击删除周目标
    deleteGoal(id) {
      this.$cfm('确定删除', async () => {
        let [data, err] = await this.$awaitWrap(this.$post('weekgoal/delete', { id }));
        if (err) {
          this.$message.warning(err);
          return;
        }
        await this.changeWeekMission(this.currWeekMission.week_id);
        this.$message.success(data.msg);
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

    .week-mission-content {
      width: 100%;
      height: calc(100% - 100px);
      // background: salmon;
    }

    /////

    .head {
      margin-left: 20px;
      p {
        margin: 20px 10px;
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