<template>
  <div class="not-found">
    <div class="container">
      <p>
        <span class="code">404</span>
        <span class="text">该内容不存在或已被删除！</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.not-found {
  height: 100%;
  background: #f4f5f7;

  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    width: 60%;
    height: 65%;
    background: #ffffff;

    display: flex;
    justify-content: center;
    align-items: center;

    .code {
      font-size: 200px;
      color: #9a9a9a;
    }

    .text {
      margin-left: 20px;
      font-size: 30px;
      color: #616161;
    }
  }
}
</style>