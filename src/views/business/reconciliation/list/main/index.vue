<template>
  <div class="page">
    <div class="toolbar-box repository-info-list-toolbar">
      <div>
        <div class="label">门店名称</div>
        <div class="content">
          <storeSelect @change="storeChange" ref="store"/>
        </div>
      </div>
      <div>
        <div class="label">经销商名称</div>
        <div class="content">
          <dealerSelect @change="dealerChange" ref="dealer"/>
        </div>
      </div>
      <div>
        <div class="label">业务类型</div>
        <div class="content">
          <el-select clearable v-model="toolBar.bizType.value" placeholder="请选择业务类型">
            <el-option
                v-for="item in toolBar.bizType.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">时间</div>
        <div class="content">
          <el-date-picker
              v-model="toolBar.date"
              type="daterange"
              range-separator="~"
              value-format="yyyy/MM/dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
          >
          </el-date-picker>
        </div>
      </div>

      <el-button type="primary" @click="searchData">{{ $text.search }}</el-button>
      <el-button type="primary" @click="reset">{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button type="primary" v-if="typeFlag===1&&permission.includes('ZBPCC01110101')" @click="batchInAccount">确认入账</el-button>

        <importExport
            :showExport="permission.includes('ZBPCC01110102')"
        />
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
            fixed="left"
            label="操作"
            width="100"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                v-if="scope.row.status===1&&permission.includes('ZBPCC01110101')"
                @click="inAccount(scope.row)"
              >
                确认入账
              </el-button>
              <el-button
                type="text"
                v-else
                disabled
                size="small"
              >
                {{ ['已受理','未对账','已入账'][scope.row.status] }}
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
              prop="bizNo"
              label="业务流水号"
              width="180"
              show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="toDetailList(scope.row)">{{scope.row.bizNo}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="dealerNo"
            label="内部经销商code"
            width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="dealerRefNo"
            label="经销商code"
            width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="dealerName"
            label="经销商名称"
            width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="customerNo"
            label="内部门店code"
            width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="storeRefNo"
            label="门店code"
            width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="customerName"
            label="门店名称"
            width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="date"
            label="时间"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="itAmount"
            label="积分"
            width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="rbAmount"
            label="返利"
            width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="epAmount"
            label="兑换点"
            width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="bizType"
            label="业务类型"
            width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-if="scope.row.bizType==='1031'">签约</span>
              <span v-if="scope.row.bizType==='1030'">店检</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="业务信息"
            min-width="150"
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