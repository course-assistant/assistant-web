<template>
  <div class="statistics-item" :style="{}">
    <p>{{text}}</p>
    <p>{{num}} {{ q }}</p>
  </div>
</template>

<script>
export default {
  props: ['text', 'num', 'q', 'height', 'backcolor'],


  beforeMount() {
    console.log('q ' + this.q);
  },
}

</script>

<style lang="less" scoped>
.statistics-item {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px 0;
  padding-left: 20px;
  border-radius: 8px;
  background: olive;
  color: #fff;
  margin-bottom: 10px;
}
</style>