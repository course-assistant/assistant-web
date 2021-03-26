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
          <el-breadcrumb-item> 第01周 </el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="week-mission-list">
        <!-- 操作框 -->
        <div class="tools">
          <el-checkbox
            @change="changeAll"
            v-model="selectedAll"
            style="margin-left: 30px"
          >
            全选
          </el-checkbox>
          <div style="margin-right: 30px">
            <el-button type="text">发布选中任务</el-button>
            <el-button type="text">删除选中任务</el-button>
          </div>
        </div>

        <!-- 列表 -->
        <div class="mission-list">
          <MissionItem
            class="mission-item"
            v-for="(mission, index) in LessonMissions"
            :key="index"
            :mission="mission"
            @edit="editMission"
            @delete="deleteMission"
          />
        </div>

        <!-- 操作框 -->
        <div class="add" @click="addMission">
          <i class="el-icon-plus"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MissionItem from '@/components/MissionItem.vue';

export default {

  data() {
    return {

      loading: false,

      selectedAll: false,

      LessonMissions: [
        // {
        //   teacher_name: '教师名',
        //   views: 5,
        //   week_mission_id: 1,
        //   week_mission_name: '任务001',
        //   week_mission_status: 1,
        //   week_mission_type: 1,
        //   checked: true,
        // }
      ],
    }
  },

  computed: {

  },

  components: { MissionItem },

  // 加载
  async beforeMount() {
    this.loading = true;
    console.log('week_id ' + this.$route.params.week_id);
    await this.refreshMissions();
    this.loading = false;
  },


  methods: {

    async refreshMissions() {
      let [data, err] = await this.$awaitWrap(this.$get('weekmission/selectbyweekid', {
        id: this.$route.params.week_id
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      this.LessonMissions = data.data;
    },


    // 点击编辑
    editMission(id) {
      console.log('编辑 ' + id);
    },

    // 点击删除
    deleteMission(id) {
      console.log('删除 ' + id);
      this.$cfm('确定删除', async () => {
        this.loading = true;
        let [data, err] = await this.$awaitWrap(this.$post('weekmission/delete', { id }));
        if (err) {
          this.$message.warning(err);
          setTimeout(() => {
            this.$router.push({
              path: `/course/${this.$route.params.course_id}/week-mission/week-mission-list/${this.$route.params.week_id}`
            });
            this.loading = false;
          }, 1000);
          return
        }
        await this.refreshMissions();
        this.loading = false;
        this.$message.success(data.msg);
      });
    },

    changeAll() {
      if (this.selectedAll) {
        for (let i = 0; i < this.LessonMissions.length; i++) {
          this.LessonMissions[i].checked = true
        }
      } else {
        for (let i = 0; i < this.LessonMissions.length; i++) {
          this.LessonMissions[i].checked = false
        }
      }
    },

    addMission() {
      console.log('点击了添加任务按钮');
    }
  },
}
</script>

<style lang="less" scoped>
.f-size {
  font-size: 16px;
  margin-left: 12px;
}

.el-breadcrumb__inner {
  color: red;
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

      .link {
        text-decoration: none;
        color: #000;
        font-weight: bold;
      }
    }

    .week-mission-list {
      background: #fff;
      width: calc(100% - 80px);
      // width: 500px;
      margin: 0 auto;

      .tools {
        position: relative;
        height: 60px;
        margin: 0 auto;
        margin-top: 10px;
        background: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .mission-list {
        width: 100%;
        .mission-item {
          margin-top: 20px;
        }
      }

      .add {
        width: 150px;
        height: 100px;
        margin-top: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        cursor: pointer;
        &:hover {
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
        display: flex;
        justify-content: center;
        align-items: center;

        i {
          color: #999999;
          font-size: 60px;
        }
      }
    }
  }
}
</style>