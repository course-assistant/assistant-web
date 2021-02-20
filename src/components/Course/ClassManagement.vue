<template>
  <div>班级</div>
</template>

<script>
export default {

  beforeCreate() {
    // 检有没有携带参数
    if (this.$route.query.courseid === 0) {
      this.$router.replace('/');
      console.log(0);
    }
  },


  beforeMount() {
    console.log('class manage before');
    console.log(this.$route.query);
  }
}
</script>

<style>
</style>