<template>
  <div class="container">
    <div
      class="round-div"
      v-loading="loading"
      element-loading-text="正在加载中，请稍等..."
    >
      <div class="main-container">
        <el-button type="primary" icon="el-icon-plus" round>添加内容</el-button>

        <el-row>
          <el-col :span="24" v-for="(lesson, index) in lessons" :key="index">
            <LessonItem :lesson="lesson" />
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import LessonItem from '@/components/LessonItem.vue';
export default {

  data() {
    return {
      course_id: 0,
      loading: false,

      lessons: [
        {
          lesson_name: '第01课时',
          lesson_content: `（1）Android简介（了解）
          （2）Android Studio的安装与调试（掌握）
          （3）创建HelloAndroid项目（掌握）
          （4）Android Studio中的SDK设置
          （4）Android Studio中的SDK设置
          （4）Android Studio中的SDK设置
          思政部分：安卓技术的发展史，技术的突破对提高项目开发效率的影响。鸿蒙系统的崛起，自有技术的重要性等。`,
          degree: 1,
          quality: 4.6
        },
        {
          lesson_name: '第02课时',
          lesson_content: `（1）Android简介（了解）
          （2）Android Studio的安装与调试（掌握）
          （3）创建HelloAndroid项目（掌握）
          （4）Android Studio中的SDK设置`,
          degree: 3,
          quality: 4.6
        },
        {
          lesson_name: '第02课时',
          lesson_content: `（1）Android简介（了解）
          （2）Android Studio的安装与调试（掌握）
          （3）创建HelloAndroid项目（掌握）
          （4）Android Studio中的SDK设置
          思政部分：安卓技术的发展史，技术的突破对提高项目开发效率的影响。鸿蒙系统的崛起，自有技术的重要性等。`,
          degree: 5,
          quality: 4.6
        },
      ]
    }
  },

  components: { LessonItem },

  // 加载数据
  beforeMount() {
    this.course_id = this.$route.params.course_id;
  },

  methods: {

  },

}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: #f2f4f7;
  display: flex;
  justify-content: center;
  align-items: center;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .round-div {
    width: 100%;
    min-width: 1000px;
    height: calc(100% - 60px);
    margin: 30px;
    margin-top: 20px;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;

    .main-container {
      width: calc(100% - 60px);
      height: calc(100% - 40px);
      overflow: auto;
    }
  }
}
</style>