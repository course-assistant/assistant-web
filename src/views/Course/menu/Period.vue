<template>
  <div class="container">
    <div
      class="round-div"
      v-loading="loading"
      element-loading-text="正在加载中，请稍等..."
    >
      <div class="weekperiod-list">
        <WeekPeriod
          v-for="(week, index) in weeks"
          :week-data="week"
          :key="index"
          @editPeriod="editPeriod"
        />
      </div>
    </div>

    <!-- 对话框 -->
    <!-- 编辑period的对话框 -->
    <el-dialog title="编辑学时" :visible.sync="editDialogVisible" width="45%">
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
        <el-button @click="editDialogVisible = false"> 取 消 </el-button>
        <el-button type="primary" @click="onEditClick"> 确 定 </el-button>
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

      editDialogVisible: false,
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
      }]
    }
  },

  components: {
    WeekPeriod
  },

  methods: {
    // 刷新数据
    async refreshWeekPeriod() {
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
    },

    // 监听子组件点击编辑
    editPeriod(period) {
      this.editPeriodForm.periodId = period.period_id;
      this.editPeriodForm.periodName = period.period_name;
      this.editPeriodForm.periodType = period.period_type;
      this.editPeriodForm.periodStatus = period.period_status;
      this.editDialogVisible = true;
    },


    // 点击确定编辑
    async onEditClick() {
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
      this.editDialogVisible = false;
      this.refreshWeekPeriod();
    }
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
    margin-top: 30px;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    overflow: auto;

    .weekperiod-list {
      margin-top: 26px;
    }
  }
}
</style>