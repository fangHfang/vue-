<template>
   <div class="del-form">
      <el-form :model="form" :rules="rules" ref="form" label-width="130px">
        <el-form-item label="前端橱窗名称" prop="title">
          <el-input v-model="form.title" placeholder="请输入前端橱窗名称" ></el-input>
        </el-form-item>
        <el-form-item label="橱窗样式">
          <div class="flex flex-start">
            <div
              v-for="(item,index) in winCheckButton.list"
              :key="index"
              class="list-btn"
              :class="{'checked':form.winStyle === item.value}"
              @click="checkedWinCheckStyle(item.value)"
              >{{item.key}}</div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addForm('form')">立即创建</el-button>
          <el-button @click="close">取消</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>