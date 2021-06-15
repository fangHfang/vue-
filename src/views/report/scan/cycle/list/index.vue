<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">产品代号</div>
        <div class="content">
          <el-input clearable v-model="toolBar.productCode" placeholder="请输入产品代号"></el-input>
        </div>

      </div>
      <div>
        <div class="label">产品条码</div>
        <div class="content">
          <el-input clearable v-model="toolBar.barCode" placeholder="请输入产品条码"></el-input>
        </div>
      </div>
      <div>
        <div class="label">规格明细</div>
        <div class="content">
          <el-input clearable v-model="toolBar.specDetail" placeholder="请输入产品品牌"></el-input>
        </div>
      </div>
      <div>
        <div class="label">扫码时间</div>
        <div class="content">

          <el-date-picker
              v-model="toolBar.startTime"
              type="month"
              value-format="yyyy-MM"
              placeholder="请选择选择月份">
          </el-date-picker>
        </div>
      </div>
      <el-button type="primary" @click="searchTableData">{{ $text.search }}</el-button>
      <el-button type="primary" plain @click="resetTableData">{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <importExport
          :showExport="permission.includes('ZBPCE01020101')"
        />
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          v-loading="tableLoading"
          header-cell-class-name="table-header-item"
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
            width="80"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="toDetail(scope.row)"
              >
                查看明细
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
            prop="productCode"
            label="产品代号"
            width="170"
          >
          </el-table-column>
          <el-table-column
            prop="barcode"
            label="产品条码"
            width="170"
          >
          </el-table-column>
          <el-table-column
            prop="specDetail"
            label="规格明细"
            width="250"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="spec"
            label="产品规格"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="brandName"
            label="产品品牌"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="type"
            label="轮胎类型"
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
            width="80"
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
            min-width="80"
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
    <detail :dialogVisible.sync="dialogVisible" :currentBarCode="currentBarCode"></detail>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>