<template>
  <!-- 横幅预览组件 -->
   <div class="mall-page">
     <img :src="imgSrc">
      <swiper ref="mySwiper" :options="swiperOptions" class="swiper">
        <swiper-slide v-for="(item,index) in list" :key="index"><img :src="item.imgUrl" style="width:100%;height:100%;object-fit: cover"></swiper-slide>
      </swiper>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>