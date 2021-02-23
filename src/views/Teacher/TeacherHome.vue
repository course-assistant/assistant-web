<template>
  <div class="container">
    <div class="teacher-home">
      <div class="head">
        <p>账号管理</p>
      </div>

      <div class="form">
        <el-form label-position="left" label-width="80px" :model="formData">
          <el-form-item label="工号">
            <el-input
              v-model="formData.name"
              disabled
              style="width: 320px; margin-right: 20px"
            ></el-input>
            <el-button type="info" size="mini">注销账户</el-button>
          </el-form-item>

          <el-form-item label="头像">
            <el-avatar
              :size="50"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
          </el-form-item>

          <el-form-item label="手机">
            <el-input v-model="formData.name" clearable></el-input>
          </el-form-item>

          <el-form-item label="邮箱">
            <el-input v-model="formData.region" clearable></el-input>
          </el-form-item>

          <el-form-item label="密码管理">
            <el-button type="primary" size="mini">修改密码</el-button>
          </el-form-item>
        </el-form>

        <div><el-button type="primary" round>保存</el-button></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {}
    }
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

  .teacher-home {
    height: calc(100% - 60px);
    width: 100%;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .head {
      p {
        margin: 20px 0 20px 30px;
        font-size: 22px;
      }
    }

    .form {
      width: 600px;
      margin-left: 50px;
    }
  }
}
</style>