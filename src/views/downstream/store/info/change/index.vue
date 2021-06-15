<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">发生时间</div>
        <div class="content">
          <el-date-picker
              v-model="toolBar.date"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
      <div>
        <div class="label">操作人</div>
        <div class="content">
          <el-input v-model="toolBar.operator" placeholder="输入操作人名称"></el-input>
        </div>
      </div>
      <el-button type="primary" @click="searchStoreListChangeByPage">{{ $text.search }}</el-button>
      <importExport
          style="margin-left: 0px;"
          :showExport="permission.includes('ZBPCB01020306')"
      />
    </div>
    <div class="table-main">
      <div class="actionbar">
        <div>
          <p>经销商名称:</p>
          <p>{{info.dealerName || '-'}}</p>
        </div>
        <div>
          <p>经销商code:</p>
          <p>{{info.dealerNo || '-'}}</p>
        </div>
        <div>
          <p>门店名称:</p>
          <p>{{info.storeName || '-'}}</p>
        </div>
        <div>
          <p>门店code:</p>
          <p>{{info.storeNo || '-'}}</p>
        </div>
        <div>
          <p>当前性质:</p>
          <p>{{info.level || '-'}}</p>
        </div>

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
            prop="levelAfter"
            label="性质变化后"
          >
          </el-table-column>
          <el-table-column
            prop="levelBefore"
            label="性质变化前"
          >
          </el-table-column>
          <el-table-column
            prop="changeTime"
            label="发生时间"
          >
          </el-table-column>
          <el-table-column
            prop="changeBy"
            label="操作人"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="changeUserNo"
            label="操作账号"
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
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
