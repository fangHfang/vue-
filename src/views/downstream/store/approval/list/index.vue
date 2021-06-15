<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">审批状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.approveStatus.value" placeholder="请选择审批状态">
            <el-option
                    v-for="item in toolBar.approveStatus.options"
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
          <dealerSelect @change="dealerChange" ref="dealer"/>
        </div>
      </div>

      <div>
        <div class="label">门店名称</div>
        <div class="content">
          <storeSelect @change="storeChange"/>
        </div>
      </div>
      <el-button type="primary" @click="searchStoreLocationListByPage">{{ $text.search }}</el-button>
      <el-button type="text" size="small" @click="dialogLocationVisible = true">&nbsp;新增定位审批设置</el-button>
    </div>
    <div class="table-main">
      <div class="table">
        <el-table
          :data="tableData"
          v-loading="tableLoading"
          header-cell-class-name="table-header-item"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
          type="selection">
          </el-table-column>
          <el-table-column
                  fixed="left"
                  type="index"
                  label="序号"
                  width="80"
          >
          </el-table-column>
          <el-table-column
                  fixed="left"
                  label="操作"
                  width="80"
                  show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-button
                      type="text"
                      size="small"
                       v-if="permission.includes('ZBPCB01020201')"
                      @click="toApproveView(scope.row)"
              >
                {{ $text.approve }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
              prop="storeNo"
              width="200"
              label="内部门店编号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="storeRefNo"
              width="100"
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
            prop="dealerNo"
            label="内部经销商编号"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="dealerRefNo"
            label="经销商编号"
            width="100"
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
            prop="addressDetail"
            label="门店定位地址"
            min-width="260"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="approveType"
            label="审批类型"
            width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="approveStatus"
            label="审批状态"
            width="140"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <i-status :type="['warning', 'success' , 'error'][scope.row.approveStatus]" :message="['待处理', '已通过', '已拒绝'][scope.row.approveStatus]"/>
            </template>
          </el-table-column>
          <el-table-column
            width="80"
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
      </div>
    </div>
    <dialogAddLocation :dialogVisible.sync="dialogLocationVisible" @selectLocation="getSelectLocation"/>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>