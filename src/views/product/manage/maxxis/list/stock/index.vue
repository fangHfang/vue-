<template>
  <el-dialog
          title="商品库存明细"
          :visible.sync="dialogVisible"
          width="1200px"
          destroy-on-close
          :before-close="handleClose">
    <div class="border-content">
      <div class="toolbar-box">
        <div>
          <div class="label">库存总数</div>
          <div class="content">
            <el-input v-model="toolBar.stockNo" placeholder="请输入库存总数" readOnly></el-input>
          </div>
        </div>
        <div>
          <div class="label">经销商名称</div>
          <div class="content">
            <dealerSelect @change="dealerChange" ref="dealer"/>
          </div>
        </div>
        <el-button type="primary" @click="listTableData">{{ $text.search }}</el-button>
      </div>
      <div class="table-main" style="padding:0;">
        <div class="table">
          <el-table
                  ref="multipleTable"
                  v-loading="tableLoading"
                  :data="tableData"
                  max-height="330"
                  @selection-change="handleSelectionChange"
                  header-cell-class-name="table-header-item"
          >
            <el-table-column
                    type="index"
                    label="序号"
                    align="center"
                    width="100"
            >
            </el-table-column>
            <el-table-column
                    prop="customerName"
                    label="经销商名称"
                    width="180"
                    show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                    prop="customerNo"
                    label="内部经销商号"
                    width="180"
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
                    prop="availableStock"
                    label="库存数量"
                    width="120"
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
    </div>
    <span slot="footer" class="dialog-footer flex-center">
         <el-button @click="handleClose">{{ $text.cancel }}</el-button>
      </span>
  </el-dialog>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>