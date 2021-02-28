<template>
  <div class="discussion-item">
    <div class="left">
      <el-avatar :size="40" :src="teacherAvatar" />
    </div>
    <div class="right">
      <p class="teacher-name">
        {{ teacherName }}
        <span class="date">2021-2-27 23:09</span>
      </p>
      <p class="discussion-title">话题标题</p>
      <p class="discussion-content">话题内容</p>
    </div>
  </div>
</template>

<script>
export default {


  data() {
    return {
      // 头像
      teacherAvatar: localStorage.getItem('hncj_assistant_web_teacher_avatar'),
      // 姓名
      teacherName: localStorage.getItem('hncj_assistant_web_teacher_name'),
    }
  },

  methods: {
    sss() {
      localStorage.getItem('hncj_assistant_web_teacher_avatar');
    }
  },
}
</script>

<style lang="less" scoped>
.discussion-item {
  width: 100%;
  height: 146px;
  background: #fff;
  border-bottom: solid 1px #f2f2f2;
  cursor: pointer;
  display: flex;

  &:hover {
    background: #f7fafc;
  }

  .left {
    width: 65px;
    height: 100%;
    // background: saddlebrown;
    text-align: center;
  }

  .right {
    flex: 1;
    height: 100%;
    // background: pink;

    .teacher-name {
      margin: 12px 0;
      color: #8a8b99;
      font-size: 16px;
      .date {
        font-size: 14px;
      }
    }

    .discussion-title {
      margin: 4px 0;
      font-size: 18px;
    }
    
    .discussion-content {
      margin: 3px 0;
      font-size: 16px;
    }
  }
}
</style>