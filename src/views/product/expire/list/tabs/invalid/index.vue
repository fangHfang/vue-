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
      <el-button type="primary" plain @click="resetInvalidByPage">{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar" v-show="activeName !== 'third'">
        <!-- <el-button type="primary">复原</el-button> -->
        <el-button type="primary" v-if="permission.includes('ZBPCC01080502')" @click="dialogVisible = true">{{ $text.export }}</el-button>
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
            prop="dealerName"
            label="经销商名称"
            width="170"
            show-overflow-tooltip
          >
          </el-table-column>
          <!--<el-table-column-->
            <!--prop="dealerLabelName"-->
            <!--label="经销商标签"-->
            <!--width="170"-->
            <!--show-overflow-tooltip-->
          <!--&gt;-->
          <!--</el-table-column>-->
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
          <!--<el-table-column-->
            <!--prop="storeLabelName"-->
            <!--label="门店标签"-->
            <!--width="170"-->
            <!--show-overflow-tooltip-->
          <!--&gt;-->
          <!--</el-table-column>-->
          <el-table-column
            prop="amount"
            label="当前可清积分"
            width="170"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="accountTime"
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
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>