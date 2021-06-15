<template>
  <div class="page">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first">
        <convertStoreRuleDetailAll :id="id" :customerNo="customerNo" :epRuleNo="epRuleNo" category="" />
      </el-tab-pane>
      <el-tab-pane label="获取记录" name="second">
        <convertStoreRuleDetailAll :id="id" :customerNo="customerNo" :epRuleNo="epRuleNo" category="0" />
      </el-tab-pane>
      <el-tab-pane label="消耗记录" name="third">
        <convertStoreRuleDetailAll :id="id" :customerNo="customerNo" :epRuleNo="epRuleNo" category="1" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>