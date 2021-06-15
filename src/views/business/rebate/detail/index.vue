<template>
  <div class="page">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first">
        <rebateDetailContent :typeFlag="0" v-if="activeName==='first'"/>
      </el-tab-pane>
      <el-tab-pane label="获取记录" name="second">
        <rebateDetailContent :typeFlag="1" v-if="activeName==='second'"/>
      </el-tab-pane>
      <el-tab-pane label="消耗记录" name="third">
        <rebateDetailContent :typeFlag="2" v-if="activeName==='third'"/>
      </el-tab-pane>
      <el-tab-pane label="操作日志" name="fourth">
        <rebateDetailContent :typeFlag="3" v-if="activeName==='fourth'"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>