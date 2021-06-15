<template>
  <el-dialog
    title="添加门店"
    :visible.sync="dialogVisible"
    width="1200px"
    destroy-on-close
    :before-close="handleClose">
  <div class="border-content">
    <div class="dialog-toolbar">
      <div class="toolbar-box dialog-set-list-toolbar">
        <div>
          <div class="label">门店名称</div>
          <div class="content">
            <el-input v-model="toolBar.name" placeholder="请输入门店名称/门店code"></el-input>
          </div>
        </div>
        <div>
          <div class="label">门店性质</div>
          <div class="content">
            <el-select clearable v-model="toolBar.nature.value" placeholder="请选择门店性质">
              <el-option
                  v-for="item in toolBar.nature.option"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div>
          <div class="label">门店标签</div>
          <div class="content">
            <el-select clearable v-model="toolBar.tag.value" placeholder="请选择门店标签">
              <el-option
                  v-for="item in toolBar.tag.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div>
          <div class="label">经销商名称</div>
          <div class="content">
            <el-select clearable v-model="toolBar.distributor.value" placeholder="请选择经销商名称">
              <el-option
                  v-for="item in toolBar.distributor.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div>
          <div class="label">经销商名称</div>
          <div class="content">
            <el-input v-model="toolBar.distributorName" placeholder="请输入经销商名称/经销商code"></el-input>
          </div>
        </div>
        <el-button type="primary">{{ $text.search }}</el-button>
        <el-button type="primary" plain>选择所有门店</el-button>
      </div>
    </div>
    <div class="table-main">
      <div class="table">
        <el-table
            :data="tableData"
            max-height="330"
            v-loading="tableLoading"
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
              label="所属经销商名称"
              width="160">
          </el-table-column>
          <el-table-column
              prop="labelNo"
              label="经销商标签"
              width="120"
              show-overflow-tooltip>
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
              prop="name"
              label="门店名称"
              width="200"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="rank"
              label="门店标签"
              width="140">
          </el-table-column>
          <el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination dialog">
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
        <el-button type="primary" @click="addStore">{{ $text.add }}</el-button>
         <el-button @click="handleClose">{{ $text.cancel }}</el-button>
      </span>
  </el-dialog>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
<style>
  .el-message-box__title > span {
    font-size: 16px;
    font-weight: 600;
  }

  .el-dialog__body .table-main {
    padding: 0 20px;
  }

  .dialog-choose-box .el-dialog__body {
    padding: 20px 0;
  }

</style>