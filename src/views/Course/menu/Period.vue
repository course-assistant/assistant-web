<template>
  <div class="container">
    <div
      class="round-div"
      v-loading="loading"
      element-loading-text="正在加载中，请稍等..."
    >
      <div class="options">
        <el-button
          type="primary"
          icon="el-icon-plus"
          round
          @click="handleAddWeek"
          >添加周
        </el-button>
      </div>

      <div class="weekperiod-list">
        <WeekPeriod
          v-for="(week, index) in weeks"
          :week-data="week"
          :key="index"
          @editPeriod="editPeriod"
          @editWeek="editWeek"
        />
      </div>
    </div>

    <!-- 对话框 -->
    <!-- 编辑period的对话框 -->
    <el-dialog
      title="编辑学时"
      :visible.sync="editPeriodDialogVisible"
      width="45%"
    >
      <el-form :model="editPeriodForm" label-position="left">
        <el-form-item label="名 称" label-width="50px">
          <el-input v-model="editPeriodForm.periodName"></el-input>
        </el-form-item>

        <el-form-item label="类 型" label-width="50px">
          <el-select v-model="editPeriodForm.periodType" placeholder="性别">
            <el-option
              v-for="item in typeOpts"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="类 型" label-width="50px">
          <el-select v-model="editPeriodForm.periodStatus" placeholder="性别">
            <el-option
              v-for="item in statusOpts"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editPeriodDialogVisible = false"> 取 消 </el-button>
        <el-button type="primary" @click="onEditPeriodClick"> 确 定 </el-button>
      </div>
    </el-dialog>

    <!-- 编辑week的对话框 -->
    <el-dialog title="编辑周" :visible.sync="editWeekDialogVisible" width="45%">
      <el-form :model="editWeekForm" label-position="left">
        <el-form-item label="名 称" label-width="50px">
          <el-input v-model="editWeekForm.weekName"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editWeekDialogVisible = false"> 取 消 </el-button>
        <el-button type="primary" @click="onEditWeekClick"> 确 定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import WeekPeriod from '@/components/WeekPeriod.vue';
export default {

  data() {
    return {
      courseId: 0,
      loading: true,

      weeks: [
        {
          week_id: 1,
          week_name: '第01周',
          periods: [
            {
              period_content: "内容",
              period_id: 1,
              period_name: "第01学时 - 概要",
              period_status: 1,
              period_type: 1,
              week_id: 1
            },
            {
              period_content: "内容",
              period_id: 2,
              period_name: "第02学时 - html基础",
              period_status: 1,
              period_type: 1,
              week_id: 1,
              week_id: 1
            }
          ]
        }
      ],

      editPeriodDialogVisible: false,
      editPeriodForm: {
        periodId: 0,
        periodName: '',
        periodType: 1,
        periodStatus: 1
      },
      typeOpts: [{
        value: 1,
        label: '理论课'
      }, {
        value: 2,
        label: '实验课'
      }],
      statusOpts: [{
        value: 1,
        label: '开放中'
      }, {
        value: 2,
        label: '已结束'
      }],

      editWeekDialogVisible: false,
      editWeekForm: {
        weekId: 0,
        weekName: ''
      },
    }
  },

  components: {
    WeekPeriod
  },

  methods: {
    // 刷新数据
    async refreshWeekPeriod() {
      console.log('start');
      this.loading = true;

      let [data, err] = await this.$awaitWrap(this.$get('weekperiod/select', {
        id: this.courseId
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      console.log(data);
      this.weeks = data.data;

      // 关闭loading
      this.loading = false;
      console.log('end');
    },

    // 点击添加周
    handleAddWeek() {
      this.$confirm('确定添加新周次？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let [data, err] = await this.$awaitWrap(this.$post('weekperiod/addweek', {
          course_id: this.courseId,
          name: '新建周'
        }));
        if (err) {
          this.$message.warning(err);
          return;
        }
        this.$message.success(data.msg);
        this.refreshWeekPeriod();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });

    },

    // 监听子组件
    editPeriod(period) {
      this.editPeriodForm.periodId = period.period_id;
      this.editPeriodForm.periodName = period.period_name;
      this.editPeriodForm.periodType = period.period_type;
      this.editPeriodForm.periodStatus = period.period_status;
      this.editPeriodDialogVisible = true;
    },

    // 监听子组件
    editWeek(week) {
      this.editWeekForm.weekId = week.week_id;
      this.editWeekForm.weekName = week.week_name;
      this.editWeekDialogVisible = true;
    },

    // 确定编辑学时
    async onEditPeriodClick() {
      let [data, err] = await this.$awaitWrap(this.$post('weekperiod/updateperiod', {
        id: this.editPeriodForm.periodId,
        name: this.editPeriodForm.periodName,
        type: this.editPeriodForm.periodType,
        status: this.editPeriodForm.periodStatus
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      this.$message.success(data.msg);
      this.editPeriodDialogVisible = false;
      this.refreshWeekPeriod();
    },

    // 确定编辑周
    async onEditWeekClick() {
      let [data, err] = await this.$awaitWrap(this.$post('weekperiod/updateweek', {
        id: this.editWeekForm.weekId,
        name: this.editWeekForm.weekName
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      this.$message.success(data.msg);
      this.editWeekDialogVisible = false;
      this.refreshWeekPeriod();
    },
  },

  beforeCreate() {
    // 检有没有携带参数
    if (this.$route.query.courseid === 0) {
      this.$router.replace('/');
    }
  },

  // 加载数据
  beforeMount() {
    console.log('加载数据');
    this.courseId = this.$route.query.courseid;
    this.refreshWeekPeriod();
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
    margin-top: 20px;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    overflow: auto;

    .options {
      padding: 20px 0 0 40px;
    }

    .weekperiod-list {
      margin-top: 16px;
    }
  }
}
</style>