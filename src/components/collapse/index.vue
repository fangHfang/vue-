<template>
  <!-- 折叠面板 -->
   <div class="collapse-box">
     <div>
        <slot name="title"/>
        <div @click="toggle" class="toogle-font">{{isOpen?this.closeText:this.openText}}<em :class="isOpen ?'el-icon-arrow-up':'el-icon-arrow-down'"></em></div>
     </div>
      <slot name="content" v-if="isOpen"/>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>