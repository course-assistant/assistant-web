<template>
  <div class="container">
    <div
      class="round-div"
      v-loading="loading"
      element-loading-text="正在加载中，请稍等..."
    >



      <div class="main-container">
        <div style="margin-left: 20px;margin-top:20px;width: 400px">

          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>主要内容</span>
                <el-button class="button" type="text">操作按钮</el-button>
              </div>
            </template>

            <p>
              （1）Android简介（了解）<br>
              （2）Android Studio的安装与调试（掌握）<br>
              （3）创建HelloAndroid项目（掌握）<br>
              （4）Android Studio中的SDK设置<br>
              思政部分：安卓技术的发展史，技术的突破对提高项目开发效率的影响。鸿蒙系统的崛起，自有技术的重要性等。
            </p>

          </el-card>


        </div>

        <div style="margin-left: 20px;margin-top:20px;width: 400px">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>主要内容</span>
                <el-button class="button" type="text">操作按钮</el-button>
              </div>
            </template>

            <p>
              （1）Android简介（了解）<br>
              （2）Android Studio的安装与调试（掌握）<br>
              （3）创建HelloAndroid项目（掌握）<br>
              （4）Android Studio中的SDK设置<br>
              思政部分：安卓技术的发展史，技术的突破对提高项目开发效率的影响。鸿蒙系统的崛起，自有技术的重要性等。
            </p>

          </el-card>
        </div>

        <div style="margin-left: 20px;margin-top:20px;width: 400px">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>主要内容</span>
                <el-button class="button" type="text">操作按钮</el-button>
              </div>
            </template>

            <p>
              （1）Android简介（了解）<br>
              （2）Android Studio的安装与调试（掌握）<br>
              （3）创建HelloAndroid项目（掌握）<br>
              （4）Android Studio中的SDK设置<br>
              思政部分：安卓技术的发展史，技术的突破对提高项目开发效率的影响。鸿蒙系统的崛起，自有技术的重要性等。
            </p>

          </el-card>
        </div>

        <div style="margin-left: 20px;margin-top:20px;width: 400px">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>主要内容</span>
                <el-button class="button" type="text">操作按钮</el-button>
              </div>
            </template>

            <p>
              （1）Android简介（了解）<br>
              （2）Android Studio的安装与调试（掌握）<br>
              （3）创建HelloAndroid项目（掌握）<br>
              （4）Android Studio中的SDK设置<br>
              思政部分：安卓技术的发展史，技术的突破对提高项目开发效率的影响。鸿蒙系统的崛起，自有技术的重要性等。
            </p>

          </el-card>
        </div>
        <div style="margin-left: 20px;margin-top:20px;width: 400px">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>主要内容</span>
                <el-button class="button" type="text">操作按钮</el-button>
              </div>
            </template>

            <p>
              （1）Android简介（了解）<br>
              （2）Android Studio的安装与调试（掌握）<br>
              （3）创建HelloAndroid项目（掌握）<br>
              （4）Android Studio中的SDK设置<br>
              思政部分：安卓技术的发展史，技术的突破对提高项目开发效率的影响。鸿蒙系统的崛起，自有技术的重要性等。
            </p>

          </el-card>
        </div>

        <div style="margin-left: 20px;margin-top:20px;width: 400px">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>主要内容</span>
                <el-button class="button" type="text">操作按钮</el-button>
              </div>
            </template>

            <p>
              （1）Android简介（了解）<br>
              （2）Android Studio的安装与调试（掌握）<br>
              （3）创建HelloAndroid项目（掌握）<br>
              （4）Android Studio中的SDK设置<br>
              思政部分：安卓技术的发展史，技术的突破对提高项目开发效率的影响。鸿蒙系统的崛起，自有技术的重要性等。
            </p>

          </el-card>
        </div>

      </div>







    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      course_id: 0,
      loading: false,
    }
  },


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

  .main-container{
    display: flex;
    flex-direction:row;
    flex-wrap: wrap;
  }

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
    overflow: auto;
  }
}
</style>