<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">门店名称</div>
        <div class="content">
          <storeSelect @change="storeChange" ref="store"/>
        </div>
      </div>
      <div>
        <div class="label" style="width:140px">经销商名称</div>
        <div class="content">
          <dealerSelect @change="dealerChange" ref="dealer"/>
        </div>
      </div>
      <el-button type="primary" @click="searchDataPage">{{ $text.search }}</el-button>
      <el-button type="primary" plain @click="resetCleanByPage">{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar" v-show="activeName !== 'third'">
        <div class="left-button">
          <div>门店有效积分:2年</div>
          <span>（从2021年3月20日开始，每两年系统自动清除一次门店积分，下一次清除时间2023年3月20日）</span>
          <!-- <el-button type="primary" @click="dialogVisible = true">调整</el-button> -->
        </div>
        <div class="right-button flex">
          <el-button type="primary" v-if="permission.includes('ZBPCC01080503')">积分失效</el-button>
          <el-button type="primary" @click="notice2Store" v-if="permission.includes('ZBPCC01080504')">通知门店</el-button>
          <importExport
              :showExport="permission.includes('ZBPCC01080502')"
          />
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
            prop="dealerNo"
            label="内部经销商编号"
            width="170"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="dealerRefNo"
            label="经销商编号"
            width="170"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="dealerName"
            label="经销商名称"
            width="170"
            show-overflow-tooltip
          >
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
            width="170"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="storeLabelNames"
            label="门店标签"
            width="170"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="availableAmount"
            label="当前可清积分"
            width="170"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="invalidDate"
            label="积分到期时间"
            width="170"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column />
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
    <dialogNotice :dialogVisible.sync="dialogVisible" :stores="multipleSelection"/>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>