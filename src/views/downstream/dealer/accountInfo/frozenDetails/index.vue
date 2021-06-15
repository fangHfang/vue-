<template>
  <div class="page">
    <div class="page-content" style="padding-bottom: 0;">
      <h3 class="page-name">冻结明细</h3>
      <div class="toolbar-box down-store-info-list-toolbar">
          <div>
          <div class="label">冻结时间</div>
          <div class="content">
            <el-date-picker
              v-model="toolBar.date"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>

         <div>
          <div class="label">解冻时间</div>
          <div class="content">
            <el-date-picker
              v-model="toolBar.processDate"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <div>
          <div class="label">按状态</div>
          <div class="content">
            <el-select clearable v-model="toolBar.status.value" :placeholder="$text.selectPlaceholder">
            <el-option
              v-for="item in toolBar.status.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </div>
        </div>
        <el-button type="primary" @click="getRemoteTableData">{{ $text.search }}</el-button>
        <el-button type="primary" @click="cleanSearch" plain>{{ $text.reset }}</el-button>
      </div>
      <div class="table-main">
        <div class="actionbar">
          <importExport
              :showExport="true"
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
              prop="orderWithdrawAmount"
              label="提现金额(元)"
              width="160"
              show-overflow-tooltip
            >
            </el-table-column>

            <el-table-column
              prop="orderWithdrawActualAmount"
              label="提现实际金额"
              width="160"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="orderWithdrawHandlingAmount"
              label="提现手续费"
              show-overflow-tooltip
              width="170"
            >
            </el-table-column>
            <el-table-column
              prop="orderWithdrawQuantity"
              label="关联订单数"
              width="150"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <el-button
                        type="text"
                        size="small"
                        @click="toOrder(scope.row)"
                >
                  {{ scope.row.orderWithdrawQuantity }}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="orderWithdrawStatus"
              label="审核状态"
              width="150"
            >
              <template slot-scope="scope">
                <div>
                  {{['无法提现', '待提现', '提现中', '提现驳回','提现审核通过','提现完成','提现冻结'][scope.row.orderWithdrawStatus]}}
                </div>
              </template>
            </el-table-column>

            <el-table-column
              prop="orderWithdrawApplyTime"
              label="申请时间"
              width="160"
              show-overflow-tooltip
            >
            </el-table-column>

            <el-table-column>
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
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>