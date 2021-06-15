<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">操作描述</div>
        <div class="content">
          <el-input clearable v-model="toolBar.description" placeholder="操作描述关键字"></el-input>
        </div>
      </div>
      <div>
        <div class="label">操作时间</div>
        <div class="content">
          <el-date-picker
            v-model="toolBar.startTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
      <div>
        <div class="label">操作人</div>
        <div class="content">
          <el-input clearable v-model="toolBar.operator" placeholder="操作人"></el-input>
        </div>
      </div>
      <el-button type="primary" @click="searchDataPage">{{ $text.search }}</el-button>
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
            width="50"
            align="center"
          >
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="60"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="description"
            label="操作描述"
            width="180"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="updateBy"
            label="操作人"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="operator"
            label="账号"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="operationTime"
            label="操作时间"
            sortable
            show-overflow-tooltip
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
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>