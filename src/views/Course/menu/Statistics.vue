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
            <StatisticsItem text="学生人数" num="15" q="人" />
            <StatisticsItem text="ss" />
          </div>

          <div class="column column-1">
            <StatisticsItem text="ss" />
          </div>

          <div class="column column-1">
            <StatisticsItem text="ss" />
            <StatisticsItem text="ss" />
            <StatisticsItem text="ss" />
          </div>
        </div>

        <!-- 学生数据 -->
        <div class="student-info">
          <p>ssss</p>
          <p>ssss</p>
          <p>ssss</p>
          <p>ssss</p>
          <p>ssss</p>
          <p>ssss</p>
          <p>ssss</p>
          <p>ssss</p>
          <p>ssss</p>
          <p>ssss</p>
          <p>ssss</p>
          <p>ssss</p>
          <p>ssss</p>
          <p>ssss</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StatisticsItem from '@/components/StatisticsItem.vue';

export default {

  data() {
    return {
      courseId: 0
    }
  },

  components: { StatisticsItem },

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
        height: 260px;
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