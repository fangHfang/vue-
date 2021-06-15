<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">条形码</div>
        <div class="content">
          <el-input clearable v-model="toolBar.name" @keyup.enter.native="searchBarCodeListByPage" placeholder="条形码"></el-input>
        </div>
      </div>

      <div>
        <div class="label">出货单号</div>
        <div class="content">
          <el-input clearable v-model="toolBar.outOrderNo" @keyup.enter.native="searchBarCodeListByPage" placeholder="出库单号"></el-input>
        </div>
      </div>

      <div>
        <div class="label">出货时间</div>
        <div class="content">
          <el-date-picker
              v-model="toolBar.date"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </div>
      </div>

      <el-button type="primary" @click="searchBarCodeListByPage">{{ $text.search }}</el-button>
      <span>
        <importExport
          :showImport="false"
          :importUrl="importUrl"
        />
      </span>
    </div>
    <div class="table-main">
      <div class="table">
        <el-table
          :data="tableData"
          v-loading="tableLoading"
          header-cell-class-name="table-header-item"
        >
          <el-table-column
            type="index"
            label="序号"
            width="55"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="productCode"
            label="成品代号"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="barcode"
            label="产品条码"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="specDetail"
            label="规格明细"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="spec"
            label="规格"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            prop="dealerName"
            label="所属经销商"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="dealerNo"
            label="内部经销商编码"
            width="180"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="dealerCode"
            label="外部经销商编码"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="outOrderNo"
            label="出货单号"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="created"
            label="创建时间"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="outOrderTime"
            label="出货时间"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="updated"
            label="更新时间"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="rbflag"
            label="返利有效/任务有效"
            width="100"
            show-overflow-tooltip
          >
          <template slot-scope="scope">
            <div>
              {{scope.row.rbflag === 1 ? scope.row.rbflag : scope.row.rbflag === 0 ? "有效" : "无效"}}
            </div>
          </template>
          </el-table-column>

          <el-table-column
            prop="brandName"
            label="品牌"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="type"
            label="胎别"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="size"
            label="英寸"
            width="80"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="tread"
            label="花纹"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="similarTread"
            label="同类花纹"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="blackWhiteLine"
            label="胎侧标志"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="searchField"
            label="搜索字段"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="carryingCapacity"
            label="载重"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="level"
            label="层级"
            width="80"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="loadSpeed"
            label="荷重/速度"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="period"
            label="周期"
            min-width="100"
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