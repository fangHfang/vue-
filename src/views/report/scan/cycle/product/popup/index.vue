<template>
<div class="select">
    <div class="toolbar-box">
      <div>
        <div class="label">扫码状况</div>
        <div class="content">
          <el-select clearable v-model="toolBar.class.value" :placeholder="$text.selectPlaceholder">
            <el-option
              v-for="item in toolBar.class.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">操作明细</div>
        <div class="content">
          <el-input v-model="toolBar.detailed" placeholder="请输入操作明细"></el-input>
        </div>
      </div>
      <div>
        <div class="label">扫码时间</div>
        <div class="content">
          <el-date-picker
            v-model="data"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>
      <el-button type="primary" class="search">{{ $text.search }}</el-button>
      <el-button type="primary" plain>{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="table">
        <el-table
          :data="tableData"
          max-height="330"
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
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            width="100"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['error', 'success', 'warning'][scope.row.state]" :message="['退货订单', '门店出库', '门店入库'][scope.row.state]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="brand"
            label="操作明细"
            width="180"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="time"
            label="扫码时间"
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