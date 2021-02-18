<template>
  <div id="index">
    <div id="header">
      <span> header </span>
    </div>
    <div id="content">
      <router-view class="router-view" />
    </div>
    <div id="footer">
      <p>Copyright © 课程助手</p>
    </div>
  </div> 
</template>

<script>
export default {
  name: 'Index',
  components: {
  }
}
</script>

<style lang="less" scoped>
@header_height: 50px;
@footer_height: 30px;
@router-padding: 60px;
#index {
  height: 100%;
  width: 100%;
  background: #f2f4f7;

  #header {
    position: fixed;
    top: 0;
    width: 100%;
    height: @header_height;
    background: #fff;
    box-shadow: 0 2px 4px -1px #cccccc;

    span {
      height: @header_height;
      line-height: @header_height;
    }
  }

  #content {
    width: 100%;
    height: calc(100% - @header_height - @footer_height);
    min-width: 1000px;
    min-height: 800px;
    padding-top: @header_height;
    padding-bottom: @footer_height;
    display: flex;
    justify-content: center;
    align-items: center;

    .router-view {
      width: calc(100% - @router-padding);
      height: calc(100% - @router-padding);
    }
  }

  #footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: @footer_height;
    background: #fff;
    box-shadow: 0 -1px 2px #dddddd;

    text-align: center;
    p {
      height: @footer_height;
      line-height: @footer_height;
      font-size: 15px;
    }
  }
}
</style>