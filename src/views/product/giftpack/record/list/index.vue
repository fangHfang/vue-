<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">领取时间</div>
        <div class="content">
          <el-date-picker
              v-model="toolBar.date"
              type="daterange"
              unlink-panels
              value-format="yyyy/MM/dd"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
      <div>
        <div class="label" style="width: 100px;">经销商名称</div>
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
        <div class="label">礼包名称</div>
        <div class="content">
          <el-input v-model="toolBar.regPkgName" placeholder="请输入礼包名称" clearable></el-input>
        </div>
      </div>
      <el-button type="primary" @click="searchTableData">{{ $text.search }}</el-button>
      <el-button type="primary" plain @click="resetTableData">{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <importExport
            :showExport="permission.includes('ZBPCD01030201')"
        />
      </div>
      <div class="table">
        <el-table
            :data="tableData"
            v-loading="tableLoading"
            @selection-change="handleSelectionChange"
            header-cell-class-name="table-header-item"
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
              prop="storeName"
              label="门店名称"
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
              prop="regPkgName"
              label="礼包名称"
              width="140"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="regPkgNo"
              label="礼包编码"
              width="200"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="drawTime"
              label="领取时间"
              width="160"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="time"
              label="礼包活动时间"
              min-width="300"
              show-overflow-tooltip
          >
            <template slot-scope="scope" >
              {{scope.row.beginTime}}-{{scope.row.endTime}}
            </template>
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