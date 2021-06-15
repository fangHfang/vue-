<template>
  <!-- 横幅预览组件 -->
   <div class="mall-page">
     <img :src="imgSrc">
     <div class="mall-item" v-for="(item,index) in list" :key="index">
       <img :src="item.imgUrl">
     </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>