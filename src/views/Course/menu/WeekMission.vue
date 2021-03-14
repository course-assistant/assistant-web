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
            @changeWeekMission="changeWeekMission"
          />
        </div>

        <div class="weekmission-detail">
          <h2>{{ currWeekMission.week_mission_name }}</h2>

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
            编辑周任务
          </el-button>

          <div class="content" v-html="content"></div>

          <!-- <p v-html="currWeekMission.week_mission_content">3</p> -->
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

      weekMissions: [
        {
          week_mission_name: '第01周'
        },
        {
          week_mission_name: '第02周'
        },
        {
          week_mission_name: '第03周'
        }
      ],

      // 当前显示的周任务
      currWeekMission: {
        week_id: 1,
        week_mission_content: "任务1 任务2",
        week_mission_id: 1,
        week_mission_name: "第01周 任务",
        week_mission_status: 1
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
    // 切换正在显示的周任务
    async changeWeekMission(id) {
      let [d, e] = await this.$awaitWrap(this.$get('weekmission/selectbyid', {
        id
      }));
      this.currWeekMission = d.data;
      console.log(this.currWeekMission);
    },


    // 点击修改周任务
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
      await this.changeWeekMission(this.currWeekMission.week_mission_id,);
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
    console.log(this.weekMissions);
    // 再加载第一个周任务
    let [d, e] = await this.$awaitWrap(this.$get('weekmission/selectbyid', {
      id: this.weekMissions[0].week_mission_id
    }));
    this.currWeekMission = d.data;
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

        .edit {
          margin: 12px 0;
        }
      }
    }
  }
}
</style>