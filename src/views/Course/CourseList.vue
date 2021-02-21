<template>
  <div class="container">
    <div class="course-list">
      <!-- 工具栏 -->
      <div class="toolbar">
        <el-button type="primary" icon="el-icon-plus" round @click="addCourse">
          新建课程
        </el-button>

        <el-input
          v-model="searchText"
          style="margin-left: 15px; width: 300px"
          placeholder="搜索"
          prefix-icon="el-icon-search"
        >
        </el-input>

        <el-button type="primary" style="margin-left: 12px" plain round>
          搜索
        </el-button>

        <el-link
          type="info"
          :underline="false"
          icon="el-icon-collection"
          style="position: absolute; right: 80px"
          >已结束的课程</el-link
        >
      </div>

      <!-- 课程列表 -->
      <div class="list">
        <CourseItem
          v-for="(course, index) in courses"
          :key="index"
          :course="course"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CourseItem from '@/components/CourseItem.vue';
import jwtDecode from '@/util/jwt-decode.js';

export default {
  data() {
    return {
      searchText: '',
      courses: []
    }
  },

  components: {
    CourseItem
  },

  methods: {
    addCourse() {
      this.$router.push('addcourse');
    }
  },

  beforeCreate() {
    this.$message.success('欢迎回来');
  },

  // 请求服务器，拿到数据
  async beforeMount() {
    // 获取教师id
    let jwt = localStorage.getItem('hncj_management_teacher_token');
    let id = jwtDecode(jwt).id;
    // 获取正在教的课程
    let [data, err] = await this.$awaitWrap(this.$get('course/findbyteacherid', {
      id: id,
      page: 0,
      size: 12,
      status: 1
    }));
    if (err) {
      this.$message.warning(err);
      return;
    }
    console.log(data);
    this.courses = data.data;
    console.log(this.courses);
  },
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: #f2f4f7;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.course-list {
  height: calc(100% - 60px);
  width: 100%;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  .toolbar {
    position: relative;
    width: calc(98% - 64px);
    height: 11%;
    padding: 0 32px;
    // background: pink;
    display: flex;
    align-items: center;
  }

  .list {
    width: 98%;
    height: 89%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    overflow-y: auto;
    // background: sandybrown;
  }
}
</style>