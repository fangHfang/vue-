<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">统计时间</div>
       <div class="content">
         <el-date-picker
             v-model="toolBar.month"
             type="month"
             placeholder="选择月">
         </el-date-picker>
        </div>
      </div>
      <div>
        <div class="label">门店名称</div>
        <div class="content">
          <storeSelect @change="storeChange" ref="store"/>
        </div>
      </div>
      <el-button type="primary" @click="searchData">{{ $text.search }}</el-button>
      <el-button type="primary" plain @click="reset">{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <importExport
            :showExport="true"
        />
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          v-loading="tableLoading"
          header-cell-class-name="table-header-item"
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
          >
          </el-table-column>
          <el-table-column
            prop="id"
            width="150"
            show-overflow-tooltip
            label="经销商内部code"
          >
            <template>
              <span>{{currentRow.dealerNo}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="id"
            width="150"
            show-overflow-tooltip
            label="经销商编号"
          >
            <template>
              <span>{{currentRow.dealerRefNo}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            width="150"
            show-overflow-tooltip
            label="经销商名称"
          >
            <template>
              <span>{{currentRow.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="storeCode"
            width="150"
            show-overflow-tooltip
            label="门店内部code"
          >
          </el-table-column>
          <el-table-column
            prop="storeNo"
            width="150"
            show-overflow-tooltip
            label="门店编号"
          >
          </el-table-column>
          <el-table-column
            prop="storeName"
            width="150"
            show-overflow-tooltip
            label="门店名称"
          >
          </el-table-column>
          <el-table-column
            prop="storeTag"
            width="100"
            show-overflow-tooltip
            label="门店标签"
          >
          </el-table-column>
          <el-table-column
            prop="regionName"
            width="120"
            show-overflow-tooltip
            label="所在区域"
          >
          </el-table-column>
          <el-table-column
            prop="obtainValue"
            width="100"
            show-overflow-tooltip
            label="返利数额"
          >
          </el-table-column>
          <el-table-column
            prop="consumeValue"
            min-width="120"
            show-overflow-tooltip
            label="返利消耗数额"
          >
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
      <el-button class="return" type="primary" @click="$router.back()">{{ $text.return }}</el-button>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index.scss";
</style>
