<template>
  <div class="container">
    <div class="round-div">
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

      <div class="week-mission-detail">
        <div class="week-mission">
          <el-divider></el-divider>
          <!-- 主要内容 -->
          <div class="main-content">
            <div class="title">
              <div style="margin-bottom: 30px">
                <b> 主要内容</b>
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
              v-html="convertHtml(main_content)"
            ></p>
            <el-input
              v-show="!isShow"
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="main_content"
            >
            </el-input>

            <div style="margin-top: 20px"></div>
          </div>

          <el-divider></el-divider>

          <!-- 主要目标 -->
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
                v-for="(goal, index) in goals"
                :key="index"
              >
                <span class="content">{{ goal.goal_name }}：</span>
                <p class="content" v-html="convertHtml(goal.goal_content)"></p>

                <el-link
                  @click="testClick(index)"
                  class="edit"
                  icon="el-icon-edit"
                  type="info"
                  :underline="false"
                ></el-link>
                <el-link
                  @click="deleteClick(index)"
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
        name: '',
        content: ''
      },

      // 主要内容
      main_content: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；\n在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等',

      // 主要目标
      goals: [
        {
          goal_name: '记忆目标',
          goal_content: '与现实生活一致：与现实生活的流程、逻辑保持一致\n循用户习惯的语言和概念；\n在界面中一致',
        },
        {
          goal_name: '学习目标',
          goal_content: '与现实生活一致：与现实生活的流程、逻辑保持一致\n循用户习惯的语言和概念；\n在界面中一致',
        },
      ],
      add_goal_name: '',
      add_goal_content: ''
    }
  },



  async beforeMount() {
    console.log('week_mission_id ' + this.$route.params.week_mission_id);
  },

  methods: {

    async refreshGoal() {

    },

    artC() {
      console.log('artC');
    },


    add_main_content() {
      //  点击添加显示正常的内容,多一个编辑按钮
      this.isShow = true
      this.$message.success('添加成功')

    },


    edit_main_content() {
      this.isShow = false
    },


    add_goal() {
      this.dialogVisible = true
    },


    onSubmit() {
      //添加内容
      console.log(this.form.name);
      console.log(this.form.content);

      let goals = this.goals

      goals.push({
        goal_name: this.form.name,
        goal_content: this.form.content
      })


      this.dialogVisible = false
    },

    testClick(index) {
      this.selectId = index
      let goal = this.goals[index]
      this.edit.name = goal.goal_name
      this.edit.content = goal.goal_content
      this.editDialogVisible = true
    },

    deleteClick(index) {
      console.log('删除' + index);
      this.goals.splice(index, 1)
    },

    editGoal() {
      let selectId = this.selectId
      this.$message.success("修改成功")
      let goal = this.goals[selectId]
      goal.goal_name = this.edit.name
      goal.goal_content = this.edit.content
      this.editDialogVisible = false
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

        .main-content {
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