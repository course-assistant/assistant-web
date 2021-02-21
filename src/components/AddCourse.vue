<template>
  <div class="container">
    <div class="round-div">
      <el-form
        class="form"
        label-position="right"
        label-width="80px"
        :model="addCourseFormData"
        :rules="rules"
      >
        <p class="title">新建课程</p>

        <el-form-item label="课程名称" prop="courseName">
          <el-input v-model="addCourseFormData.courseName" clearable></el-input>
        </el-form-item>

        <el-form-item label="课程教师">
          <el-input v-model="addCourseFormData.teacherName" disabled></el-input>
        </el-form-item>

        <el-form-item label="课程封面">
          <el-image
            :src="addCourseFormData.courseCover"
            style="width: 240px; height: 130px;border-radius:5px;"
          >
          </el-image>

          <!-- 添加封面 -->
          <el-popover placement="right" width="600" trigger="click">
            <div style="width: 100%; height: 380px; overflow: auto">
              <el-image
                class="cover-item"
                style="
                  width: 180px;
                  margin: 5px;
                  border-radius: 5px;
                  cursor: pointer;
                "
                v-for="(url, index) in coverUrls"
                :key="index"
                :src="url"
                @click="selectCover(url, index)"
              />
            </div>

            <el-link
              class="select-cover-btn"
              type="primary"
              slot="reference"
              icon="el-icon-edit"
              :underline="false"
            >
              选择系统封面
            </el-link>
          </el-popover>
        </el-form-item>

        <el-form-item label="课程说明">
          <el-input v-model="addCourseFormData.type" clearable></el-input>
        </el-form-item>

        <div class="btns">
          <el-button
            type="primary"
            icon="el-icon-connection"
            round
            @click="handleClone"
          >
            克隆已有课程
          </el-button>
          <el-button round @click="handleCancel">取消创建</el-button>
          <el-button type="primary" round @click="handleFinish">完成</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addCourseFormData: {
        courseName: '',
        teacherName: '',
        courseCover: 'https://p.ananas.chaoxing.com/star3/origin/b7b9a80175b2d80938d72fcbfdabce24.jpg',
        courseNote: ''
      },

      coverUrls: [
        'https://p.ananas.chaoxing.com/star3/origin/b7b9a80175b2d80938d72fcbfdabce24.jpg',
        'https://p.ananas.chaoxing.com/star3/origin/ebe4b550f689a518631aa3f61a36c10e.jpg',
        'https://p.ananas.chaoxing.com/star3/origin/8f3d6d1e7b9d26d34ae28a8e3b253265.jpg',
        'https://p.ananas.chaoxing.com/star3/origin/d86d681b1596f9cebb6b5b0de08a323d.jpg',
        'https://p.ananas.chaoxing.com/star3/origin/f23a4b313e1aa0a7a840ab81aabc918f.jpg',
        'https://p.ananas.chaoxing.com/star3/origin/aefed707926791941a844fb718b43955.jpg',
        'https://p.ananas.chaoxing.com/star3/origin/669ca80d6a0c5f74835bb936a41aabca.jpg',
        'https://p.ananas.chaoxing.com/star3/origin/b96809be433f26b4e9a9966be56aa31c.jpg',
        'https://p.ananas.chaoxing.com/star3/origin/8a0d7e35ecbb20ec4b19f185eed0bc2b.jpg',
        'https://p.ananas.chaoxing.com/star3/origin/a83f7a04a1ebec7b608e52bdb96b4f5b.jpg',
        'https://p.ananas.chaoxing.com/star3/origin/a597b7c95a3e72dbbdb21f17011ce85f.jpg',
        'https://p.ananas.chaoxing.com/star3/origin/f531b4fc974f76501cb5779964b2ff6f.jpg',
        'https://p.ananas.chaoxing.com/star3/origin/987728a81491be987fa29edd08519ba5.jpg',
        'https://p.ananas.chaoxing.com/star3/origin/8c9ec6b14aa72c81c375091ce79cf7cb.jpg'
      ],

      rules: {
        courseName: [
          { required: true, message: '请输入课程名称', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    // 点击选择封面
    selectCover(url, index) {
      this.addCourseFormData.courseCover = url;
    },

    // 取消创建
    handleCancel() {
      this.$router.replace('/');
    },

    // 点击克隆
    handleClone() {
      this.$message.info('克隆');
    },

    // 点击完成
    handleFinish() {
      this.$message.info('finish');
    }
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

    .form {
      padding: 20px 40px;

      .title {
        font-size: 21px;
        margin-left: -10px;
        margin-bottom: 20px;
      }

      .select-cover-btn {
        margin-left: 16px;
      }

      .btns {
        float: right;
        margin-top: 10px;
      }
    }
  }
}
</style>