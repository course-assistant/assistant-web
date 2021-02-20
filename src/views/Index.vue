<template>
  <div id="index">
    <!-- 顶部 -->
    <div id="header">
      <img
        class="logo"
        src="https://i.loli.net/2021/02/18/yrSGnMYqtmhHjbU.png"
        alt="logo"
        @click="toIndex"
      />

      <p class="teacher-name">{{ teacherName }}</p>

      <img
        class="avatar"
        :src="teacherAvatar"
        alt="头像"
        @click="toTeacherHome"
      />
    </div>

    <!-- 中间内容 -->
    <div id="content">
      <router-view class="router-view" />
    </div>

    <!-- 底部 -->
    <div id="footer">
      <p>Copyright © 课程助手</p>
    </div>
  </div>
</template>

<script>
import jwtDecode from '@/util/jwt-decode.js';

export default {
  name: 'Index',
  data() {
    return {
      teacherAvatar: '',
      teacherName: '',
    }
  },
  components: {
  },
  methods: {
    // 跳转至首页
    toIndex() {
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    },

    // 跳转至教师个人页面
    toTeacherHome() {
      if (this.$route.path !== '/teacher') {
        this.$router.push('/teacher');
      }
    }
  },

  // 做token验证
  async beforeCreate() {
    // 获取token
    let token = localStorage.getItem("hncj_management_teacher_token");

    // 检测token是否为空
    if (token === null || token.trim() === '') {
      this.$message.warning('请先登录');
      this.$router.push('/login');
      return;
    }

    // 验证token是否有效
    let [data, err] = await this.$awaitWrap(this.$post('authentication', {
      token: token,
      type: 2
    }));
    if (err) {
      this.$message.error(err);
      this.$router.push('/login');
      return;
    }

    // 验证成功
    // console.log('身份验证成功');
  },

  // 获取一些数据
  async beforeMount() {
    // 获取教师id
    let jwt = localStorage.getItem('hncj_management_teacher_token');
    let obj = jwtDecode(jwt);
    let id = obj.id;
    // 获取教师信息
    let [data, err] = await this.$awaitWrap(this.$get('teacher/selectbyid', { id: id }));
    if (err) {
      this.$message.warning(err);
      return;
    }
    this.teacherName = data.data.teacher_name;
    this.teacherAvatar = data.data.teacher_avatar;
  }

}
</script>

<style lang="less" scoped>
@header_height: 50px;
@footer_height: 30px;
@router-padding: 60px;
#index {
  height: 100%;
  width: 100%;
  background: #f2f4f7;

  #header {
    position: fixed;
    top: 0;
    width: 100%;
    height: @header_height;
    background: #fff;
    box-shadow: 0 1px 12px 0 rgba(1, 39, 78, 0.12);
    display: flex;
    align-items: center;

    .logo {
      position: absolute;
      width: 106px;
      height: 28px;
      left: 30px;
      cursor: pointer;
    }

    .teacher-name {
      position: absolute;
      right: 70px;
    }

    .avatar {
      position: absolute;
      width: 34px;
      height: 34px;
      right: 30px;
      border-radius: 50%;
      cursor: pointer;
    }
  }

  #content {
    width: 100%;
    height: calc(100% - @header_height - @footer_height);
    min-width: 1000px;
    min-height: 800px;
    padding-top: @header_height;
    padding-bottom: @footer_height;
    display: flex;
    justify-content: center;
    align-items: center;

    .router-view {
      width: 100%;
      height: 100%;
    }
  }

  #footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: @footer_height;
    background: #fff;
    box-shadow: 0 -1px 2px #dddddd;

    text-align: center;
    p {
      height: @footer_height;
      line-height: @footer_height;
      font-size: 15px;
    }
  }
}
</style>