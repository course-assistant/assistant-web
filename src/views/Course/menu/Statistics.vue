<template>
  <div class="container">
    <div class="round-div">
      <div class="div">
        <div class="head">
          <img
            src="https://tanyiqu.oss-cn-hangzhou.aliyuncs.com/assistant/img/course-cover/01.jpg"
            alt=""
          />
          <div class="info">
            <p class="name">网站建设</p>
            <p class="teacher">课程教师 张妍琰</p>
            <p class="count">学生人数 <span>124</span></p>
          </div>
          <div class="chart"></div>
        </div>

        <!-- 统计情况 -->
        <div class="statistics">
          <div class="column column-2">
            <SItem text="任务" num="195" q="个" backcolor="#67dac1" />
            <SItem text="讨论话题" num="195" q="个" backcolor="#65a4fc" />
          </div>

          <div class="column column-1">
            <SItem text="学生人数" num="195" q="人" backcolor="#46c8e8" />
          </div>

          <div class="column column-1">
            <SItem text="题库总数" num="195" q="题" backcolor="#fb7293" />
            <SItem text="随堂测试" num="195" q="次" backcolor="#9d91f2" />
          </div>
        </div>

        <!-- 学生数据 -->
        <div class="student-info">
          <!-- 表格 -->
          <div class="teble">
            <el-table :data="student_info" border style="width: 100%">
              <el-table-column prop="num" label="序号" width="70" />

              <el-table-column prop="name" label="姓名" width="100" />

              <el-table-column prop="id" label="学号" width="140" />

              <el-table-column
                prop="mission_num"
                label="任务查看数"
                width="180"
              />

              <el-table-column
                prop="discussion_num"
                label="参与话题次数"
                width="180"
              />

              <el-table-column
                prop="test_num"
                label="参与测验次数"
                width="180"
              />

              <el-table-column
                prop="evaluation_num"
                label="课堂评价次数"
                width="180"
              />

              <el-table-column prop="overview" label="综合" />
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SItem from '@/components/StatisticsItem.vue';

export default {

  data() {
    return {
      courseId: 0,

      student_info: [{
        num: 1,
        name: '吴硕',
        id: '081417137',
        mission_num: '5 / 10',
        discussion_num: '5 / 10',
        test_num: '5 / 10',
        evaluation_num: '5 / 10',
        overview: '88',
      }]
    }
  },

  components: { SItem },

  beforeCreate() {
    // 检有没有携带参数
    if (this.$route.params.course_id === 0) {
      this.$router.replace('/');
    }
  },

  // 加载数据
  async beforeMount() {
    this.courseId = this.$route.query.course_id;
  }
}
</script>

<style lang="less" scoped>
@width: 1150px;

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
    display: flex;
    justify-content: center;
    align-items: center;

    .div {
      width: calc(100% - 60px);
      height: calc(100% - 40px);
      overflow: auto;

      // 顶部详情信息
      .head {
        position: relative;
        width: @width;
        height: 180px;
        margin: 0 auto;
        display: flex;
        align-items: center;

        img {
          width: 255px;
          height: 150px;
          border-radius: 4px;
          margin-right: 12px;
        }

        .info {
          height: 150px;
          .name {
            font-size: 1.5em;
          }
          .teacher {
            margin: 16px 0;
            font-size: 16px;
          }
          .count {
            font-size: 16px;
            span {
              color: #f28c24;
              font-size: 20px;
              font-weight: bold;
            }
          }
        }

        .chart {
          position: absolute;
          right: 0;
          height: 150px;
          width: 340px;
          margin: 0 auto;
          background: #fb7293;
        }
      }

      // 统计情况
      .statistics {
        width: @width;
        height: 280px;
        margin: 10px auto;
        display: flex;
        // background: saddlebrown;

        .column {
          flex: 1;
          padding: 0 5px;
          height: 100%;
          display: flex;
          flex-direction: column;
          // background: salmon;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .column-1 {
        }
      }

      // 学生数据
      .student-info {
        width: @width;
        margin: 0 auto;
        background: salmon;
      }
    }
  }
}
</style>