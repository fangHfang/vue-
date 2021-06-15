<template>
  <div>
    <div class="dialog-toolbar">
      <div class="toolbar-box  r-i-l-t-add-store-toolbar r-i-l-t-add-store-toolbar-dialog">
        <div>
          <div class="label">门店名称</div>
          <div class="content">
            <el-input v-model="toolBar.name" placeholder="请输入门店名称/门店code"></el-input>
          </div>
        </div>
        <div>
          <div class="label">门店性质</div>
          <div class="content">
            <el-select clearable v-model="toolBar.class.storeLebelValue" placeholder="请选择门店性质">
              <el-option
                  v-for="item in toolBar.class.storeLebelOptions"
                  :key="item.storeLebelValue"
                  :label="item.storeLebelLabel"
                  :value="item.storeLebelValue">
              </el-option>
            </el-select>
          </div>
        </div>
        <div>
          <div class="label">门店检索</div>
          <div class="content">
            <el-select clearable v-model="toolBar.class.value" placeholder="请选择门店检索">
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
          <div class="label">经销商名称</div>
          <div class="content">
            <el-select clearable v-model="toolBar.class.distributorValue" placeholder="请选择检索经销商">
              <el-option
                  v-for="item in toolBar.class.distributorOptions"
                  :key="item.distributorValue"
                  :label="item.distributorLabel"
                  :value="item.distributorValue">
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
        <div class="r-i-l-t-add-store-btn">
          <el-button type="primary">{{ $text.search }}</el-button>
          <el-button type="primary" plain>选择所有门店</el-button>
        </div>
      </div>
    </div>
    <div class="table-main r-i-l-t-add-store-table">
      <div class="table">
        <el-table
            :data="tableData"
            max-height="330"
            header-cell-class-name="table-header-item"
        >
          <el-table-column
              type="selection"
              width="60">
          </el-table-column>
          <el-table-column
              prop="index"
              label="序号"
              width="60">
          </el-table-column>
          <el-table-column
              prop="distributorCode"
              label="内部经销商号"
              width="160">
          </el-table-column>
          <el-table-column
              width="150"
              prop="dealerRefNo"
              label="经销商编号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="distributorName"
              label="所属经销商名称"
              width="160">
          </el-table-column>
          <el-table-column
              prop="distributorLabel"
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
              prop="storeName"
              label="门店名称"
              width="200"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="storeLabel"
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
    <div class="choose-btn-box">
      <el-button type="primary">添加</el-button>
      <el-button type="primary" plain>取消</el-button>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>