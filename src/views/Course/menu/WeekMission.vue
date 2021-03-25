<template>
  <div class="container">
    <div class="round-div">
      <div class="head" style="display: flex">
        <p @click="to('week-mission-list')">周任务</p>
        <p>/</p>
        <p @click="to('week-lesson-mission')">第01周任务</p>
        <p>/</p>
        <p @click="to('week-mission-detail')">任务01</p>
      </div>

      <router-view class="week-mission-content" />
    </div>
  </div>
</template>

<script>
import WeekMissionItem from '@/components/WeekMissionItem.vue';

export default {

  data() {
    return {
      courseId: 0,

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

    to(path) {

      this.$router.push({
        path: `/course/21/week-mission/${path}`
      });

      // this.$router.push({
      //   path: `/course/21/week-mission/week-lesson-mission/3`
      // });
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
    // this.courseId = this.$route.query.courseid;
    this.courseId = this.$route.params.courseid;
    // 默认显示周任务列表
    this.$router.push({
      path: `/course/${this.courseId}/week-mission/week-mission-list`
    });

    /*
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
    */
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
      // width: 100%;
      height: calc(100% - 100px);
      // background: salmon;
    }

    /////

    .head {
      margin-left: 20px;
      p {
        margin: 20px 10px;
        font-size: 22px;
        height: 30px;
        line-height: 30px;
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