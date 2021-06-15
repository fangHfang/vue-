<template>
 <div class="page-content">
      <h3 class="page-name">{{pageTitle}}</h3>
      <el-form :model="form" ref="form" label-width="90px">
        <div class="item-box">
          <div class="del-form">
            <div class="item-row">
              <el-form-item label="发帖标题" style="width:40%;max-width:450px;">
                <el-input v-model="form.name" placeholder="请输入发帖标题"></el-input>
              </el-form-item>
              <el-form-item style="margin-left: 20px">
                <el-checkbox v-model="form.closeComment" class="comment-check">不允许评论</el-checkbox>
              </el-form-item>
            </div>
            <div class="item-row">
              <el-form-item label="发帖内容" class="item-textarea">
                <TinyEditor ref="tinyEditor" style="max-width:1000px;" :value="form.content"></TinyEditor>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="table-main">
          <div class="btn-box" style="padding-bottom: 30px;">
            <el-button type="primary" @click="publish">确认发布</el-button>
            <el-button @click="save">保存</el-button>
            <el-button @click="back">{{ $text.cancel }}</el-button>
          </div>
        </div>
      </el-form>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
