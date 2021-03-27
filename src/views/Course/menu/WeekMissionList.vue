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
          <el-breadcrumb-item> {{ week.week_name }} </el-breadcrumb-item>
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
            <el-button type="text" @click="issueAll">发布选中任务</el-button>
            <el-button type="text" @click="deleteAll">删除选中任务</el-button>
          </div>
        </div>

        <!-- 列表 -->
        <div class="mission-list">
          <MissionItem
            class="mission-item"
            v-for="(mission, index) in missions"
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

      week: {
        week_id: 0,
        week_name: '第xx周'
      },

      missions: [
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
    Missions() {

    }
  },

  components: { MissionItem },

  // 加载
  async beforeMount() {
    this.loading = true;
    console.log('week_id ' + this.$route.params.week_id);
    await this.refreshWeek();
    await this.refreshMissions();
    this.loading = false;
  },


  methods: {
    // 刷新本周的任务
    async refreshMissions() {
      let [data, err] = await this.$awaitWrap(this.$get('weekmission/selectbyweekid', {
        id: this.$route.params.week_id
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      // 给missions全部添加checked
      let missions = data.data;
      missions.forEach((mission, index) => {
        mission['checked'] = false;
      });
      this.missions = missions;
    },

    // 刷新周
    async refreshWeek() {
      let [data, err] = await this.$awaitWrap(this.$get('week/selectbyid', {
        id: this.$route.params.week_id
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      this.week = data.data;
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

    // 点击全选/取消全选
    changeAll() {
      console.log('all');
      console.log(this.missions);
      if (this.selectedAll) {
        for (let i = 0; i < this.missions.length; i++) {
          this.missions[i].checked = true
        }
      } else {
        for (let i = 0; i < this.missions.length; i++) {
          this.missions[i].checked = false
        }
      }
    },

    // 点击了添加任务按钮
    addMission() {
      console.log('点击了添加任务按钮');
    },

    // 点击发布所有任务
    async issueAll() {
      console.log('issueAll');
      let missions = [];
      this.missions.forEach(mission => {
        if (mission.checked) {
          missions.push(mission.week_mission_id)
        }
      })
      let [data, err] = await this.$awaitWrap(this.$post('weekmission/issue', {
        ids: missions.join(',')
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      this.loading = true;
      await this.refreshMissions();
      this.loading = false;
      this.$message.success(data.msg);
    },

    // 点击删除所有任务
    async deleteAll() {
      console.log('deleteAll');
      let missions = [];
      this.missions.forEach(mission => {
        if (mission.checked) {
          missions.push(mission.week_mission_id)
        }
      })
      let [data, err] = await this.$awaitWrap(this.$post('weekmission/delete', {
        ids: missions.join(',')
      }));
      if (err) {
        this.$message.warning(err);
        return;
      }
      this.loading = true;
      await this.refreshMissions();
      this.loading = false;
      this.$message.success(data.msg);
    },
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