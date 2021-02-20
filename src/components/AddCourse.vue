<template>
  <div class="container">
    <div class="round-div">
      <p>新建课程</p>

      <el-form
        label-position="right"
        label-width="80px"
        :model="addCourseFormData"
      >
        <el-form-item label="课程名称">
          <el-input v-model="addCourseFormData.courseName"></el-input>
        </el-form-item>

        <el-form-item label="课程教师">
          <el-input v-model="addCourseFormData.teacherName" disabled></el-input>
        </el-form-item>

        <el-form-item label="课程封面">
          <el-image
            src="http://p.ananas.chaoxing.com/star3/240_130c/b7b9a80175b2d80938d72fcbfdabce24.jpg"
          ></el-image>
          <el-button type="text">选择系统封面</el-button>
        </el-form-item>

        <el-button type="primary" icon="el-icon-connection" round
          >克隆已有课程</el-button
        >
        <el-button round>取消</el-button>
        <el-button type="primary" round>完成</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addCourseFormData: {
        name: '',
        region: '',
        type: ''
      }
    }
  },

  methods: {

  }
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

  .round-div {
    height: 500px;
    width: 840px;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>