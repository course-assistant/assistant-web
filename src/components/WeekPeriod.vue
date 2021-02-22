<template>
  <div class="week-period">
    <!-- 周 -->
    <div class="week-item hover-shadow">
      <i class="el-icon-s-opportunity" style="color: #d0d5db"></i>
      <span>{{ weekData.week_name }}</span>

      <el-button
        class="edit"
        type="primary"
        size="mini"
        round
        @click="handleEditWeek(weekData)"
        >编辑
      </el-button>

      <el-button
        class="delete"
        type="danger"
        size="mini"
        round
        @click="handledeleteWeek(weekData.week_id)"
        >删除
      </el-button>
    </div>

    <!-- 学时 -->
    <div
      class="period-item hover-shadow"
      v-for="(period, index) in weekData.periods"
      :key="index"
    >
      <span class="period-name">
        {{ period.period_name }}
      </span>

      <span v-show="period.period_type === 1" class="tag">理论课</span>
      <span v-show="period.period_type === 2" class="tag">实验课</span>

      <code v-show="period.period_status === 1" class="status">开放中</code>
      <code v-show="period.period_status === 2" class="status">已结束</code>

      <el-button
        class="edit"
        type="primary"
        size="mini"
        round
        @click="handleEditPeriod(period)"
        >编辑
      </el-button>

      <el-button
        class="delete"
        type="danger"
        size="mini"
        round
        @click="handleDeletePeriod(period.period_id)"
        >删除
      </el-button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      value: true
    }
  },

  props: ['weekData'],

  methods: {
    // 点击编辑，传递给父组件调用
    handleEditPeriod(period) {
      this.$emit('editPeriod', period);
    },
    handleEditWeek(weekData) {
      let week = {
        week_id: weekData.week_id,
        week_name: weekData.week_name
      };
      this.$emit('editWeek', week);
    },
    handleDeletePeriod(periodId) {
      this.$emit('deletePeriod', periodId);
    },
    handledeleteWeek(weekId) {
      this.$emit('deleteWeek', weekId);
    },
  },
}
</script>

<style lang="less" scoped>
.week-period {
  margin: 10px 30px;
  //   background: pink;

  // 鼠标悬浮阴影
  .hover-shadow {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    padding-left: 14px;
    cursor: pointer;

    &:hover {
      background: #f7fafc;
      border-radius: 4px;
    }
  }

  .week-item {
    position: relative;
    font-weight: bold;
    color: #000;
    i {
      width: 16px;
      height: 16px;
    }

    span {
      margin-left: 14px;
    }

    .edit {
      position: absolute;
      top: 7px;
      left: 640px;
      margin-left: 30px;
      display: none;
    }

    .delete {
      position: absolute;
      top: 7px;
      left: 720px;
      margin-left: 30px;
      display: none;
    }

    &:hover {
      .edit {
        display: block;
      }
      .delete {
        display: block;
      }
    }
  }

  .period-item {
    position: relative;
    margin: 6px 0;
    margin-left: 30px;
    color: #181e33;

    .period-name {
      width: 200px;
      max-width: 200px;
    }

    .tag {
      position: absolute;
      height: 30px;
      line-height: 30px;
      top: 5px;
      left: 450px;
      padding: 0 5px;
      border-radius: 4px;
      background: #ecf5ff;
      margin-left: 16px;
    }

    .status {
      position: absolute;
      height: 30px;
      line-height: 30px;
      top: 5px;
      left: 535px;
      padding: 0 5px;
      border-radius: 4px;
      background: #ecf5ff;
      margin-left: 16px;
    }

    .edit {
      position: absolute;
      top: 5px;
      left: 610px;
      margin-left: 30px;
      display: none;
    }

    .delete {
      position: absolute;
      top: 5px;
      left: 690px;
      margin-left: 30px;
      display: none;
    }

    &:hover {
      .edit {
        display: block;
      }
      .delete {
        display: block;
      }
    }
  }
}
</style>