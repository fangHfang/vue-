<template>
  <div class="page">
    <div class="toolbar-box down-store-info-list-toolbar">
      <div>
        <div class="label">查找订单</div>
        <div class="content">
          <el-input clearable v-model="toolBar.searchOrder" placeholder="请输入订单号"></el-input>
        </div>
      </div>
      <div>
        <div class="label">车辆VIN码</div>
        <div class="content">
          <el-input clearable v-model="toolBar.vehicleCode" placeholder="请输入车辆VIN码"></el-input>
        </div>
      </div>
      <div>
        <div class="label">激活时间</div>
        <div class="content">
          <el-date-picker
                  v-model="toolBar.createTime"
                  type="daterange"
                  range-separator="~"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['00:00:00', '23:59:59']"
          />
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
          <storeSelect @change="storeChange" ref="store"/>
        </div>
      </div>
      <div>
        <div class="label">按条形码查找</div>
        <div class="content">
          <el-input clearable v-model="toolBar.barCode" placeholder="请输入条形码"></el-input>
        </div>
      </div>
      <el-button type="primary" @click="searchData">{{ $text.search }}</el-button>
      <el-button type="primary" plain @click="resetTableData">{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <importExport
            :showExport="permission.includes('ZBPCC01010301')"
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
            type="index"
            label="序号"
            width="60"
          >
          </el-table-column>
          <el-table-column
                  prop="warehouseOutNo"
                  label="订单编号"
                  width="200"
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
                  width="220"
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="dealerName"
                  label="所属经销商"
                  width="220"
                  show-overflow-tooltip
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
                  prop="carFrameNumber"
                  label="车辆VIN码"
                  width="180"
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="itemBarCode"
                  label="条形码"
                  width="160"
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="warehouseOutDetailRebateAmount"
                  label="返利值"
                  width="100"
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="warehouseOutDetailIntegrationAmount"
                  label="积分"
                  width="100"
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="warehouseOutDetailExchangeAmount"
                  label="兑换点"
                  width="100"
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="startTime"
                  label="激活时间"
                  min-width="160"
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