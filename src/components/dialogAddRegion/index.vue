<template>
  <el-dialog
      title="选择区域"
      :visible.sync="dialogVisible"
      width="1200px"
      destroy-on-close
      :before-close="handleClose">
    <div class="border-content">
      <div class="toolbar-box convert-rule-toolbar">
        <div>
          <div class="label">区域名称</div>
          <div class="content">
            <el-input clearable v-model="toolBar.name" placeholder="区域名称" @keyup.enter.native="listRegionByPage"></el-input>
          </div>
        </div>
        <div>
          <div class="label">区域状态</div>
          <div class="content">
            <el-select clearable v-model="toolBar.class.value" placeholder="请选择区域状态">
              <el-option
                  v-for="item in toolBar.class.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <el-button type="primary" @click="searchData">{{ $text.search }}</el-button>
        <el-button type="primary" plain @click="reset">{{ $text.reset }}</el-button>
      </div>
      <div class="">
        <div class="table" style="margin-bottom:10px;">
          <el-table
              :data="tableData"
              max-height="400"
              @selection-change="handleSelectionChange"
              header-cell-class-name="table-header-item"
          >
            <el-table-column
                type="selection"
                width="60">
            </el-table-column>
            <el-table-column
                type="index"
                label="序号"
                width="60">
            </el-table-column>
            <el-table-column
                prop="name"
                label="区域名称"
                show-overflow-tooltip
                width="200">
            </el-table-column>
            <el-table-column
                prop="storeNums"
                label="区域下门店数量"
                width="160"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="created"
                label="创建时间"
                width="200"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态"
                width="160">
              <template slot-scope="scope">
                <i-status :type="['warning', 'success'][scope.row.status]" :message="['关闭', '启用'][scope.row.status]"/>
              </template>
            </el-table-column>
            <el-table-column
                prop="description"
                label="备注"
                min-width="160"
                show-overflow-tooltip>
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
        <el-button type="primary" @click="btnLoading = true;$throttle(handleAdd) " :loading="btnLoading">{{ $text.save }}</el-button>
         <el-button @click="handleClose">{{ $text.cancel }}</el-button>
      </span>
  </el-dialog>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>