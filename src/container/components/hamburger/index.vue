<template>
  <div>
    <i
      :class="{'is-active':isActive}"
      class="hamburger el-icon-s-fold"
      @click="toggleClick"
    />
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>