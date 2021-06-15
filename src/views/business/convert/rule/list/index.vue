<template>
  <div class="page">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="商品入库" name="stockIn">
        <convertRuleListProductOrder :typeFlag="1" />
      </el-tab-pane>
      <el-tab-pane label="商品出库" name="stockOut">
        <convertRuleListProductOrder :typeFlag="2" />
      </el-tab-pane>
      <el-tab-pane label="商品下单" name="order">
        <convertRuleListProductOrder :typeFlag="0" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>