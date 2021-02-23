<template>
  <div class="container">
    <div class="period-detail"></div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      periodId: 0
    }
  },

  // 检有没有携带参数
  beforeCreate() {
    if (!this.$route.query.periodid) {
      this.$router.replace('/');
    }
  },


  // 加载数据
  beforeMount() {
    this.periodId = this.$route.query.periodid;
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

  .period-detail {
    height: calc(100% - 60px);
    width: 100%;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>