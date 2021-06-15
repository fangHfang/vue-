<template>
  <div class="page-content r-i-l-t-add-page-content">
    <h3 class="page-name">发帖详情</h3>
    <el-form :model="form" ref="form" label-width="90px">
      <div class="item-box">
        <div class="del-form">
          <div class="item-row">
            <el-form-item label="发帖标题" style="width:100%">
              <span>{{form.title}}</span>
            </el-form-item>
          </div>
          <div class="item-row">
            <el-form-item label="发帖内容" class="item-textarea r-i-l-t-add-item-textarea">
              <div v-html="form.content"></div>
            </el-form-item>
          </div>
          <div class="item-row">
            <div class="info-detail-input-box">
              <el-form-item style="margin-left: 20px;">
                <el-radio :label="true" v-model="form.openComment">不允许评论</el-radio>
              </el-form-item>
              <el-form-item label="创建人">
                <span>{{form.createBy}}</span>
              </el-form-item>
              <el-form-item label="创建人所属门店" label-width="120px">
                <span>{{form.storeName}}</span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{form.created}}</span>
              </el-form-item>
            </div>
          </div>
          <div class="item-row" v-if="mark==='approve'">
            <el-form-item label="驳回原因" class="item-textarea reason-textarea">
              <el-input type="textarea" placeholder="请输入" v-model="form.auditReason" :rows="2" resize="none"></el-input>
            </el-form-item>
          </div>
          <div class="item-row item-button r-i-l-t-add-btn">
            <el-form-item>
              <el-button v-if="mark==='approve'" type="primary" @click="saveApproval(1)">{{ $text.pass }}</el-button>
              <el-button v-if="mark==='approve'" @click="saveApproval(2)">否决</el-button>
              <el-button type="primary" plain @click="back">{{ $text.return }}</el-button>
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
