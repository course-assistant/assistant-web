<template>
  <div class="container">
    <div
      class="round-div"
      v-loading="loading"
      element-loading-text="正在加载中，请稍等..."
    >
      <!-- 讨论 -->
      <div class="discussions">
        <!-- 左 -- 周 -->
        <div class="discusstion-week">
          <el-menu
            :default-active="weekPeriods[0].periods[0].period_id.toString()"
            class="el-menu-vertical-demo"
            @select="selectPeriod"
            unique-opened
          >
            <el-submenu
              v-for="(week, i) in weekPeriods"
              :key="i"
              :index="week.week_id.toString()"
            >
              <template slot="title">
                <i class="el-icon-s-order"></i>
                <span>{{ week.week_name }}</span>
              </template>

              <el-menu-item-group>
                <template slot="title">学时</template>
                <el-menu-item
                  v-for="(period, ind) in week.periods"
                  :key="ind"
                  :index="period.period_id.toString()"
                >
                  {{ period.period_name }}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>

        <!-- 右 -- 讨论 -->
        <div class="discusstion-list">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  data() {
    return {
      courseId: 0,

      weekPeriods: [
        {
          week_id: 1,
          week_name: '第01周',
          periods: [
            {
              period_id: 1,
              period_name: '第01学时'
            },
            {
              period_id: 2,
              period_name: '第01学时'
            }, {
              period_id: 3,
              period_name: '第03学时'
            }
          ]
        },
        {
          week_id: 2,
          week_name: '第02周',
          periods: [
            {
              period_id: 4,
              period_name: '第04学时'
            },
            {
              period_id: 5,
              period_name: '第05学时'
            }
          ]
        }
      ]
    }
  },

  methods: {
    // 点击某一学时
    selectPeriod(index) {
      console.log(index);
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
    // 加载周和学时

    this.loading = true;

    let [data, err] = await this.$awaitWrap(this.$get('weekperiod/select', {
      id: this.courseId
    }));
    if (err) {
      this.$message.warning(err);
      return;
    }
    console.log(data);
    this.weekPeriods = data.data;

    // 关闭loading
    this.loading = false;
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

    .discussions {
      width: 100%;
      height: 100%;
      display: flex;

      .discusstion-week {
        flex: 1;
        // background: khaki;
        margin: 16px 0;
        overflow: auto;
      }

      .discusstion-list {
        flex: 5;
        background: violet;
      }
    }
  }
}
</style>