<template>
  <div class="has-logo">
    <div class="logo flex-center">
      <img src="../../../assets/image/logo.png" class="img" alt="">
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
          :show-timeout="200"
          :default-active="activeMenu"
          :collapse="isCollapse"
          text-color="#333"
          active-text-color="#fff"
          mode="vertical"
          :default-openeds="openeds"
      >
        <item v-for="route in realRoutes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>