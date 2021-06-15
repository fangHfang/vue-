<template>
  <div class="page">
    <div class="phone-box">
      <p>手机号码</p>
      <el-input v-model="phone" :maxlength="11" clearable></el-input>
      <p>请保持手机号正确</p>
      <el-button type="primary" @click="send">{{ $text.paginationGo }}</el-button>
    </div>
    <div class="code-box" v-loading="isLoading">
      <p>验证码</p>
      <p>{{code}}</p>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>