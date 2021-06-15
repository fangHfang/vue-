<template>
  <div class="page">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="到期记录" name="first">
        <Mature/>
      </el-tab-pane>
      <el-tab-pane label="失效记录" name="second">
        <Invalid/>
      </el-tab-pane>
      <el-tab-pane label="通知记录" name="third">
        <Notice/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>