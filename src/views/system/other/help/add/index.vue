<template>
 <div class="page-content">
      <h3 class="page-name">{{this.form.helpNo ? '帮助详情' : '新增帮助'}}</h3>
      <el-form :model="form" ref="form" label-width="90px">
      <div class="item-box">
        <div class="del-form">
            <div class="item-row">
              <el-form-item label="帮助标题">
                <el-input v-model="form.name" placeholder="请输入帮助标题"></el-input>
              </el-form-item>
            </div>
            <div class="item-row">
              <el-form-item label="帮助内容" class="item-textarea">
                <TinyEditor ref="tinyEditor" style="max-width:1000px;" :value="form.content"></TinyEditor>
              </el-form-item>
            </div>
             <div class="item-row item-button">
              <el-form-item>
                <el-button type="primary" @click="helpCreate(1)">保存并上架</el-button>
                <el-button @click="helpCreate(0)">仅保存</el-button>
                <el-button @click="back">{{ $text.cancel }}</el-button>
              </el-form-item>
            </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
