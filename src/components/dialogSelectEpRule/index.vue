<template>
  <el-dialog
      title="选择兑换点规则"
      :visible.sync="dialogVisible"
      width="1000px"
      destroy-on-close
      :before-close="handleClose">
    <div class="border-content">
      <div class="toolbar-box convert-rule-toolbar">
      <div>
        <div class="label">兑换点规则</div>
        <div class="content">
          <el-input clearable v-model="toolBar.ruleName" placeholder="请输入兑换点规则"></el-input>
        </div>
      </div>
      <div>
        <div class="label">创建人</div>
        <div class="content">
          <el-input clearable v-model="toolBar.createBy" placeholder="请输入创建人"></el-input>
        </div>
      </div>
      <div>
        <div class="label">创建时间</div>
        <div class="content">
          <el-date-picker
              v-model="toolBar.dataRange"
              type="daterange"
              range-separator="~"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </div>
      </div>
      <el-button type="primary" @click="search">{{ $text.search }}</el-button>
      <el-button type="primary" plain @click="reset">{{ $text.reset }}</el-button>
    </div>
      <div class="">
        <div class="table" style="margin-bottom:10px;">
          <el-table
              :data="tableData"
              max-height="330"
              v-loading="tableLoading"
              @selection-change="handleSelectionChange"
              header-cell-class-name="table-header-item"
          >
            <el-table-column
                type="selection"
                width="55"
            >
            </el-table-column>
            <el-table-column
                type="index"
                label="序号"
                width="60"
            >
            </el-table-column>
            <el-table-column
                prop="ruleName"
                label="兑换点规则名称"
                width="200"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="createBy"
                label="创建人"
                width="200"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="created"
                label="规则创建时间"
                width="200"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination" style="display:flex;justify-content: flex-end">
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
        <el-button type="primary" @click="btnLoading = true;$throttle(addProduct,500)" :loading='btnLoading'>{{ $text.add }}</el-button>
         <el-button @click="handleClose">{{ $text.cancel }}</el-button>
      </span>
  </el-dialog>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>