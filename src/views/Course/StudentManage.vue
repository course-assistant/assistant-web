<template>
  <div class="student-management">
    <div
      class="round-div"
      v-loading="loading"
      element-loading-text="正在加载中，请稍等..."
    >
      <div class="head">
        <span class="class-name">{{ class_name }}</span>
      </div>

      <div class="options">
        <el-button
          type="primary"
          icon="el-icon-plus"
          round
          @click="handleAddStudent"
          >添加学生
        </el-button>
      </div>

      <p style="margin: 20px 0 10px 30px; font-size: 12px; color: #a8a8b3">
        全部学生
      </p>

      <div class="student-list">
        <el-table
          class="student-table"
          ref="multipleTable"
          :data="students"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>

          <el-table-column prop="student_name" label="姓名" width="130">
          </el-table-column>

          <el-table-column prop="student_id" label="学号" width="130">
          </el-table-column>

          <el-table-column
            prop="student_phone"
            label="电话"
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {

      loading: false,

      class_id: 0,
      class_name: '',
      students: [
        {
          student_id: '',
          student_name: '',
          student_phone: ''
        }
      ],
      multipleSelection: []
    }
  },

  methods: {
    async refreshStudents() {
      // 加载班级名
      let [clsData, e] = await this.$awaitWrap(this.$get('class/findbyclassid', {
        class_id: this.class_id
      }));
      if (e) {
        this.loading = false;
        this.$router.push('/404');
        return;
      }
      this.class_name = clsData.data.class_name;

      // 加载学生
      let [data, err] = await this.$awaitWrap(this.$get('student/selectbyclassid', {
        class_id: this.class_id
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      this.students = data.data.students;
    },

    // 添加
    handleAddStudent() { },

    // 处理多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },

  // 加载数据
  async beforeMount() {
    this.class_id = this.$route.params.class_id;
    this.loading = true;
    await this.refreshStudents();
    this.loading = false;
  },

}
</script>

<style lang="less" scoped>
.student-management {
  width: 100%;
  height: 100%;
  background: #f2f4f7;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  .round-div {
    height: calc(100% - 60px);
    width: 100%;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .head {
      height: 60px;
      border-bottom: solid 1px #f2f2f2;
      .class-name {
        height: 60px;
        line-height: 60px;
        margin-left: 30px;
        font-size: 18px;
      }
    }

    .options {
      padding-top: 20px;
      padding-left: 30px;
    }

    .student-list {
      width: 97%;
      margin: 0 auto;
    }
  }
}
</style>