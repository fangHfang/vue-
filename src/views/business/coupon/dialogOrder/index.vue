<template>
  <el-dialog
      title="订单发货"
      :visible.sync="dialogVisible"
      width="800px"
      destroy-on-close
      :before-close="handleClose">
        <div class="activity-btn-box">
      <div class="title">已选门店</div>
    </div>
    <div class="table-main" v-show="tableDetailShow">
      <div class="table">
        <el-table
          :data="tableData"
          max-height="430"
          header-cell-class-name="table-header-item"
        >
          <el-table-column
            type="index"
            label="序号"
            width="80"
          >
          </el-table-column>
          <el-table-column
            prop="orderNo"
            label="兑换单号"
            width="300"
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
            show-overflow-tooltip
          >
          </el-table-column>

        </el-table>
      </div>
    </div>
    <div class="activity-btn-box">
      <div class="title">快递单号</div>
    </div>
      <el-input clearable style="height:32px;" v-model="courierNo" placeholder="请输入快递单号"></el-input>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{ $text.cancel }}</el-button>
        <el-button type="primary" @click="btnLoading = true;$throttle(submitForm)" :loading='btnLoading'>{{ $text.paginationGo }}</el-button>
      </span>
    </el-dialog>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>