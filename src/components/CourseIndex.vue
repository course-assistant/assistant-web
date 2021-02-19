<template>
  <div class="course-index">
    <!-- 侧边菜单 -->
    <div class="aside">
      <div class="course-detail">
        <img class="course-cover" :src="courseCover" alt="" />
        <p class="course-name">{{ courseName }}</p>
      </div>

      <el-menu
        default-active="Period"
        class="el-menu-vertical-demo"
        @select="handleSelect"
      >
        <el-menu-item index="ClassManagement">
          <i class="el-icon-menu"></i>
          <span slot="title">班级管理</span>
        </el-menu-item>

        <el-menu-item index="Period">
          <i class="el-icon-s-opportunity"></i>
          <span slot="title">课程学时</span>
        </el-menu-item>

        <el-menu-item index="3">
          <i class="el-icon-s-order"></i>
          <span slot="title">周任务</span>
        </el-menu-item>

        <el-menu-item index="4">
          <i class="el-icon-s-comment"></i>
          <span slot="title">课堂讨论</span>
        </el-menu-item>

        <el-menu-item index="5">
          <i class="el-icon-s-marketing"></i>
          <span slot="title">学时统计</span>
        </el-menu-item>

        <el-menu-item index="6">
          <i class="el-icon-s-tools"></i>
          <span slot="title">管理</span>
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 主窗口 -->
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courseId: 0,
      courseName: '测试课程',
      courseCover: 'http://p.ananas.chaoxing.com/star3/240_130c/b7b9a80175b2d80938d72fcbfdabce24.jpg',
    }
  },

  methods: {
    // 点击菜单切换
    handleSelect(index) {
      this.$router.replace({ name: index });
    }
  },

  created() {
    // 没有携带参数
    // if (!this.$route.query.courseid) {
    //   this.$router.push('/');
    //   return;
    // }
    // this.courseId = this.$route.query.courseId;

  },

  mounted() {
    // 默认打开学时菜单
    if (this.$route.path !== '/course/period') {
      this.$router.replace({ name: 'Period' });
    }
  }
}
</script>

<style lang="less" scoped>
.course-index {
  background: palegreen;

  display: flex;
  .aside {
    width: 180px;
    height: 100%;
    background: #fff;

    .course-detail {
      width: 100%;
      height: 110px;
      margin-top: 30px;
      margin-bottom: 20px;
      // background: pink;
      text-align: center;
      cursor: pointer;

      .course-cover {
        width: 138px;
        height: 78px;
        border-radius: 6px;
        object-fit: cover;
      }

      .course-name {
        margin-top: 4px;
        font-size: 16px;
      }
    }
  }

  .main {
    flex: 1;
    height: 100%;
    // background: green;
  }
}
</style>