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
      classes: [
        {
          classId: 1,
          className: '0814171',
          classStuNum: 10
        },
        {
          classId: 2,
          className: '0814172',
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
    }
  },


  beforeMount() {

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