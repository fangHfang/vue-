<template>
  <div class="page">
    <div class="page-title">{{title}}</div>
    <div class="area-box flex-center">
      <div class="area-left">
        <div class="area-header">基础信息</div>
        <div class="row-box">
          <div class="label">区域名称</div>
          <div class="content">
            <el-input :disabled="isDetailView" class="input" v-model="toolBar.name" placeholder="请输入区域名称"></el-input>
          </div>
        </div>
      </div>
      <div class="area-right">
        <div class="area-header">配置地区(点击名称打开下级)</div>
        <div class="tree-box">
          <el-tree
            v-loading="treeLoading"
            :data="treeData"
            show-checkbox
            node-key="code"
            :default-expand-all="false"
            :render-after-expand="false"
            ref="tree"
            highlight-current
            :props="defaultProps"
            @check-change="nodeChangeCheck"
          >
          </el-tree>
        </div>
      </div>
    </div>
    <div class="row-box">
      <div class="label">备注</div>
      <div class="content">
        <el-input :disabled="isDetailView" class="input" v-model="toolBar.description" type="textarea" :row="3" resize="none" placeholder="请输入备注" maxlength="30" show-word-limit></el-input>
      </div>
    </div>
    <div class="btn-box">
      <el-button type="primary" size="small" v-if="!isDetailView" @click="saveAreaData">{{ $text.confirm }}</el-button>
      <el-button type="primary" size="small" plain @click="cancel">{{ $text.cancel }}</el-button>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>