<template>
  <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container" @wheel.native.prevent="handleScroll">
    <slot />
  </el-scrollbar>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>