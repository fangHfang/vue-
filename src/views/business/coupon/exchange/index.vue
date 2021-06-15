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
        <div class="label">按单号</div>
        <div class="content">
          <el-input clearable v-model="toolBar.orderNo" placeholder="请输入兑换单号"></el-input>
        </div>
      </div>
      <div>
        <div class="label">按状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.status.value" placeholder="请选择状态">
            <el-option
              v-for="item in toolBar.status.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="searchData" >{{ $text.search }}</el-button>
      <el-button type="primary" @click="cleanSearch" plain>{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button type="primary" @click="oppenDialog" v-if="permission.includes('ZBPCC01060302')">发货</el-button>
        <importExport
            :showExport="permission.includes('ZBPCC01060301')"
        />
        <!-- <el-button type="primary">{{ $text.detail }}</el-button> -->
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
            fixed="left"
            label="操作"
            width="80"
          >
            <template slot-scope="scope" >
              <el-button
                type="text"
                size="small"
                @click="toDetail(scope.row.orderNo)"
              >
                {{ $text.detail }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="序号"
            width="50"
            type="index"
          >
          </el-table-column>
          <el-table-column
            prop="orderNo"
            label="兑换单号"
            width="200"
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
             show-overflow-tooltip
            width="150"
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
            width="200"
          >
          </el-table-column>
          <el-table-column
            prop="integrationAmount"
            label="积分获取"
             show-overflow-tooltip
            width="90"
          >
          </el-table-column>
          <el-table-column
            prop="receiveAddress"
            label="收货地址"
             show-overflow-tooltip
            width="250"
          >
          </el-table-column>
          <el-table-column
            prop="orderTime"
            label="获取时间"
             show-overflow-tooltip
            width="200"
          >
          </el-table-column>
          <el-table-column
            prop="orderReceiveStatus"
            label="状态"
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
    <dialogOrder ref="dialogOrder" :multipleSelection.sync="multipleSelection" :dialogVisible.sync="dialogVisible" @submitForm="getSubmitForm"/>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>