<template>
  <div class="page">
    <div class="toolbar-box">
        <div>
        <div class="label">经销商名称</div>
        <div class="content">
            <dealerSelect :placeholder='placeholder' @change="dealerChange" ref="dealer"/>
        </div>
      </div>
      <div>
        <div class="label">是否有提现申请</div>
        <div class="content">
          <el-select clearable v-model="toolBar.withdrawalQuantity.value" :placeholder="$text.selectPlaceholder">
            <el-option
                    v-for="item in toolBar.withdrawalQuantity.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">是否有异常操作</div>
        <div class="content">
          <el-select clearable v-model="toolBar.exceptionQuantity.value" :placeholder="$text.selectPlaceholder">
            <el-option
                    v-for="item in toolBar.exceptionQuantity.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="searchDealerListByPage">{{ $text.search }}</el-button>
      <el-button type="primary" @click="cleanSearch" plain>{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <importExport
            :showExport="permission.includes('ZBPCB01010207')"
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
            width="280"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                 v-if="permission.includes('ZBPCB01010203')"
                @click="withdrawalAudit(scope.row.dealerNo,scope.row.customerNo,scope.row)"
              >
                提现审核
              </el-button>
              <el-button
                type="text"
                size="small"
                 v-if="permission.includes('ZBPCB01010204')"
                @click="withdrawalRecord(scope.row.dealerNo,scope.row.customerNo)"
              >
                提现记录
              </el-button>
              <el-button
                type="text"
                size="small"
                 v-if="permission.includes('ZBPCB01010205')"
                @click="frozenDetails(scope.row.dealerNo,scope.row.customerNo)"
              >
                冻结明细
              </el-button>
              <el-button
                type="text"
                size="small"
                 v-if="permission.includes('ZBPCB01010206')"
                @click="accountStatement(scope.row.dealerRefNo,scope.row.customerNo)"
              >
                对账单
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="80"
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
            prop="withdrawalAmount"
            label="可提现金额(元)"
            width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="frozenAmount"
            label="冻结金额(元)"
            width="140"
          >
          </el-table-column>
          <el-table-column
            prop="withdrawalQuantity"
            label="提现申请"
            width="140"
          >
          </el-table-column>
          <el-table-column
            prop="exceptionQuantity"
            label="异常操作"
            width="140"
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
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>