<template>
  <!-- 商城预览组件 -->
   <div class="mall-page">
     <img src="../../assets/image/window-img1.jpg">
     <div class="mall-item" v-for="(item,index) in list" :key="index" :class="{'active':index === windowActive}" @click="checkItem(index)">
        <label class="item-head">
          <h4>{{item.displayName}}</h4>
          <span>全部产品<em class="el-icon-arrow-right"></em></span>
        </label>
        <el-row>
          <el-col
              v-for="(items,indexs) in item.itemDetails"
              :key="indexs"
              :span="item.itemDetails.length | formartSpan(indexs)"><img :src="items.imgUrl||''"></el-col>
        </el-row>
        <em class="el-icon-delete-solid" @click="del(index,item.displayNo)"></em>
     </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>