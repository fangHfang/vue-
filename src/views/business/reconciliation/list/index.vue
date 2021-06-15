<template>
  <div class="page">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="已受理" name="accepted">
        <mainList :typeFlag="0"/>
      </el-tab-pane>
<!--      <el-tab-pane label="不合格" name="unqualified" lazy>-->
<!--        <mainList :typeFlag="1"/>-->
<!--      </el-tab-pane>-->
      <el-tab-pane label="已入账" name="Stored" lazy>
        <mainList :typeFlag="2"/>
      </el-tab-pane>
      <el-tab-pane label="未对账" name="noReconciliation" lazy>
        <mainList :typeFlag="1"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>