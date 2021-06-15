
<template>
<div class="login-container">
  <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
    <div class="title-container">
      <h3 class="title">
        玛吉斯轮胎
      </h3>
    </div>

    <el-form-item prop="username">
        <span class="svg-container">
          <i class="iconfont yonghu" />
        </span>
      <el-input
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          auto-complete="on"
      />
    </el-form-item>

    <el-form-item prop="password">
        <span class="svg-container">
          <i class="password el-icon-s-help" />
        </span>
      <el-input
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
      />
      <span class="show-pwd" @click="showPwd">
<!--          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />-->
        </span>
    </el-form-item>

    <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;padding:12px;"
        @click.native.prevent="handleLogin"
    >
      登录
    </el-button>
  </el-form>
</div>
</template>
<!-- 品牌管理 -->
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>