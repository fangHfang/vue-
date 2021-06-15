<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">统计时间</div>
        <div class="content">
           <el-date-picker
              v-model="toolBar.date"
              type="daterange"
              range-separator="-"
              :default-time="['00:00:00', '23:59:59']"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
        </div>
      </div>
      <div>
        <div class="label">经销商名称</div>
        <div class="content">
          <dealerSelect @change="dealerChange"/>
        </div>
      </div>
      <div>
        <div class="label">门店名称</div>
        <div class="content">
          <storeSelect @change="storeChange"/>
        </div>
      </div>
      <div>
        <div class="label">优惠券名称</div>
        <div class="content">
          <el-input clearable v-model="toolBar.ruleName" placeholder="优惠券名称"></el-input>
        </div>
      </div>
      <div>
        <div class="label">优惠券券码</div>
        <div class="content">
          <el-input clearable v-model="toolBar.ruleNo" placeholder="优惠券券码"></el-input>
        </div>
      </div>
      <div>
        <div class="label">优惠劵状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.isReceived" placeholder="请选择">
              <el-option label="未领取" :value="0"/>
              <el-option label="已领取" :value="1"/>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="search">{{ $text.search }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar" v-show="activeName !== 'third'">
        <importExport
            :showExport="permission.includes('ZBPCC01070501')"
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
            label="序号"
            width="50"
            type="index"
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
             show-overflow-tooltip
            width="220"
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
             show-overflow-tooltip
            width="220"
          >
          </el-table-column>
          <el-table-column
            prop="ruleName"
            label="优惠券名称"
             show-overflow-tooltip
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="ruleNo"
            label="优惠券券码"
            show-overflow-tooltip
            width="220"
          >
          </el-table-column>
          <el-table-column
            prop="couponAmount"
            label="金额（元）"
             show-overflow-tooltip
            width="90"
          >
          </el-table-column>
          <el-table-column
            prop="amount"
            label="送出数量"
             show-overflow-tooltip
            width="90"
          >
          </el-table-column>
          <el-table-column
            prop="grantTime"
            label="送出时间"
             show-overflow-tooltip
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="receiveExpireTime"
            label="领取截至时间"
             show-overflow-tooltip
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="receiveTime"
            label="领取时间"
            show-overflow-tooltip
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="isReceived"
            label="领取状态"
            width="90"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['error', 'success'][scope.row.isReceived ? 1 : 0]" :message="['未领取', '已领取'][scope.row.isReceived ? 1 : 0]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
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