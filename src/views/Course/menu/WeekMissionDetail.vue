<template>
  <div class="container">
    <div
      class="round-div"
      v-loading="loading"
      element-loading-text="拼命加载中"
    >
      <!-- 导航 -->
      <div class="nav">
        <el-breadcrumb class="f-size" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item
            :to="'/course/' + $route.params.course_id + '/week-mission/'"
          >
            周任务
          </el-breadcrumb-item>

          <el-breadcrumb-item
            :to="
              '/course/' +
              $route.params.course_id +
              '/week-mission/week-mission-list/' +
              $route.params.week_id +
              '/'
            "
          >
            第01周
          </el-breadcrumb-item>
          <el-breadcrumb-item> 任务01 </el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 内容 -->
      <div class="week-mission-detail">
        <div class="week-mission">
          <el-divider></el-divider>

          <!-- 周任务主要内容 -->
          <div class="main-content">
            <div class="title">
              <div style="margin-bottom: 30px">
                <b>主要内容</b>
                <div style="float: right">
                  <el-button
                    v-show="!isShow"
                    size="mini"
                    @click="add_main_content"
                    type="primary"
                    >添加</el-button
                  >
                  <el-button
                    v-show="isShow"
                    size="mini"
                    @click="edit_main_content"
                    type="primary"
                    >编辑</el-button
                  >
                </div>
              </div>
            </div>
            <p
              class="content"
              v-show="isShow"
              v-html="convertHtml(mission.week_mission_content)"
            />
            <!-- 修改内容框 -->
            <el-input
              v-show="!isShow"
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="mission.week_mission_content"
            >
            </el-input>

            <div style="margin-top: 20px"></div>
          </div>

          <el-divider></el-divider>

          <!-- 周任务主要目标 -->
          <div class="main-goal">
            <div class="title">
              <div>
                <b> 主要目标</b>
                <div style="float: right">
                  <el-button size="mini" @click="add_goal" type="primary">
                    添加
                  </el-button>
                </div>
              </div>
            </div>

            <div class="goal">
              <div
                class="goal-item"
                v-for="(goal, index) in mission.week_goals"
                :key="index"
              >
                <span class="content">{{ goal.week_goal_title }}：</span>
                <p
                  class="content"
                  v-html="convertHtml(goal.week_goal_content)"
                />
                <el-link
                  @click="editClick(index, goal.week_goal_id)"
                  class="edit"
                  icon="el-icon-edit"
                  type="info"
                  :underline="false"
                ></el-link>
                <el-link
                  @click="deleteClick(index, goal.week_goal_id)"
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

    <!-- 对话框 -->
    <!-- 添加 -->
    <el-dialog
      title="添加目标"
      :visible.sync="dialogVisible"
      width="50%"
      center
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="目标名称">
          <el-input placeholder="请输入名称" v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="目标内容">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="form.content"
          >
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即添加</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog
      title="编辑目标"
      :visible.sync="editDialogVisible"
      width="50%"
      center
    >
      <el-form ref="form" :model="edit" label-width="80px">
        <el-form-item label="目标名称">
          <el-input placeholder="请输入名称" v-model="edit.name"></el-input>
        </el-form-item>

        <el-form-item label="目标内容">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"
            v-model="edit.content"
          >
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="editGoal">修改</el-button>
          <el-button @click="editDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {

      loading: false,

      dialogVisible: false,
      editDialogVisible: false,
      selectId: -1,
      isShow: true,
      goalShow: false,
      textarea: '',
      input1: '',
      input2: '',

      form: {
        name: '',
        content: ''
      },

      edit: {
        id: 0,
        name: '',
        content: ''
      },

      mission: {
        week_mission_id: 0,
        week_mission_name: "任务01",
        week_mission_content: "待编辑",
        week_goals: [
          // {
          //   week_goal_id: 0,
          //   week_mission_id: 1,
          //   week_goal_title: "xx目标",
          //   week_goal_content: "待编辑"
          // },
        ]
      },

      add_goal_name: '',
      add_goal_content: ''
    }
  },


  async beforeMount() {
    console.log('week_mission_id ' + this.$route.params.week_mission_id);
    this.loading = true;
    await this.refreshMission();
    this.loading = false;
  },

  methods: {
    // 刷新任务
    async refreshMission() {
      let [data, err] = await this.$awaitWrap(this.$get('weekmission/selectbyid', {
        id: this.$route.params.week_mission_id
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      this.mission = data.data;
    },


    // 点击确定添加主要内容
    async add_main_content() {
      this.isShow = true;
      let [data, err] = await this.$awaitWrap(this.$post('weekmission/updatecontent', {
        id: this.mission.week_mission_id,
        content: this.mission.week_mission_content
      }));
      if (err) {
        this.$message.warning(err);
        setTimeout(() => {
          this.$router.push({
            path: `/course/${this.$route.params.course_id}/week-mission/week-mission-list/${this.$route.params.week_id}/week-mission-detail/${this.$route.params.week_mission_id}`
          });
        }, 1000);
        return;
      }
      this.loading = true;
      await this.refreshMission();
      this.loading = false;
      this.$message.success(data.msg)
    },


    // 点击编辑主要内容
    edit_main_content() {
      this.isShow = false
    },


    // 点击添加主要目标
    add_goal() {
      this.dialogVisible = true
    },


    // 点击确定添加目标
    async onSubmit() {
      //添加内容
      console.log(this.form.name);
      console.log(this.form.content);
      if (this.form.name == '' || this.form.content == null) {
        this.$message.warning('请输入');
        return;
      }
      let [data, err] = await this.$awaitWrap(this.$post('weekgoal/insert', {
        id: this.mission.week_mission_id,
        title: this.form.name,
        content: this.form.content
      }));
      if (err) {
        this.dialogVisible = false;
        this.$message.warning(err);
        setTimeout(() => {
          this.$router.push({
            path: `/course/${this.$route.params.course_id}/week-mission/week-mission-list/${this.$route.params.week_id}/week-mission-detail/${this.$route.params.week_mission_id}`
          });
        }, 1000);
        return;
      }
      this.dialogVisible = false;
      this.loading = true;
      await this.refreshMission();
      this.loading = false;
      this.$message.success(data.msg);
    },


    // 点击编辑目标
    editClick(index, id) {
      let goal = this.mission.week_goals[index]
      this.edit.id = id;
      this.edit.name = goal.week_goal_title
      this.edit.content = goal.week_goal_content
      this.editDialogVisible = true
    },


    // 点击删除目标
    deleteClick(index, id) {
      console.log('删除 ' + id);
      this.$cfm('确定删除', async () => {
        this.$post('weekgoal/delete', { id }).then(async data => {
          this.loading = true;
          await this.refreshMission();
          this.loading = false;
          this.$message.success(data.msg);
        }).catch(err => {
          this.$message.warning(err);
          setTimeout(() => {
            this.$router.push({
              path: `/course/${this.$route.params.course_id}/week-mission/week-mission-list/${this.$route.params.week_id}/week-mission-detail/${this.$route.params.week_mission_id}`
            });
          }, 1000);
        });
      });
    },

    // 点击确定修改目标
    async editGoal() {
      console.log('新目标 ');
      let [data, err] = await this.$awaitWrap(this.$post('weekgoal/update', {
        id: this.edit.id,
        title: this.edit.name,
        content: this.edit.content
      }));
      if (err) {
        this.editDialogVisible = false;
        this.$message.warning(err);
        setTimeout(() => {
          this.$router.push({
            path: `/course/${this.$route.params.course_id}/week-mission/week-mission-list/${this.$route.params.week_id}/week-mission-detail/${this.$route.params.week_mission_id}`
          });
        }, 1000);
        return;
      }
      this.editDialogVisible = false;
      this.loading = true;
      await this.refreshMission();
      this.loading = false;
      this.$message.success(data.msg);
    }
  }
}
</script>

<style lang="less" scoped>
.f-size {
  font-size: 16px;
  margin-left: 12px;
}

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

        .main-goal {
          .goal-item {
            position: relative;
            display: flex;
            margin-bottom: 10px;
            cursor: pointer;

            .edit {
              display: none;
              position: absolute;
              top: 5px;
              right: 35px;
            }

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
              .edit {
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