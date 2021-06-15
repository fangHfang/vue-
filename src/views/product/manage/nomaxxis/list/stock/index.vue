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
          <div class="label" style="width: 160px">库存统一调整</div>
          <div class="content">
            <el-radio v-model="toolBar.redio" label="1">增加&nbsp;&nbsp;
              <el-input type="number" v-model="toolBar.addNum" placeholder="" min="0" oninput="value=value.replace(/[^0-9]/g,'')"></el-input>
            </el-radio>
            <el-radio v-model="toolBar.redio" label="0">减少&nbsp;&nbsp;
              <el-input type="number" v-model="toolBar.reduceNum" placeholder="" min="0" oninput="value=value.replace(/[^0-9]/g,'')"></el-input>
            </el-radio>
          </div>
        </div>
        <el-button type="primary" @click="save" style="margin-left: 78px;">生效</el-button>
      </div>
      <div class="toolbar-box">
        <div>
          <div class="label" style="width:120px;">经销商名称</div>
          <div class="content">
            <dealerSelect @change="dealerChange" ref="dealer"/>
          </div>
        </div>
        <el-button type="primary" @click="searchData">{{ $text.search }}</el-button>
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
                    flex="left"
                    align="center"
                    width="100"
            >
            </el-table-column>
            <el-table-column
                    label="操作"
                    flex="left"
                    width="80"
            >
              <template slot-scope="scope">
                <el-button
                        type="text"
                        size="small"
                        @click="adjust(scope.row)">
                  调整
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
                    prop="customerName"
                    label="经销商名称"
                    width="200"
                    show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                    prop="outRefNo"
                    label="内部经销商号"
                    width="200"
                    show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                width="150"
                prop="customerNo"
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
    <dialogAdjust :stockNo="stockNo" :dialogVisible.sync="adjustVisible" @saveStockNo="saveStockNo" />
  </el-dialog>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>