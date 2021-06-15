<template>
  <div class="page">
    <div style="padding: 15px 0 0 15px;font-weight: 500;color: #333;">通知记录详情</div>
    <div class="toolbar-box activity-toolbar-box detail-toolbar">
      <div>
        <div class="label">通知时间</div>
        <div class="content">
          <el-input v-model="created" readonly></el-input>
        </div>
      </div>
      <div>
        <div class="label">操作人</div>
        <div class="content">
          <el-input v-model="createBy" readonly></el-input>
        </div>
      </div>
    </div>
    <div class="activity-btn-box">
      <div>通知信息管理</div>
    </div>
    <div class="toolbar-box activity-detail-toolbar-box">
      <div>
        <div class="label">门店名称</div>
        <div class="content">
          <el-input v-model="toolBar.storeName" placeholder="请输入门店名称"></el-input>
        </div>
      </div>
      <div>
        <div class="label">经销商名称</div>
        <div class="content">
          <el-input v-model="toolBar.dealerName" placeholder="请输入经销商名称"></el-input>
        </div>
      </div>
      <el-button type="primary" @click="listIntegralNotifyDetailByPage">{{ $text.search }}</el-button>
      <el-button type="primary" @click="cleanSearch" plain>{{ $text.reset }}</el-button>
    </div>
    <div class="table-main" v-show="tableDetailShow">
      <div class="table">
        <el-table
          :data="tableData"
          max-height="330"
          header-cell-class-name="table-header-item"
          v-loading="tableLoading"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            fixed="left"
            type="selection"
            width="55"
          >
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="80"
          >
          </el-table-column>
          <el-table-column
              width="150"
              prop="dealerNo"
              label="内部经销商号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              width="150"
              prop="dealerRefNo"
              label="经销商编号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="dealerName"
            label="经销商名称"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="dealerLabelName"
            label="经销商标签名称"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="storeNo"
              width="150"
              label="内部门店号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="storeRefNo"
              width="150"
              label="门店编号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="storeName"
            label="门店名称"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="storeLabelName"
            label="门店标签名称"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="content"
            label="通知内容"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.current"
          :page-sizes="pagination.sizes"
          :page-size="pagination.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        >
        </el-pagination>
        <el-button type="primary" size="small">{{ $text.paginationGo }}</el-button>
      </div>
    </div>
    <!--<div class="activity-btn-box">-->
      <!--<div>通知信息</div>-->
    <!--</div>-->
    <!--<div class="activity-btn-box">-->
      <!--<el-input type="textarea" resize="none" rows="5" v-model="content" maxlength="200" show-word-limit></el-input>-->
    <!--</div>-->
    <div class="btn-box">
      <el-button type="primary" size="small" @click="sendNotice">再次通知</el-button>
      <el-button type="primary" size="small" plain @click="$router.back()">{{ $text.cancel }}</el-button>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
<style>
  .detail-toolbar .el-input .el-input__inner{
    border: none ;
    color: #000;
  }
  .state-box .i-status div.success{
    margin-top: 5px;
  }
</style>