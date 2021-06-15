<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">按门店</div>
        <div class="content">
          <storeSelect @change="storeChange" ref="store"/>
        </div>
      </div>
      <div>
        <div class="label">按经销商</div>
        <div class="content">
            <dealerSelect @change="dealerChange" ref="dealer"/>
        </div>
      </div>
      <el-button type="primary" @click="searchDataPage">{{ $text.search }}</el-button>
      <el-button type="primary" plain @click="resetIntegralStoreList">{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button type="primary" @click="updateIntegral" v-if="permission.includes('ZBPCC01080302')">积分调整</el-button>
        <el-button type="primary" @click="freeze" v-if="permission.includes('ZBPCC01080304')">冻结门店</el-button>
        <importExport
            :showExport="permission.includes('ZBPCC01080301')"
        />
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          header-cell-class-name="table-header-item"
          v-loading="tableLoading"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            fixed="left"
            type="selection"
            width="55"
          >
          </el-table-column>
          <el-table-column
            fixed="left"
            label="操作"
            width="140"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="toDetail(scope.row)"
              >
                {{ $text.detail }}
              </el-button>
              <el-button
                type="text"
                size="small"
                v-if="permission.includes('ZBPCC01080303')"
                :disabled="scope.row.state === 1"
                @click="unfreeze(scope.row)"
              >
                解冻门店
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="60"
          >
          </el-table-column>
          <el-table-column
              width="200"
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
            label="经销商名称"
            width="220"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="storeNo"
              width="200"
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
            width="180"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="availableAmount"
            label="当前可用积分"
            width="160"
          >
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            width="100"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['error', 'success'][scope.row.state]" :message="['冻结', '正常'][scope.row.state]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column/>
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
    <el-dialog
      title="积分调整"
      :visible.sync="dialogVisible"
      width="400px"
      :before-close="handleClose">
      <Adjustment ref="Adjustment" :formData="formData" :confirm="confirmAdjustment" @confirmBack="confirmBack" @confirmeErorBack='confirmeErorBack' />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false;confirmAdjustment=false">{{ $text.cancel }}</el-button>
        <el-button type="primary" :loading='btnLoading' @click="confirm()">{{ $text.confirm }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>