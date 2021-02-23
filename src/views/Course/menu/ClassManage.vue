<template>
  <div class="container">
    <div class="round-div">
      <!-- 操作按钮 -->
      <div class="options">
        <el-button
          type="primary"
          icon="el-icon-plus"
          round
          @click="handleAddClass"
          >添加班级
        </el-button>
      </div>

      <!-- 班级列表 -->
      <div class="class-list">
        <ClassItem
          v-for="(cls, index) in classes"
          :key="index"
          :class-data="cls"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ClassItem from '@/components/ClassItem.vue';

export default {

  data() {
    return {
      courseId: 0,

      classes: [
        {
          classId: -1,
          className: '班级1',
          classStuNum: 10
        },
        {
          classId: -2,
          className: '班级2',
          classStuNum: 12
        }
      ]
    }
  },

  components: { ClassItem },

  methods: {

    // 点击添加班级
    handleAddClass() {
      console.log('添加班级');
    }
  },

  beforeCreate() {
    // 检有没有携带参数
    if (this.$route.query.courseid === 0) {
      this.$router.replace('/');
      return;
    }
  },


  // 加载数据
  async beforeMount() {
    this.courseId = this.$route.query.courseid;
    // 先加载所有班级
    let [data, err] = await this.$awaitWrap(this.$get('class/findbycourseid', {
      course_id: this.courseId
    }));
    if (err) {
      this.$message.warning(err);
      return;
    }
    let classes = [];
    // 根据班级查找人数
    let classData = data.data;
    classData.forEach(async (cls, index) => {
      console.log(cls, index);
      let [d, e] = await this.$awaitWrap(this.$get('class/countbycourseid', {
        class_id: cls.class_id
      }));
      if (e) {
        this.$message.warning(e);
        this.$router.push('/');
        return;
      }
      console.log(d);
      classes.push({
        classId: cls.class_id,
        className: cls.class_name,
        classStuNum: d.data.count
      });
    });
    this.classes = classes;
  }
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

  .round-div {
    width: 100%;
    min-width: 1000px;
    height: calc(100% - 60px);
    margin: 30px;
    margin-top: 30px;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .options {
      padding: 20px 0 0 40px;
    }

    .class-list {
      margin-top: 20px;
    }
  }
}
</style>