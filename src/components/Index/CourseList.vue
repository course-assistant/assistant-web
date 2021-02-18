<template>
  <div class="course-list">
    <div class="list">
      <CourseItem />
      <CourseItem />
      <CourseItem />
      <CourseItem />
      <CourseItem />
      <CourseItem />
      <CourseItem />
    </div>
  </div>
</template>

<script>
import CourseItem from '@/components/Index/CourseItem.vue';
export default {
  components: {
    CourseItem
  }
}
</script>

<style lang="less" scoped>
.course-list {
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  .list {
    width: 100%;
    height: 100%;
    margin-left: 10px;
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    overflow: auto;
  }
}
</style>