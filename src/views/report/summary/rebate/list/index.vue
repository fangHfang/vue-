<template>
  <div class="page">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="返利汇总" name="first"></el-tab-pane>
      <el-tab-pane label="积分汇总" name="second"></el-tab-pane>
<!--      <el-tab-pane label="兑换点汇总" name="third"></el-tab-pane>-->
    </el-tabs>
    <div class="toolbar-box">
    <div>
      <div class="label">统计时间</div>
      <div class="content">
        <el-date-picker
          v-model="toolBar.month"
          type="month"
          value-format="yyyy-MM"
          placeholder="选择月">
        </el-date-picker>

      </div>
    </div>
    <div>
      <div class="label">经销商名称</div>
      <div class="content">
            <dealerSelect @change="dealerChange" ref="dealer" @item-change="dealerItemChange"/>
      </div>
    </div>
    <el-button type="primary" @click="searchData">{{ $text.search }}</el-button>
    <el-button type="primary" @click="cleanSearch" plain>{{ $text.reset }}</el-button>
  </div>
  <div class="table-main">
    <div class="actionbar">
      <importExport
          :showExport="permission.includes('ZBPCE01050101')"
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
            width="100"
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
            prop="name"
            label="经销商名称"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            prop="address"
            label="地址"
            width="250"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            prop="regionName"
            label="所在区域"
            width="200"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{(scope.row.regionName || []).join(',')}}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="obtainValue"
            label="返利数额"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="consumeValue"
            label="返利消耗数额"
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
  @import "./index.scss";
</style>
