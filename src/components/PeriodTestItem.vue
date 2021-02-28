<template>
  <div class="period-test-item">
    <div class="desc">
      <p class="test-name">{{ test.period_test_name }}</p>

      <p class="test-status unissue" v-show="test.period_test_status === 2">
        未发布
      </p>
      <p class="test-status issued" v-show="test.period_test_status === 1">
        已发布
      </p>
    </div>

    <div class="opts">
      <el-button class="btn-edit" type="text" @click="toTestDetail"
        >编辑</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ['test'],

  methods: {
    // 跳转至随堂测试的详情
    toTestDetail() {

      console.log(this.test.period_test_id);
    }
  },
}
</script>

<style lang="less" scoped>
.period-test-item {
  width: 100%;
  height: 90px;
  background: #fff;
  border-bottom: solid 1px #f2f2f2;
  cursor: pointer;

  display: flex;
  justify-content: space-between;

  &:hover {
    background: #f7fafc;
  }

  .desc {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .test-name {
      font-size: 16px;
      margin: 10px 0 10px 8px;
    }

    .test-status {
      width: fit-content;
      font-size: 15px;
      margin: 5px 0 5px 8px;
      padding: 2px 4px;
      border-radius: 4px;
    }
    .unissue {
      color: #000;
      background: #ecf5ff;
    }
    .issued {
      color: #fff;
      background: #409eff;
    }
  }

  .opts {
    .btn-edit {
      font-size: 16px;
      margin-right: 10px;
    }
  }
}
</style>