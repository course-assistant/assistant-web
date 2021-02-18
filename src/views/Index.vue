<template>
  <div id="index">
    <!-- 顶部 -->
    <div id="header">
      <!-- LOGO -->
      <img
        class="logo"
        src="https://i.loli.net/2021/02/18/yrSGnMYqtmhHjbU.png"
        alt="logo"
        @click="toIndex"
      />

      <!-- 头像 -->
      <el-avatar
        class="avatar"
        :size="34"
        src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
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
export default {
  name: 'Index',
  components: {
  },
  methods: {
    toIndex() {
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    }
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

    .avatar {
      position: absolute;
      right: 30px;
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