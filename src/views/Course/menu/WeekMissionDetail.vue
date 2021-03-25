<template>
  <div class="week-mission-detail">
    <div class="weekmission-detail">
      <h2>任务 01</h2>

      <h3>
        主要内容
        <el-button class="edit" type="primary" round> 编辑主要内容 </el-button>
      </h3>
      <div class="content">主要内容</div>

      <br />

      <h3>
        主要目标
        <el-button class="edit" type="primary" round> 添加目标 </el-button>
      </h3>

      <ul>
        <li >
          记忆目标 : HTML、CSS
          <button class="delete">删除</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.week-mission-detail {
}
</style>