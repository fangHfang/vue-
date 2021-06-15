<template>
  <div class="page">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="出售中" name="first">
        <SoldIn v-if="activeName==='first'"></SoldIn>
      </el-tab-pane>
      <el-tab-pane label="仓库中" name="second" lazy>
        <WarehouseIn v-if="activeName==='second'"></WarehouseIn>
      </el-tab-pane>
      <el-tab-pane label="审核中" name="third" lazy>
        <UnderReview v-if="activeName==='third'"></UnderReview>
      </el-tab-pane>
      <!--<el-tab-pane label="已售完" name="fourth">-->
        <!--<SoldOut></SoldOut>-->
      <!--</el-tab-pane>-->
    </el-tabs>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
