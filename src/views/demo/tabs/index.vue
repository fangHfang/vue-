<template>
  <div class="page">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="tabs1" name="first">
        <Table/>
      </el-tab-pane>
      <el-tab-pane label="tabs2" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="tabs3" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="tabs4" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>