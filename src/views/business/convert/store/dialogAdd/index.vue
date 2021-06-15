<template>
  <div class="del-form">
    <el-form :model="form" :rules="rules" ref="form" label-width="80px">
      <el-form-item label="门店名称" prop="name">
        <el-input disabled v-model="form.name" />
      </el-form-item>
      <el-form-item label="门店编号" prop="name">
        <el-input disabled v-model="form.one" />
      </el-form-item>
      <el-form-item label="当前可用兑换点" prop="name">
        <el-input disabled v-model="form.storeAmount" />
      </el-form-item>
      <el-form-item>
        <el-radio v-model="radio" label="1">增加</el-radio>
        <el-radio v-model="radio" label="2">减少</el-radio>
      </el-form-item>
      <el-form-item label="兑换点">
        <el-input clearable v-model="form.three" placeholder="请输入兑换点" />
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input clearable type="textarea" resize="none" :rows="3" v-model="form.remarks"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>