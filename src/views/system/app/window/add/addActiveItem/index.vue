<template>
    <div class="del-form">
      <el-form :model="form" :rules="rules" ref="form" label-width="0px">
          <div class="item-row" style="width:100%;">
            <div class="sort-box">
              <el-button @click="toUp" :disabled="index === 0" type="primary" class="sort" icon="el-icon-caret-top" size="mini"></el-button>
              <el-button @click="toDown" :disabled="index === total-1" type="primary" class="sort" icon="el-icon-caret-bottom" size="mini"></el-button>
            </div>
            <el-form-item label="" prop="activeListImg" class="upload-wrap " style="width: 140px">
              <upload ref="upload" :fileList.sync="form.activeListImg" :limit="1"/>
            </el-form-item>
            <div>
              <el-form-item label="" prop="activeType" style="width: 100%;">
                <el-radio-group v-model="form.linkType" @change="(val)=>$emit('setSelectInfo',val)">
                  <el-radio :label="0">配置活动</el-radio>
                  <el-radio :label="7">活动类型</el-radio>
                  <el-radio :label="1">商品分组</el-radio>
                  <el-radio :label="2">套餐商品</el-radio>
                  <el-radio :label="3">商品分类</el-radio>
                  <el-radio :label="4">商品品牌</el-radio>
                  <el-radio :label="5">单独商品</el-radio>
                  <el-radio :label="6">网页链接</el-radio>
                </el-radio-group>
              </el-form-item>
                <el-form-item label="" prop="activeUrl" style="width: 100%;">
                <el-input v-model="form.linkUrl" placeholder="请输入链接"></el-input>
              </el-form-item>
             </div>
          </div>
      </el-form>
    </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>